import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import {  useEffect } from "react";

// pages
import Home from "./Pages/Home";
import CoursesIndex from "./Pages/Courses/Index";
import CreateLecturerForm from "./Pages/Lecturers/CreateLecturerForm";

import SingleCourse from "./Pages/Courses/SingleCourse";
import SingleLecturer from "./Pages/Lecturers/SingleLecturer";

// components
import Navbar from "./Components/Navbar";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import CreateCourseForm from "./Pages/Courses/CreateCourseForm";
import EditCourseForm from "./Pages/Courses/EditCourseForm";
import { useAuth } from "./contexts/AuthContext";
// import Navbar from "./components/Navbar";

function App() {
	const { authenticated, onAuthenticated } = useAuth();


	const protectedRoutes = authenticated && (
		<>
			<Route path="/" element={<Home />} />
			<Route path="/lecturer/:id" element={<SingleLecturer />} />
			<Route path="/lecturers/create" element={<CreateLecturerForm />} />

				<Route path="/course/:id" element={<SingleCourse />} />
				<Route path="/course/create" element={<CreateCourseForm />} />
				<Route path="/course/edit/:id" element={<EditCourseForm />} />

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
			<Routes>

				<Route path="/" element={<Home />} />
				<Route path="/courses" element={<CoursesIndex />} />

				<Route path="/register" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				{protectedRoutes}
			</Routes>
		</Router>
	);
}

export default App;
