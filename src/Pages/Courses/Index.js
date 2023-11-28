import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import { useNavigate } from "react-router-dom";
const Index = ({ authenticated ,onAuthenticated}) => {
	let navigate = useNavigate();
	let token = localStorage.getItem("token");
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		axios
			.get("https://college-api.vercel.app/api/courses", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// console.log(response.data);
				if(authenticated){
				setCourses(response.data.data);}else{navigate('/')}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	if (courses.length === 0) return <LoginForm/>;

	const coursesList = courses.map((course, index) => {
		return (
			<div key={index}>
				{authenticated ? (
					<>
						<div className="card w-96 sm:w-3/4 bg-base-200 border border-black px-6 overflow-hidden shadow-lg flex flex-col">
							<figure>
							</figure>
							<div className="card-body">
								<h2 className="card-title">
									<Link to={`/course/${course.id}`}>{course.title}</Link>
								</h2>
								<p>If a dog chews shoes whose shoes does he choose?</p>
								<div className="card-actions justify-end">
									<button className="btn btn-primary">
									<Link to={`/course/${course.id}`}>Check it out</Link>

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
		{authenticated &&(       <> <Link to="/course/create" className="text-white bg-slate-500 text-xl mr-4 btn">Create a New Course</Link></>  
)}
			<h1 className="mb-4 text-2xl place-content-center ">All Courses</h1>
			<div className="  container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
				{coursesList}
			</div>
		</>
	);
};

export default Index;
