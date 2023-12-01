import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CreateEnrolmentForm = () => {
	const navigate = useNavigate();
	const { authenticated ,setAlert} = useAuth();
	const [lecturers, setLecturers] = useState([]);
	const [courses, setCourses] = useState([]);
	const [selectedLecturer, setSelectedLecturer] = useState("");
	const [selectedCourse, setSelectedCourse] = useState("");

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get("https://college-api.vercel.app/api/courses", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setCourses(response.data.data);
				setAlert("Success adding Enrolment!");


			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get("https://college-api.vercel.app/api/lecturers", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setLecturers(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});

		if (authenticated === false) {
			navigate("/");
		}
	}, [navigate, authenticated, token]);

	const [form, setForm] = useState({
		date: "",
		time: "",
		status: "",
		course_id: "",
		lecturer_id: "",
	});

	const [error, setError] = useState({
		status: "",
		course_id: "",
		lecturer_id: "",
	});

	const [errMessage, setErrMessage] = useState("");

	const handleClick = () => {
		const currentDate = new Date();

		const currentTime = currentDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});

		let date =
			currentDate.getFullYear() +
			"-" +
			currentDate.getMonth() +
			"-" +
			currentDate.getDate();
		console.log(date);

		axios
			.post(
				"https://college-api.vercel.app/enrolments",
				{
					date: date,
					time: currentTime,
					status: form.status,
					course_id: form.course_id,
					lecturer_id: form.lecturer_id,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				let data = response.data.data;
				console.log(data.id);
				navigate(`/enrolment/${data.id}`);
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

	const handleLecturerChange = (e) => {
		setForm((prevState) => ({
			...prevState,
			lecturer_id: e.target.value,
		}));
	};

	const handleCourseChange = (e) => {
		setForm((prevState) => ({
			...prevState,
			course_id: e.target.value,
		}));
	};

	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	let coursesDrop;
	let lecturersDrop;

	if (courses && lecturers) {
		coursesDrop = courses.map((course) => (
			<option key={course.id} value={course.id}>
				{course.title}
			</option>
		));

		lecturersDrop = lecturers.map((lecturer) => (
			<option key={lecturer.id} value={lecturer.id}>
				{lecturer.name}
			</option>
		));
	}

	return (
		<div className="h-screen flex items-center justify-center ">
			<div className="p-8 rounded shadow-2xl w-full max-w-md  text-white">
				<div className="mb-6 text-4xl">Create a enrolment</div>

				<div className="mb-4">
					<label className="block">status:</label>
					<input
						onChange={handleForm}
						type="text"
						name="status"
						value={form.status}
						className="input-field"
					/>
										<p className="text-red-500">{error.status}</p>


					<div className="mb-4">
						<label className="block">Course id:</label>
						<select
							name="course_id"
							id="courses"
							value={form.course_id}
							onChange={handleCourseChange}
						>
							<option>please select</option>

							{courses && coursesDrop}
						</select>
						<p className="text-red-500">{error.course_id}</p>

					</div>
					<br />
					<div className="mb-4">
						<label className="block">Lecturer id:</label>
						<select
							name="lecturer_id"
							id="lecturers"
							value={form.lecturer_id}
							onChange={handleLecturerChange}
						>
							<option>please select</option>

							{lecturers && lecturersDrop}
						</select>
						<p className="text-red-500">{error.lecturer_id}</p>

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

export default CreateEnrolmentForm;
