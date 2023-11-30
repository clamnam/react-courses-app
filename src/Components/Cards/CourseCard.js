import { Link } from "react-router-dom";
const CourseCard = (props) =>{
let card;
    props = props.props
    console.log(props)
card =(					<>
    <div className="card w-96 sm:w-3/4 bg-base-200 h-96 border border-black px-6 overflow-hidden shadow-lg flex flex-col">
        <div className="card-body">
            <h2 className="card-title">
                <Link to={`/course/${props.id}`}>{props.title}</Link>
            </h2>
            <p className="overflow-hidden h-7">{props.description}</p>
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