import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import CourseCard from "../../Components/Cards/CourseCard";
const Index = () => {
	const { authenticated } = useAuth();

	let token = localStorage.getItem("token");
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		axios
			.get("https://college-api.vercel.app/api/courses", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// console.log(response.data);
				setCourses(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	if (!authenticated) return <LoginForm />;
	if (courses.length === 0)
		return (
			<span className="text-2xl loading loading-spinner text-neutral">
				Loading
			</span>
		);

	const coursesList = courses.map((course, index) => {
		return (
			<div key={index}>
				{authenticated ? (
					<>
						<CourseCard props={course} />
					</>
				) : (
					<></>
				)}
			</div>
		);
	});
	return (
		<>
			<div className="container mx-auto">
			<h1 className="my-4 text-4xl place-content-center ">All Courses</h1>

				{authenticated && (
					<>
						{" "}
						<Link
							to="/course/create"
							className="text-white  text-xl my-4 btn  bg-base-200"
						>
							Create a New Course
						</Link>
					</>
				)}
				<div className="grid grid-cols-1 gap-10">
					{authenticated ? (
						courses ? (
							coursesList
						) : (
							<>no courses found</>
						)
					) : (
						<LoginForm />
					)}
				</div>
			</div>
		</>
	);
};

export default Index;
