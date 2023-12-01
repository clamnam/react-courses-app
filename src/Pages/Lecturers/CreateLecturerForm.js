import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const CreateLecturerForm = () => {
	const Navigate = useNavigate();
	const { authenticated, onAuthenticated, setAlert } = useAuth();

	let token = localStorage.getItem("token");
	useEffect(() => {
		if (authenticated === false) {
			Navigate("/");
		}
	}, [Navigate, authenticated]);
	const [form, setForm] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
	});

	const [error, setError] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
	  });
	
	
	
	const [errMessage, setErrMessage] = useState("");

	const handleClick = () => {
		axios
			.post(
				"https://college-api.vercel.app/lecturers",
				{
					name: form.name,
					address: form.address,
					phone: form.phone,
					email: form.email,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				const data = response.data.data;
				console.log(data.id);
				setAlert("Success adding Lecturer!");
				navigate(`/lecturer/${data.id}`);
			})
			.catch((err) => {
				if (err.response && err.response.data.errors) {
					const validationErrors = err.response.data.errors;
					setError(
						Object.keys(validationErrors).reduce((acc, key) => {
							acc[key] = validationErrors[key][0];
							return acc;
						}, {})
					);
				} else if (err.response) {
					setErrMessage(`Server error: ${err.response.status}`);
				} else if (err.request) {
					setErrMessage("No response from the server");
				} else {
					setErrMessage("Request failed");
				}
			});
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
				<div className="mb-6 text-4xl">Create a lecturer</div>

				<div className="mb-4">
					<label className="block">name:</label>
					<input
						onChange={handleForm}
						type="text"
						name="name"
						value={form.name}
						className="input-field"
					/>
					<p className="text-red-500">{error.name}</p>
				</div>

				<div className="mb-4">
					<label className="block">address:</label>
					<input
						onChange={handleForm}
						type="text"
						name="address"
						value={form.address}
						className="input-field"
					/>
					<p className="text-red-500">{error.address}</p>

				</div>
				<div className="mb-4">
					<label className="block">phone:</label>
					<input
						onChange={handleForm}
						type="text"
						name="phone"
						value={form.phone}
						className="input-field"
					/>
					<p className="text-red-500">{error.phone}</p>

					<div className="mb-4">
						<label className="block">email:</label>
						<input
							onChange={handleForm}
							type="text"
							name="email"
							value={form.email}
							className="input-field"
						/>
						<p className="text-red-500">{error.email}</p>

					</div>
				</div>
				{errMessage && <div className="text-red-500 mb-4">{errMessage}</div>}

				<div className="flex justify-between">
					<button className="btn btn-sm" onClick={handleClick}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateLecturerForm;
