import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import {  useEffect } from "react";

// pages
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";

import CoursesIndex from "./Pages/Courses/Index";
import SingleCourse from "./Pages/Courses/SingleCourse";
import CreateCourseForm from "./Pages/Courses/CreateCourseForm";
import EditCourseForm from "./Pages/Courses/EditCourseForm";


import LecturersIndex from "./Pages/Lecturers/Index";
import CreateLecturerForm from "./Pages/Lecturers/CreateLecturerForm";
import SingleLecturer from "./Pages/Lecturers/SingleLecturer";
import EditLecturerForm from "./Pages/Lecturers/EditLecturerForm";


import EnrolmentsIndex from "./Pages/Enrolments/Index"
import SingleEnrolment from "./Pages/Enrolments/SingleEnrolment";
import CreateEnrolmentForm from "./Pages/Enrolments/CreateEnrolmentsForm";
import EditEnrolmentForm from "./Pages/Enrolments/EditEnrolmentsForm";

// components


import { useAuth } from "./contexts/AuthContext";
// import Navbar from "./components/Navbar";

function App() {
	const { authenticated, onAuthenticated } = useAuth();


	const protectedRoutes = authenticated && (
		<>
			<Route path="/" element={<Home />} />
			<Route path="/lecturer/:id" element={<SingleLecturer />} />
			<Route path="/lecturer/create" element={<CreateLecturerForm />} />
			<Route path="/lecturer/edit/:id" element={<EditLecturerForm />} />

				<Route path="/course/:id" element={<SingleCourse />} />
				<Route path="/course/create" element={<CreateCourseForm />} />
				<Route path="/course/edit/:id" element={<EditCourseForm />} />

				<Route path="/enrolment/:id" element={<SingleEnrolment />} />
				<Route path="/enrolment/create" element={<CreateEnrolmentForm />} />
				<Route path="/enrolment/edit/:id" element={<EditEnrolmentForm />} />

		</>
	);
	useEffect(() => {
		// Check if a token is present in localStorage on app mount
		if (localStorage.getItem("token")) {
			onAuthenticated(true);
		}
	}, [onAuthenticated]);



	return (
		<Router>
			<Navbar authenticated={authenticated} onAuthenticated={onAuthenticated} />
			<div className="bg-stone-500 min-h-screen">
			<>
			<Routes>

				<Route path="/" element={<Home />} />
				<Route path="/courses" element={<CoursesIndex />} />
				<Route path="/lecturers" element={<LecturersIndex />} />
				<Route path="/enrolments" element={<EnrolmentsIndex />} />

				<Route path="/register" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				{protectedRoutes}
			</Routes>
			</>
			</div>
		</Router>
	);
}

export default App;
