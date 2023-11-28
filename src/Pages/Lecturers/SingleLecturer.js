import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBtn from "../../Components/DeleteBtn";
const SingleLecturer = () => {
	let { id } = useParams();
	const [lecturer, setLecturer] = useState(null);
	const [error, setError] = useState("null");

	let token = localStorage.getItem("token");

	const deleteLecturer = () => {
		return <p className="error">Error</p>;
	};
	useEffect(() => {
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

	// if (lecturer?.enrolments && lecturer.enrolments.length) {
	// 	enrolments = lecturer.enrolments.map((enrollment, index) => (
	// 		<div key={index} className="">
	// 			<div
	// 				id={`enrollment-collapse-${index}`}
	// 				className=""
	// 				aria-labelledby={`enrollment-heading-${index}`}
	// 				data-bs-parent="#accordionExample"
	// 			>
	// 				<div className=" bg-base-200">
	// 					<p>Lecturer: {enrollment.lecturer?.name}</p>
	// 					<p>Status: {enrollment.status}</p>
	// 					<hr className="" />
	// 					<br />
	// 				</div>
	// 			</div>
	// 		</div>
	// 	));
	// }
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
			<div className="max-w-2xl mx-auto mt-8 p-4 bg-red-500 shadow-md rounded-md">
				<h2 className="text-3xl text-zinc-800 font-bold mb-4">
					{lecturer?.name}
				</h2>
				<Link to={`/lecturer/edit/${id}`} className="btn text-l bg-neutral-800">
					Edit this lecturer
				</Link>
				<DeleteBtn resource={lecturer} id={id} deleteCallback={deleteLecturer}>
					delete this lecturer
				</DeleteBtn>
				<p className="text-zinc-800 ">Lecturer Code : {lecturer?.code}</p>
				<p className="text-zinc-800 mb-8">{lecturer?.description}</p>
				<div className="" id="accordion"></div>
				<div className="collapse collapse-arrow bg-base-200">
					<input type="radio" name="my-accordion-1" defaultChecked={true} />
					<div className="collapse-title text-xl ">Additional info</div>
					<div className="collapse-content">
						Points : {lecturer?.points}
						<br />
						Level : {lecturer?.level}
					</div>
					<div className="collapse collapse-arrow bg-base-200">
						<input type="radio" name="my-accordion-1" />
						<div className="collapse-title text-xl font-medium">
							enrollments
						</div>
						<div className="collapse-content">
							{enrolments ? enrolments : <p>No enrollments available.</p>}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleLecturer;
