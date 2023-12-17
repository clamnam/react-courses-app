import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const CreateCourseForm = () => {
	// sets navigate variable
	const navigate = useNavigate();
	const { authenticated, setAlert, alert } = useAuth();
	const token = localStorage.getItem("token");
// sends user to home page if not authenticated
	useEffect(() => {
		if (!authenticated) {
			navigate("/");
		}
	}, [navigate, authenticated]);
	// sets form state
	const [form, setForm] = useState({
		title: "",
		code: "",
		description: "",
		points: "",
		level: "",
	});
	// 		sets error state
	const [error, setError] = useState({
		title: "",
		code: "",
		description: "",
		points: "",
		level: "",
	});

	const [errMessage, setErrMessage] = useState("");
	// sends post request to create course
	const handleClick = () => {
		axios
			.post(
				"https://college-api.vercel.app/courses",
				{
					// sends form data as json object
					title: form.title,
					code: form.code,
					description: form.description,
					points: form.points,
					level: form.level,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
			
				const data = response.data.data;
				setAlert("Success adding course!");

				navigate(`/course/${data.id}`);
			})
			.catch((err) => {
				if (err.response && err.response.data.errors) {
					const validationErrors = err.response.data.errors;

					setError(
						// sets error to 
						Object.keys(validationErrors).reduce((acc, key) => {
							acc[key] = validationErrors[key][0];
							return acc;
						}, {})
					);
					// sets error message to relevant error
				} else if (err.response) {
					setErrMessage(`Server error: ${err.response.status}`);
				} else if (err.request) {
					setErrMessage("No response from the server");
				} else {
					setErrMessage("Request failed");
				}
			});
	};
	// sets form state to input values
	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<>
			<p>{alert}</p>
			<div className="h-screen flex items-center justify-center ">
				<div className="p-8 rounded shadow-2xl w-full max-w-md  text-white">
					<div className="mb-6 text-4xl">Create a course</div>

					<div className="mb-4">
						<label className="block">title:</label>
						<input
							onChange={handleForm}
							type="text"
							name="title"
							value={form.title}
							className="input-field"
						/>
											<p className="text-red-500">{error.title}</p>

					</div>

					<div className="mb-4">
						<label className="block">code:</label>
						<input
							onChange={handleForm}
							type="text"
							name="code"
							value={form.code}
							className="input-field"
						/>
											<p className="text-red-500">{error.code}</p>

					</div>
					
					<div className="mb-4">
						<label className="block">description:</label>
						<input
							onChange={handleForm}
							type="text"
							name="description"
							value={form.description}
							className="input-field"
						/>
											<p className="text-red-500">{error.description}</p>

						<div className="mb-4">
							<label className="block">points:</label>
							<input
								onChange={handleForm}
								type="text"
								name="points"
								value={form.points}
								className="input-field"
							/>
												<p className="text-red-500">{error.points}</p>

						</div>
						<div className="mb-4">
							<label className="block">level:</label>
							<input
								onChange={handleForm}
								type="text"
								name="level"
								value={form.level}
								className="input-field"
							/>
												<p className="text-red-500">{error.level}</p>

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
		</>
	);
};

export default CreateCourseForm;
