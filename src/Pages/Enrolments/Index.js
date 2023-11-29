import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
const EnrolmentsIndex = () => {
	const {authenticated}= useAuth();

	let token = localStorage.getItem("token");
	const [enrolments, setEnrolments] = useState([]);
	useEffect(() => {
		axios
			.get("https://college-api.vercel.app/api/enrolments", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// console.log(response.data);
				setEnrolments(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	if (!authenticated) return <LoginForm/>;
	if (enrolments.length === 0) return <span className="text-2xl loading loading-spinner text-neutral">Loading</span>

	const enrolmentsList = enrolments.map((enrolment, index) => {
		return (
			<div key={index}>
				{authenticated ? (
					<>
						<div className="card w-96 sm:w-3/4 bg-base-200 h-70 border border-black px-6 overflow-hidden shadow-lg flex flex-col">
							<figure>
							</figure>
							<div className="card-body">
								<div className="overflow-y-hidden">
								<h2 className="card-title">
									<Link to={`/enrolment/${enrolment.id}`}>{enrolment.name}</Link>
								</h2>
								<div>
								<p className="overflow-auto ">Email : {enrolment.email}</p>
								<br/>
								<p className=" ">Phone Number : {enrolment.phone}</p>
								</div>
								</div>
								<div className="card-actions justify-end">
									<button className="btn  btn-primary">
									<Link to={`/enrolment/${enrolment.id}`}>Check it out</Link>

									</button>
								</div>
							</div>
						</div>
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
					<h1 className="mb-4 text-4xl place-content-center ">All Enrolments</h1>
<div className="container mx-auto">
					{authenticated &&(       <> <Link to="/enrolment/create" className="text-white bg-slate-500 text-xl my-4 btn  bg-base-200">Add a New Lecturer</Link></>  
)}
			<div className="    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
			
			{authenticated ? (enrolments ? enrolmentsList : <>no enrolments found</>) : <LoginForm/>}
			</div>
			</div>

		</>
	);
};

export default EnrolmentsIndex;
