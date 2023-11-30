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
			<>
				{" "}
				<div className="max-w-2xl mx-auto mt-8 p-4 bg-red-400 shadow-md rounded-md">
					<h2 className="text-3xl text-zinc-800 font-bold mb-2">
						<div>
							<Link to={`/lecturer/${enrolment.course?.id}`}>
								Course Title: {enrolment.course.title}
							</Link>
						</div>
						<div>
							<Link className="" to={`/lecturer/${enrolment.lecturer?.id}`}>
								Lecturer Name :{enrolment.lecturer?.name}
							</Link>
						</div>
					</h2>
					<Link
						to={`/enrolment/edit/${id}`}
						className="btn text-l mr-2 bg-neutral-800"
					>
						Edit this enrolment
					</Link>
					<DeleteBtn
						resource={"enrolments"}
						id={id}
						deleteCallback={deleteEnrolment}
					>
						delete this enrolment
					</DeleteBtn>

					<p className="text-zinc-800  overflow-auto ">
						<p className="text-neutral-800">
							lecturer status : {enrolment.status}
						</p>{" "}
					</p>
					<p className="text-zinc-800  ">
						{" "}
						Course Code: {enrolment.course?.code}
					</p>
					<p className="text-zinc-800 mb-8 ">
						{" "}
						Course description: {enrolment.course?.description}
					</p>
				</div>
			</>
		</>
	);
};

export default SingleEnrolment;
