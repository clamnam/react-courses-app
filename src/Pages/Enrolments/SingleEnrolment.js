import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBtn from "../../Components/DeleteBtn";
import { useAuth } from "../../contexts/AuthContext";

const SingleEnrolment = () => {
	// gets id from url
	let { id } = useParams();
	// sets states
	const [enrolment, setEnrolment] = useState(null);
	
	const { setAlert, alert } = useAuth();

	let token = localStorage.getItem("token");

	const deleteEnrolment = () => {
		return <>error deleting course</>;
	};

	useEffect(() => {
		// removes alert after 5 seconds
		setTimeout(() => setAlert(""), 5000);
		// gets enrolment data
		axios
			.get(`https://college-api.vercel.app/api/enrolments/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setEnrolment(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, token, setAlert]);

	// if no enrolment found, return 
	if (!enrolment) {
		return (
			<>
				<div className="text-lg"> oh no, no enrolment found!</div>
				<br />
				<Link to="/">return home</Link>
			</>
		);
	}

	return (
		<>
			<div className="flex items-center justify-center text-lg bg-red-500 text-white">
								{/* display alert if there is one */}

				{alert}
			</div>
			<div className="max-w-2xl mx-auto mt-8 p-4 bg-blue-400 shadow-md rounded-md">
				<h2 className="text-3xl text-zinc-800 font-bold mb-2">
					<div>
						<Link to={`/course/${enrolment.course?.id}`} className=" hover:underline">
							Course Title: {enrolment.course.title}
						</Link>
					</div>
					<br />
					<div>
						<Link className="hover:underline" to={`/lecturer/${enrolment.lecturer?.id}`}>
							Lecturer Name: {enrolment.lecturer?.name}
						</Link>
					</div>
					<br />
				</h2>
				<Link
					to={`/enrolment/edit/${id}`}
					className="btn text-l mr-2 bg-neutral-800"
				>
					Edit this enrolment
				</Link>
				<button
					className="btn bg-neutral-800"
					onClick={() => document.getElementById("my_modal_1").showModal()}
				>
					Delete
				</button>
				<dialog id="my_modal_1" className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Delete Enrolment</h3>
						<p className="py-4">Are you Sure</p>
						<div className="modal-action">
							<form method="dialog">
								<button className="btn bg-neutral-800">Cancel</button>
								<DeleteBtn
									resource={"enrolments"}
									deleteCallback={deleteEnrolment}
									id={id}
								>
									delete this enrolment
								</DeleteBtn>
							</form>
						</div>
					</div>
				</dialog>
				<p className="text-zinc-800 mt-8 overflow-auto">
					lecturer status: {enrolment.status}
				</p>{" "}
				<p className="text-zinc-800">Course Code: {enrolment.course?.code}</p>
				<p className="text-zinc-800 mb-8">
					Course description: {enrolment.course?.description}
				</p>
			</div>
		</>
	);
};

export default SingleEnrolment;
