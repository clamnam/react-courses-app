import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBtn from "../../Components/DeleteBtn";
const SingleCourse = () => {
	let { id } = useParams();
	const [course, setCourse] = useState(null);
	const [error, setError] = useState("null");

	let token = localStorage.getItem("token");

	const deleteFestival = () => {
		return <p className="error">Error</p>;
	};
	useEffect(() => {
		axios
			.get(`https://college-api.vercel.app/api/courses/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// console.log(response.data.data);
				setCourse(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, token]);

	let enrolments = null;

	if (course?.enrolments && course.enrolments.length) {
		enrolments = course.enrolments.map((enrolment, index) => (
			<div key={index} className="">
				<div
					id={`enrolment-collapse-${index}`}
					className=""
					aria-labelledby={`enrolment-heading-${index}`}
					data-bs-parent="#accordionExample"
				>
					<div className=" bg-base-200">

					<Link to={`/lecturer/${enrolment.lecturer?.id}`}>
						<p>Lecturer: {enrolment.lecturer.name}</p>
						</Link>
						<p>Status: {enrolment.status}</p>
						<hr className="" />
						<br />
					</div>
				</div>
			</div>
		));
	}
	if (!course) {
		return (
			<>
				<p className="text-lg"> oh no, no course found!</p>
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
					{course?.title}
				</h2>
				<Link to={`/course/edit/${id}`} className="btn text-l bg-neutral-800">
					Edit this course
				</Link>
				<DeleteBtn resource={"courses"} id={id} deleteCallback={deleteFestival}>
					delete this course
				</DeleteBtn>
				<p className="text-zinc-800 ">Course Code : {course?.code}</p>
				<p className="text-zinc-800 mb-8">{course?.description}</p>
				<div className="collapse collapse-arrow bg-base-200">
					<input type="radio" name="my-accordion-1" defaultChecked={true} />
					<div className="collapse-title text-xl ">Additional info</div>
					<div className="collapse-content">
						Points : {course?.points}
						<br />
						Level : {course?.level}
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

export default SingleCourse;
