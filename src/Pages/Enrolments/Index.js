import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import EnrolmentCard from "../../Components/Cards/EnrolmentCard";
const EnrolmentsIndex = () => {
	// sets states
	const { authenticated ,setAlert,alert} = useAuth();
	const [enrolments, setEnrolments] = useState([]);

	let token = localStorage.getItem("token");
	useEffect(() => {
		// gets enrolment data
		setTimeout(() => setAlert(""), 5000);
		axios
		// gets enrolment data
			.get("https://college-api.vercel.app/api/enrolments", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setEnrolments(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token,setAlert]);
// if user is not authenticated, show login form
	if (!authenticated) return <LoginForm />;
	if (enrolments.length === 0)
		return (
			<span className="text-2xl loading loading-spinner text-neutral">
				Loading
			</span>
		);
// maps through enrolments
	const enrolmentsList = enrolments.map((enrolment, index) => {
		return (
			<div key={index}>
				{authenticated ? (
					<EnrolmentCard props={enrolment}/>
				) : (
					<></>
				)}
			</div>
		);
	});
	return (
		<>
					<p className="flex items-center justify-center text-lg bg-red-700 text-white ">
										{/* display alert if there is one */}

				{alert}
			</p>
			<div className="container mx-auto pb-8">
			<h1 className="my-4 text-4xl place-content-center text-neutral-900">All Enrolments</h1>

				{authenticated && (
					<>
						{" "}
						<Link
							to="/enrolment/create"
							className="text-white  text-xl my-4 btn  bg-base-200"
						>
							Add a New Enrolment
						</Link>
					</>
				)}
				<div className="grid grid-cols-1 gap-10">
					{/* displays enrolment data if authed */}
										{authenticated ? (
						enrolments ? (
							enrolmentsList
						) : (
							<>no enrolments found</>
						)
					) : (
						<LoginForm />
					)}
				</div>
			</div>
		</>
	);
};

export default EnrolmentsIndex;
