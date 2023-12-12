import { Link } from "react-router-dom";
const CourseCard = (props) =>{
let card;
    props = props.props
card =(					<>
    <div className="card bg-neutral-900 border border-black px-6 overflow-hidden shadow-lg flex flex-col">
        <div className="card-body">
            <h2 className="card-title text-neutral-100">
                <Link to={`/course/${props.id}`}>{props.title}</Link>
            </h2>
            <p className=" ">{props.description}</p>
            <div className="card-actions justify-end">
                <button className="btn  btn-primary">
                    <Link to={`/course/${props.id}`}>Check it out</Link>
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
export default CourseCard;