import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CreateEnrolmentForm = () => {
	const Navigate = useNavigate();
	const { authenticated } = useAuth();
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
			Navigate("/");
		} else {
		}
	}, [Navigate, authenticated, token]);
	const [form, setForm] = useState({
		date: "",
		time: "",
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
				Navigate(`/enrolment/${data.id}`);
			})
			.catch((err) => {
				console.error(err);
				console.log(err.response.data);
				setErrMessage(err.response.data.error);
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
