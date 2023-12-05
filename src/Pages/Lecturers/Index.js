import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import LecturerCard from "../../Components/Cards/LecturerCard";
const LecturersIndex = () => {
	const {authenticated}= useAuth();

	let token = localStorage.getItem("token");
	const [lecturers, setLecturers] = useState([]);
	useEffect(() => {
		axios
			.get("https://college-api.vercel.app/api/lecturers", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// console.log(response.data);
				setLecturers(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	if (!authenticated) return <LoginForm/>;
	if (lecturers.length === 0) return <span className="text-2xl loading loading-spinner text-neutral">Loading</span>

	const lecturersList = lecturers.map((lecturer, index) => {
		return (
			<div key={index}>
				{authenticated ? (
					<>
					<LecturerCard props={lecturer}/>
					</>
				) : (
					<>
					</>
				)}
			</div>
		);
	});
	return (
		<>
<div className="container mx-auto">
<h1 className="my-4 text-4xl place-content-center ">All Lecturers</h1>

					{authenticated &&(       <> <Link to="/lecturer/create" className="text-white text-xl my-4 btn  bg-base-200">Add a New Lecturer</Link></>  
)}
				<div className="grid grid-cols-1 gap-10">
			
			{authenticated ? (lecturers ? lecturersList : <>no lecturers found</>) : <LoginForm/>}
			</div>
			</div>

		</>
	);
};

export default LecturersIndex;
