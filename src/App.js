import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

// pages
import Home from "./Pages/Home";
import Index from "./Pages/Courses/Index";
import SingleCourse from "./Pages/Courses/SingleCourse";

// components
import Navbar from "./Components/Navbar";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import CreateCourseForm from "./Pages/Courses/CreateCourseForm";
import EditCourseForm from "./Pages/Courses/EditCourseForm";

// import Navbar from "./components/Navbar";

function App() {
	const [authenticated, setAuthenticated] = useState(false);

	let protectedRoutes;

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setAuthenticated(true);
		}
	}, []);

	const onAuthenticated = (auth, token) => {
		setAuthenticated(auth);

		if (auth) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	};

	if (authenticated) {
		protectedRoutes = (
			<>
				<Route path="/" element={<Home />} />
			</>
		);
	}

	return (
		<Router>
			<Navbar authenticated={authenticated} onAuthenticated={onAuthenticated} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							
						/>
					}
				/>
				<Route
					path="/courses"
					element={
						<Index
							authenticated={authenticated}
							onAuthenticated={onAuthenticated}
						/>
					}
				/>
				<Route
					path="/register"
					element={
						<RegisterForm
							authenticated={authenticated}
							onAuthenticated={onAuthenticated}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<LoginForm
							authenticated={authenticated}
							onAuthenticated={onAuthenticated}
						/>
					}
				/>
				<Route
					path="/course/:id"
					element={
						<SingleCourse
							authenticated={authenticated}
							onAuthenticated={onAuthenticated}
						/>
					}
				/>
				<Route
					path="/course/create"
					element={
						<CreateCourseForm
							authenticated={authenticated}
							onAuthenticated={onAuthenticated}
						/>
					}
				/>
				<Route
					path="/course/edit/:id"
					element={
						<EditCourseForm
							authenticated={authenticated}
							onAuthenticated={onAuthenticated}
						/>
					}
				/>
				{protectedRoutes}
			</Routes>
		</Router>
	);
}

export default App;
