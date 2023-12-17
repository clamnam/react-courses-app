import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CreateEnrolmentForm = () => {
	
	const navigate = useNavigate();
	// sets states
	const { authenticated, setAlert } = useAuth();
	const [lecturers, setLecturers] = useState([]);
	const [courses, setCourses] = useState([]);


	let token = localStorage.getItem("token");

	useEffect(() => {
		// gets course and lecturer data
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
			// if authenticated is false, redirect to login page
		if (authenticated === false) {
			navigate("/");
		}
	}, [navigate, authenticated, token,setAlert]);

	// sets form + error state
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
	// sets error message state
	const [errMessage, setErrMessage] = useState("");


	const handleClick = () => {
		const currentDate = new Date();
		// gets current time and date
		const currentTime = currentDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});

		let date =
			currentDate.getFullYear() +
			"-" +
			(currentDate.getMonth() + 1) +
			"-" +
			currentDate.getDate();
		console.log(date);

		axios
			.post(
				"https://college-api.vercel.app/enrolments",
				{
					// sends form data + date and time as json object
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
		// sets lecturer id state to selected value
		setForm((prevState) => ({
			...prevState,
			lecturer_id: e.target.value,
		}));
	};

	const handleCourseChange = (e) => {
		// sets course id state to selected value
		setForm((prevState) => ({

			...prevState,
			course_id: e.target.value,
		}));
	};

	const handleForm = (e) => {
		// sets form state to input values
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	let coursesDrop;
	let lecturersDrop;

	// maps retrieved course data to course cards
	if (courses && lecturers) {
		coursesDrop = courses.map((course) => (
			<option key={course.id} value={course.id}>
				{course.title}
			</option>
		));
	// maps retrieved lecturer data to lecturer cards
		lecturersDrop = lecturers.map((lecturer) => (
			<option key={lecturer.id} value={lecturer.id}>
				{lecturer.name}
			</option>
		));
	}

	return (
		<div className="h-screen flex items-center justify-center ">
			<div className="p-8 rounded shadow-2xl w-full max-w-md  text-white">
				<div className="mb-6 text-4xl">Create an enrolment</div>

				<div className="mb-4">
					<label className="block ">Status:</label>
					<select
						name="status"
						id="status"
						onChange={handleForm}
						value={form.status}
						className="text-white  text-xl my-4 btn w-64 bg-base-200"
					>
						<option value="">Choose Status</option>
						<option value="interested">Interested</option>
						<option value="assigned">Assigned</option>
						<option value="associate">Associate</option>
						<option value="career_break">Career Break</option>
					</select>
					<p className="text-red-500">{error.status}</p>
				</div>

				<div className="mb-4">
					<label className="block">Course id:</label>
					<select
						name="course_id"
						id="courses"
						value={form.course_id}
						onChange={handleCourseChange}
						className="text-white  text-xl my-4 btn w-64 bg-base-200"

					>
						<option value="">Please select</option>
						{courses && coursesDrop}
					</select>
					<p className="text-red-500">{error.course_id}</p>
				</div>

				<div className="mb-4">
					<label className="block">Lecturer id:</label>
					<select
						name="lecturer_id"
						id="lecturers"
						value={form.lecturer_id}
						onChange={handleLecturerChange}
						className="text-white  text-xl my-4 btn w-64  bg-base-200"

					>
						<option value="">Please select</option>
						{lecturers && lecturersDrop}
					</select>
					<p className="text-red-500">{error.lecturer_id}</p>
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
