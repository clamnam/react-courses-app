import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
	// defines onauthenticated as brought from the context provider
	const { onAuthenticated } = useAuth();
	// sets state variables and assign usenavigate to Navigate

	const navigate = useNavigate();

	// declares state variables form has an object predefined
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [errMessage, setErrMessage] = useState("");

	const handleClick = () => {
		axios
			// sends forms email and password as a json object with axios call to api
			.post(`https://college-api.vercel.app/login`, {
				email: form.email,
				password: form.password,
			})
			.then((response) => {
				// sets user authenticated to true and defines token
				// also puts the token in local storage so it can be accessed after refresh
				onAuthenticated(true, response.data.token);
				localStorage.setItem("token", response.data.token);
				navigate("/");
			})
			.catch((err) => {
	
				setErrMessage(err.response.data.error.email);
			});
	};

	const handleRegisterClick = () => {
		navigate("/register");
	};

	// onchange of form inputs sets the form state to the new value
	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	// form 
	return (
		<div className="h-screen flex items-center justify-center ">
			<div className="p-8 rounded shadow-2xl w-full max-w-md  text-white">
				<div className="mb-6 text-4xl">Login</div>

				<div className="mb-4">
					<label className="block">Email:</label>
					<input
						onChange={handleForm}
						type="text"
						name="email"
						value={form.email}
						className="input-field"
					/>
				</div>

				<div className="mb-4">
					<label className="block">Password:</label>
					<input
						onChange={handleForm}
						type="password"
						name="password"
						value={form.password}
						className="input-field"
					/>
				</div>

				{errMessage && <div className="text-red-500 mb-4">{errMessage}</div>}

				<div className="flex justify-between">
					<button className="btn btn-sm" onClick={handleClick}>
						Submit
					</button>

					<button className="btn btn-sm" onClick={handleRegisterClick}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
