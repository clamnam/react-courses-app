import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateLecturerForm = () => {
	// gets id from url
	let { id } = useParams();
	
	const navigate = useNavigate();
	let token = localStorage.getItem("token");

	// sets form state and lecturer data to be inserted in form
	const [lecturerData, setLecturerData] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
	});

	const [form, setForm] = useState({
		
		name: "",
		address: "",
		phone: "",
		email: "",
	});

	const [errMessage, setErrMessage] = useState("");

	useEffect(() => {
		// gets lecturer data
		axios
			.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response.data.data);
				setLecturerData(response.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, token]);

	useEffect(() => {
		// Update the form state when lecturerData changes
		setForm({
			name: lecturerData.name || "",
			address: lecturerData.address || "",
			phone: lecturerData.phone || "",
			email: lecturerData.email || "",
		});
	}, [lecturerData]);

	const handleClick = () => {
		axios
		// sends put request to update lecturer
			.put(
				`https://college-api.vercel.app/lecturers/${id}`,
				{
					name: form.name,
					address: form.address,
					phone: form.phone,
					email: form.email,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				let data = response.data.data;
				console.log(data.id);
				navigate(`/lecturer/${data.id}`);
			})
			.catch((err) => {
				console.error(err);
				console.log(err.response.data);
				setErrMessage(err.response.data.error);
			});
	};

	const handleForm = (e) => {
		// sets form state to the data from the form
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="p-8 rounded shadow-2xl w-full max-w-md text-white">
				<div className="mb-6 text-4xl ">Edit this lecturer</div>

				<div className="mb-4">
					<label className="block">name:</label>
					<input
						onChange={handleForm}
						type="text"
						name="name"
						value={form.name}
						className="input-field"
					/>
				</div>

				<div className="mb-4">
					<label className="block">address:</label>
					<input
						onChange={handleForm}
						type="text"
						name="address"
						value={form.address}
						className="input-field"
					/>
				</div>
				<div className="mb-4">
					<label className="block">phone:</label>
					<textarea
						onChange={handleForm}
						type="text"
						name="phone"
						value={form.phone}
						className="input-field w-64"
					/>
					<div className="mb-4">
						<label className="block">email:</label>
						<input
							onChange={handleForm}
							type="text"
							name="email"
							value={form.email}
							className="input-field"
						/>
					</div>

				</div>
				{errMessage && <div className="text-red-500 mb-4">{errMessage}</div>}

				<div className="flex justify-between">
					<button className="btn btn-sm" onClick={handleClick}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateLecturerForm;
