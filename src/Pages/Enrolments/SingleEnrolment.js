import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBtn from "../../Components/DeleteBtn";
const SingleEnrolment = () => {
	let { id } = useParams();
	const [enrolment, setEnrolment] = useState(null);
	const [error, setError] = useState("null");

	let token = localStorage.getItem("token");

	const deleteEnrolment = () => {
		return <p className="error">Error</p>;
	};
	useEffect(() => {
		axios
			.get(`https://college-api.vercel.app/api/enrolments/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response.data.data);
				setEnrolment(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, token]);

	let enrolments = null;

	if (enrolment?.enrolments && enrolment.enrolments.length) {
		enrolments = enrolment.enrolments.map((enrolment, index) => (
			<div key={index} className="">
				<div
					id={`enrolment-collapse-${index}`}
					className=""
					aria-labelledby={`enrolment-heading-${index}`}
					data-bs-parent="#accordionExample"
				>
					<div className=" bg-base-200">

						<Link to={`/course/${enrolment.course?.id}`}>
							<p>Course Title: {enrolment.course?.title}</p>
						</Link>

						<p>Course Code: {enrolment.course?.code}</p> 
						<p>Enrolment Status: {enrolment.course?.level}</p>

						<p>
							Course Description:{" "}
							{enrolment.course?.description
								? enrolment.course.description
								: "No description found"}
						</p>

						<hr className="" />
						<br />
					</div>
				</div>
			</div>
		));
	} else {
		enrolments = <p>No enrolments found.</p>;
	}

	if (!enrolment) {
		return (
			<>
				<p className="text-lg"> oh no, no enrolment found!</p>
				<br />
				<Link to="/">return home</Link>
			</>
		);
	}
	return (
		<>
			{" "}
			<div className="max-w-2xl mx-auto mt-8 p-4 bg-red-500 shadow-md rounded-md">
				<h2 className="text-3xl text-zinc-800 font-bold mb-4">
					{enrolment?.name}
				</h2>
				<Link to={`/enrolment/edit/${id}`} className="btn text-l bg-neutral-800">
					Edit this enrolment
				</Link>
				<DeleteBtn resource={"enrolments"} id={id} deleteCallback={deleteEnrolment}>
					delete this enrolment
				</DeleteBtn>
				<p className="text-zinc-800 mt-8 overflow-auto ">
					Email : {enrolment.email}
				</p>
				<p className="text-zinc-800 mb-8 ">Phone Number : {enrolment.phone}</p>
				<div className="collapse collapse-arrow bg-base-200">
					<input type="radio" name="my-accordion-1" defaultChecked={true} />
					<div className="collapse-title text-xl ">Additional info</div>
					<div className="collapse-content">
						Points : {enrolment?.points}
						<br />
						Level : {enrolment?.level}
					</div>
					<div className="collapse collapse-arrow bg-base-200">
						<input type="radio" name="my-accordion-1" />
						<div className="collapse-title text-xl font-medium">
							enrolments
						</div>
						<div className="collapse-content">
							{enrolments ? enrolments : <p>No enrolments available.</p>}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleEnrolment;
