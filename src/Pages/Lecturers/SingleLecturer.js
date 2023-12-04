import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBtn from "../../Components/DeleteBtn";
import { useAuth } from "../../contexts/AuthContext";
const SingleLecturer = () => {
	let { id } = useParams();
	const [lecturer, setLecturer] = useState(null);
	const { setAlert, alert } = useAuth();

	const [error, setError] = useState("null");

	let token = localStorage.getItem("token");

	useEffect(() => {
		setTimeout(() => setAlert(""), 5000);

		axios
			.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response.data.data);
				setLecturer(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, token]);

	let enrolments = null;

	if (lecturer?.enrolments && lecturer.enrolments.length) {
		enrolments = lecturer.enrolments.map((enrolment, index) => (
			<div key={index} className="">
				<div
					id={`enrolment-collapse-${index}`}
					className=""
					aria-labelledby={`enrolment-heading-${index}`}
					data-bs-parent="#accordionExample"
				>
					<div className=" bg-base-200">
						<Link to={`/course/${enrolment.course?.id}`}>
							<p className="mb-2 text-3xl text-zinc-0">
								Course Title: {enrolment.course?.title}
							</p>
						</Link>

						<p>Course Code: {enrolment.course?.code}</p>
						<p>Lecturer Status: {enrolment.course?.level}</p>

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

	if (!lecturer) {
		return (
			<>
				<p className="text-lg"> oh no, no lecturer found!</p>
				<br />
				<Link to="/">return home</Link>
			</>
		);
	}
	return (
		<>
			{" "}
			<p className="flex items-center justify-center text-lg bg-red-500 text-white ">
				{alert}
			</p>
			<div className="max-w-2xl mx-auto mt-8 p-4 bg-blue-400 shadow-md rounded-md">
				<h2 className="text-3xl text-zinc-800 font-bold mb-2">
					{lecturer?.name}
				</h2>
				<Link
					to={`/lecturer/edit/${id}`}
					className="btn mr-2 text-l bg-neutral-800"
				>
					Edit this lecturer
				</Link>

				<button
					className="btn bg-neutral-800"
					onClick={() => document.getElementById("my_modal_1").showModal()}
				>
					Delete
				</button>
				<dialog id="my_modal_1" className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg ">Delete Lecturer</h3>
						<p className="py-4">Are you Sure</p>
						<div className="modal-action">
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn bg-neutral-800">Cancel</button>
								<DeleteBtn resource={"lecturers"} id={id}>
									delete this lecturerm
								</DeleteBtn>
							</form>
						</div>
					</div>
				</dialog>
				<p className="text-zinc-800 mt-8 overflow-auto ">
					Email : {lecturer.email}
				</p>
				<p className="text-zinc-800 mb-8 ">Phone Number : {lecturer.phone}</p>
				<div className="collapse collapse-arrow bg-base-200">
					<input type="radio" name="my-accordion-1" defaultChecked={true} />
					<div className="collapse-title text-xl ">Additional info</div>
					<div className="collapse-content">Address : {lecturer?.address}</div>
					<div className="collapse collapse-arrow bg-base-200">
						<input type="radio" name="my-accordion-1" />
						<div className="collapse-title text-xl font-medium">enrolments</div>
						<div className="collapse-content">
							{enrolments ? enrolments : <p>No enrolments available.</p>}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleLecturer;
