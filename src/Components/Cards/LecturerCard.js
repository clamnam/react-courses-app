import { Link } from "react-router-dom";
const LecturerCard = (props) => {
	let card;
	props = props.props;
	// defines card for lecturers

	card = (
		<>
			<div className="card bg-neutral-900  border border-black px-6 overflow-hidden shadow-lg flex flex-col">
				<figure></figure>
				<div className="card-body">
					<div className="overflow-y-hidden">
						<h2 className="card-title text-neutral-100">
							<Link to={`/lecturer/${props.id}`}>{props.name}</Link>
						</h2>
						<div>
							<p className="m-0">Email : {props.email}</p>
							<br />
							<p className="">Phone Number : {props.phone}</p>
						</div>
					</div>
					<div className="card-actions justify-end">
						<Link to={`/lecturer/${props.id}`}>
							<button className="btn  btn-primary">Check it out</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
	return <>{card}</>;
};
export default LecturerCard;
