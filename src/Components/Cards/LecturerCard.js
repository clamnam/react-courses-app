import { Link } from "react-router-dom";
const LecturerCard = (props) =>{
let card;
    props = props.props
card =(					<>
						<div className="card w-96 sm:w-3/4 bg-base-200 h-70 border border-black px-6 overflow-hidden shadow-lg flex flex-col">
							<figure>
							</figure>
							<div className="card-body">
								<div className="overflow-y-hidden">
								<h2 className="card-title">
									<Link to={`/lecturer/${props.id}`}>{props.name}</Link>
								</h2>
								<div>
								<p className="overflow-auto ">Email : {props.email}</p>
								<br/>
								<p className=" ">Phone Number : {props.phone}</p>
								</div>
								</div>
								<div className="card-actions justify-end">
									<button className="btn  btn-primary">
									<Link to={`/lecturer/${props.id}`}>Check it out</Link>

									</button>
								</div>
							</div>
						</div>
</>);
    return(
        <>
        {card}
        </>
    )
}
export default LecturerCard;