import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
	const { onAuthenticated } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [errMessage, setErrMessage] = useState("");

	const handleClick = () => {
		axios
			.post(`https://college-api.vercel.app/login`, {
				email: form.email,
				password: form.password,
			})
			.then((response) => {
				onAuthenticated(true, response.data.token);
				localStorage.setItem("token", response.data.token);
				navigate("/");
			})
			.catch((err) => {
				console.error(err);
				console.log(err.response.data.error.email);
				setErrMessage(err.response.data.error.email);
			});
	};

	const handleRegisterClick = () => {
		navigate("/register");
	};
	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

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
