import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const DeleteBtn = ({ id, resource, secondResource, data, deleteCallback }) => {
	let token = localStorage.getItem("token");

	const Navigate = useNavigate();
	const { authenticated, onAuthenticated } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [enrolments, setEnrolments] = useState([]);

	const onDelete = () => {
		let token;
		if(authenticated){
			token = localStorage.getItem("token");

		}
		axios
			.get("https://college-api.vercel.app/api/enrolments", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response.data.data);
				setEnrolments(response.data.data);
	console.log(resource)
				let filteredEnrolments = [];
				if (resource === "courses") {
					filteredEnrolments = response.data.data.filter(
						(enrolment) => enrolment.course.id === id
					);
				} else if (resource === "lecturers") {
					filteredEnrolments = response.data.data.filter(
						(enrolment) => enrolment.lecturer.id === id

					);



				}
				for(let x = 0; x<response.data.data.length;x++){
					if(response.data.data[x].enrolment.lecturer.id === id) console.log(response.data.data[x])
				}
	
				setEnrolments(filteredEnrolments);
				console.log(filteredEnrolments);
	
				// Continue with the DELETE request
				axios
					.delete(`https://college-api.vercel.app/${resource}/${id}`, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						let data = response.data;
						console.log(data);
						deleteCallback(id);
						Navigate(`/${resource}`, { Id: id });
					})
					.catch((err) => {
						console.log(err.response.data);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	
	

	return (
		<button className="btn text-l bg-neutral-800" onClick={onDelete}>
			{isLoading ? "Deleting." : "Delete"}
		</button>
	);
};
export default DeleteBtn;
