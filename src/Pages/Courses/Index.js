import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import CourseCard from "../../Components/Cards/CourseCard";

const Index = () => {
	const { authenticated } = useAuth();
	const token = localStorage.getItem("token");

	// set states
	const [courses, setCourses] = useState([]);
	const [filteredCourses, setFilteredCourses] = useState([]);
	const [sortOption, setSortOption] = useState("default"); 

	useEffect(() => {
		axios
			.get("https://college-api.vercel.app/api/courses", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setCourses(response.data.data);
				setFilteredCourses(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	useEffect(() => {
		// Apply sort when the sort Option changes
		const sortFunctions = {
			// sets sort functions that, sort using localeCompare which compares strings
			default: (a, b) => a, // original sorting
			alphabetical: (a, b) => a.title.localeCompare(b.title),
			reverseAlphabetical: (a, b) => b.title.localeCompare(a.title),
			codeAscending: (a, b) => a.code.localeCompare(b.code),
			codeDescending: (a, b) => b.code.localeCompare(a.code),
		};
		// sorts courses based on sort option
		const sortedCourses = [...courses].sort(sortFunctions[sortOption]);

		setFilteredCourses(sortedCourses);
	}, [sortOption, courses]);
// when authenticated is false, dusplay login form
	if (!authenticated) return <LoginForm />;
	// if courses is empty, display loading symbol
	if (courses.length === 0)
		return (
			<span className="text-2xl loading loading-spinner text-neutral">
				Loading
			</span>
		);
// maps retrieved course data to course cards
	const coursesList = filteredCourses.map((course, index) => (
		<div key={index}>
			{authenticated ? (
				<>
					<CourseCard props={course} />
				</>
			) : (
				<></>
			)}
		</div>
	));

	return (
		<>
			<div className="container mx-auto pb-8">
				<h1 className="mb-4 pt-4 text-4xl place-content-center text-neutral-900 ">
					All Courses
				</h1>

				{authenticated && (
					<>
						{" "}
						
						<Link
							to="/course/create"
							className="text-white  text-xl my-4 btn  bg-base-200"
						>
							Create a New Course
						</Link>

					
						<select
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
							className="text-white  text-xl m-3 p-1 btn  bg-base-200"
						>
							<option value="default">Filter</option>
							<option value="alphabetical">Alphabetical</option>
							<option value="reverseAlphabetical">Reverse Alphabetical</option>
							<option value="codeAscending">Code Ascending</option>
							<option value="codeDescending">Code Descending</option>
						</select>
					</>
				)}

				<div className="grid grid-cols-1 gap-10">
					{authenticated ? (
						filteredCourses.length > 0 ? (
							coursesList
						) : (
							<>No courses found</>
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
