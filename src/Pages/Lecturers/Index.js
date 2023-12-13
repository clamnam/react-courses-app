import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import LecturerCard from "../../Components/Cards/LecturerCard";

const LecturersIndex = () => {
	const { authenticated } = useAuth();

	let token = localStorage.getItem("token");
	const [lecturers, setLecturers] = useState([]);
	const [sortOption, setSortOption] = useState("default"); // Default sort option

	useEffect(() => {
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
			default: (a, b) => a, // No sorting
			nameAscending: (a, b) => a.name.localeCompare(b.name),
			nameDescending: (a, b) => b.name.localeCompare(a.name),
		};

		return [...lecturers].sort(sortFunctions[sortOption]);
	};

	if (!authenticated) return <LoginForm />;
	if (lecturers.length === 0)
		return (
			<span className="text-2xl loading loading-spinner text-neutral">
				Loading
			</span>
		);

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

				{authenticated && (
					<>
						{" "}
						<Link
							to="/lecturer/create"
							className="text-white text-xl m-4 btn  bg-base-200"
						>
							Add a New Lecturer
						</Link>
						<select
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
							className="  text-white text-xl my-4 btn  bg-base-200"
						>
							<option value="default">Filter</option>
							<option value="nameAscending">Name Ascending</option>
							<option value="nameDescending">Name Descending</option>
						</select>
					</>
				)}

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
