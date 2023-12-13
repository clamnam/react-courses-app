import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBtn from "../../Components/DeleteBtn";

import { useAuth } from "../../contexts/AuthContext";
const SingleCourse = () => {
	let { id } = useParams();
	const [course, setCourse] = useState(null);
	const [error, setError] = useState("null");
	const [backgroundPhoto, setBackgroundPhoto] = useState(null);

	const { setAlert, alert } = useAuth();

	let token = localStorage.getItem("token");

	const deleteCourse = () => {
		return <>error deleting course</>;
	};



	useEffect(() => {
		setTimeout(() => setAlert(""), 5000);
		
		const pexelsQuery = course?.title.replace(/\s/g, "%20");
		axios
			.get(`https://college-api.vercel.app/api/courses/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setCourse(response.data.data);

			})
			.catch((err) => {
				console.log(err);
			});

			axios
			.get(
				`https://api.pexels.com/v1/search?query=${pexelsQuery}&per_page=1`,
				{
					headers: {
						Authorization: "5zhsDrAO5uynl0lesA8wH6YNvfIgB47vbcPyt08xQ5hejBenR2FuEuGO",
						
					},
				}
			)
			.then((response) => {
				const photoUrl = response.data.photos[0]?.src.original;
				setBackgroundPhoto(photoUrl);
			})
			.catch((err) => {
				console.error("Error fetching background photo:", err);
			});
	}, [id, token, setAlert,course?.title]);

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
							<p className="mb-2 text-3xl text-zinc-200 hover:underline">
								Lecturer: {enrolment.lecturer.name}
							</p>
						</Link>
						<p>Email: {enrolment.lecturer.email}</p>

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
			{/* alert displayed if there is one */}
			<p className="flex items-center justify-center text-lg bg-red-700 text-white ">
				{alert}
			</p>
			<div className="max-w-2xl mx-auto mt-8 p-4 bg-blue-600 shadow-md rounded-md single-course-container"
			>
				<h2 className="text-3xl text-zinc-800 font-bold mb-4">
					{course?.title}
				</h2>

				<Link
					to={`/course/edit/${id}`}
					className="btn mr-2 text-l bg-neutral-800"
				>
					Edit this course
				</Link>
				{/* modal to confirm users decision to delete the course */}

				<button
					className="btn bg-neutral-800"
					onClick={() => document.getElementById("my_modal_1").showModal()}
				>
					Delete
				</button>
				<dialog id="my_modal_1" className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Delete course</h3>
						<p className="py-4">Are you Sure</p>
						<div className="modal-action">
							<form method="dialog">
								<button className="btn">Cancel</button>
								<DeleteBtn
									deleteCallback={deleteCourse}
									resource="courses"
									secondResource={
										course.enrolments && course.enrolments.length > 0
											? "enrolments"
											: null
									}
									data={course.enrolments}
									id={id}
								>
									delete this course
								</DeleteBtn>
							</form>
						</div>
					</div>
				</dialog>			
				{/* if photo not found displays text to inform user */}
				{backgroundPhoto ?  (<img className="my-2 rounded-md" src={backgroundPhoto} alt="generated depiction of course "></img>) : (<><br/><p className=" my-3 text-red-600">no photo found...</p></>)}
									
				<p className="text-zinc-800 my-2 ">Course Code : {course?.code}</p>

				<p className="text-zinc-800 my-2">{course?.description}</p>
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

export default SingleCourse;
