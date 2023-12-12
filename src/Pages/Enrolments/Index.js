import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import EnrolmentCard from "../../Components/Cards/EnrolmentCard";
const EnrolmentsIndex = () => {
	const { authenticated ,setAlert,alert} = useAuth();

	let token = localStorage.getItem("token");
	const [enrolments, setEnrolments] = useState([]);
	useEffect(() => {
		setTimeout(() => setAlert(""), 5000);
		axios
			.get("https://college-api.vercel.app/api/enrolments", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setEnrolments(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	if (!authenticated) return <LoginForm />;
	if (enrolments.length === 0)
		return (
			<span className="text-2xl loading loading-spinner text-neutral">
				Loading
			</span>
		);

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
