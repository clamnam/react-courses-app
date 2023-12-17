import { Link } from "react-router-dom";
const EnrolmentCard = (props) => {
	let card;
	props = props.props;
        // defines card for enrolments

	card = (
		<>
			<div className="card bg-neutral-900 border border-black px-6 overflow-hidden shadow-lg flex flex-col">
				<div className="card-body">
					<div className="overflow-y-hidden">
						<h2 className="card-title text-neutral-100">
							<Link to={`/enrolment/${props.id}`}>Enrolment :</Link>
						</h2>
						<div>
							<p className="overflow-auto ">
								Lecturers : {props.lecturer.name}
							</p>
							<br />
							<p className=" ">Course : {props.course.title}</p>
						</div>
					</div>
					<div className="card-actions justify-end">
						<button className="btn  btn-primary">
							<Link to={`/enrolment/${props.id}`}>Check it out</Link>
						</button>
					</div>
				</div>
			</div>
		</>
	);
	return <>{card}</>;
};
export default EnrolmentCard;
