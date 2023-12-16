import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateCourseForm = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	let token = localStorage.getItem("token");

	const [courseData, setCourseData] = useState({
		title: "",
		code: "",
		description: "",
		points: "",
		level: "",
	});

	const [form, setForm] = useState({
		title: "",
		code: "",
		description: "",
		points: "",
		level: "",
	});

	const [errMessage, setErrMessage] = useState("");

	// get data on the course that is intending to be edited
	useEffect(() => {
		axios
			.get(`https://college-api.vercel.app/api/courses/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response.data.data);
				setCourseData(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, token]);

	useEffect(() => {
		// Update the form state when courseData changes
		setForm({
			title: courseData.title || "",
			code: courseData.code || "",
			description: courseData.description || "",
			points: courseData.points || "",
			level: courseData.level || "",
		});
	}, [courseData]);

	const handleClick = () => {
		axios
			.put(
				`https://college-api.vercel.app/courses/${id}`,
				{
					title: form.title,
					code: form.code,
					description: form.description,
					points: form.points,
					level: form.level,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				let data = response.data.data;
				console.log(data.id);
				navigate(`/course/${data.id}`);
			})
			.catch((err) => {
				console.error(err);
				console.log(err.response.data);
				setErrMessage(err.response.data.error);
			});
	};

	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="p-8 rounded shadow-2xl w-full max-w-md text-white">
				<div className="mb-6 text-4xl ">Edit this course</div>

				<div className="mb-4">
					<label className="block">title:</label>
					<input
						onChange={handleForm}
						type="text"
						name="title"
						value={form.title}
						className="input-field"
					/>
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
				</div>
				<div className="mb-4">
					<label className="block">description:</label>
					<textarea
						onChange={handleForm}
						type="text"
						name="description"
						value={form.description}
						className="input-field w-64"
					/>
					<div className="mb-4">
						<label className="block">points:</label>
						<input
							onChange={handleForm}
							type="text"
							name="points"
							value={form.points}
							className="input-field"
						/>
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

export default CreateCourseForm;
