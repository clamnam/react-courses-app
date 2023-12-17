import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import LecturerCard from "../../Components/Cards/LecturerCard";

const LecturersIndex = () => {
	const { authenticated } = useAuth();

	let token = localStorage.getItem("token");
	// sets states
	const [lecturers, setLecturers] = useState([]);
	const [sortOption, setSortOption] = useState("default"); // Default sort option


	useEffect(() => {
		// gets lecturer data
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
	}, [token]);

	const getSortedLecturers = () => {
		const sortFunctions = {
			// sets sort functions that, sort using localeCompare which compares strings
			default: (a, b) => a, // No sorting
			nameAscending: (a, b) => a.name.localeCompare(b.name),
			nameDescending: (a, b) => b.name.localeCompare(a.name),
		};

		return [...lecturers].sort(sortFunctions[sortOption]);
	};
	// if not authenticated, show login form
	if (!authenticated) return <LoginForm />;
	// if no lecturers, show loading spinner
	if (lecturers.length === 0)
		return (
			<span className="text-2xl loading loading-spinner text-neutral">
				Loading
			</span>
		);
	// sets lecturer list to sorted lecturers
	const lecturersList = getSortedLecturers().map((lecturer, index) => (
		<div key={index}>
			{authenticated ? (
				<>
					<LecturerCard props={lecturer} />
				</>
			) : (
				<></>
			)}
		</div>
	));

	return (
		<>
			<div className="container mx-auto pb-8">
				<h1 className="mb-4 py-4 text-4xl place-content-center text-neutral-900 ">
					All Lecturers
				</h1>

				{/* counditionally renders filter and add based on if users authed */}
				{authenticated && (
					<>
						{" "}
						<Link
							to="/lecturer/create"
							className="text-white text-xl  btn  bg-base-200"
						>
							Add a New Lecturer
						</Link>
						<select
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
							className="  text-white text-xl m-3 p-1 btn  bg-base-200"
						>
							<option value="default">Filter</option>
							<option value="nameAscending">Name Ascending</option>
							<option value="nameDescending">Name Descending</option>
						</select>
					</>
				)}


				{/* displays lecturer data if authed or login if not*/}
				<div className="grid grid-cols-1 gap-10">
					{authenticated ? (
						lecturers.length > 0 ? (
							lecturersList
						) : (
							<>No lecturers found</>
						)
					) : (
						<LoginForm />
					)}
				</div>
			</div>
		</>
	);
};

export default LecturersIndex;
