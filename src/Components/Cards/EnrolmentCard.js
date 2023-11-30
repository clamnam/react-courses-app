import { Link } from "react-router-dom";
const EnrolmentCard = (props) =>{
let card;
    props = props.props
card =(					
    <>
    <div className="card w-96 sm:w-3/4 bg-base-200 h-70 border border-black px-6 overflow-hidden shadow-lg flex flex-col">
        <figure></figure>
        <div className="card-body">
            <div className="overflow-y-hidden">
                <h2 className="card-title">
                    <Link to={`/enrolment/${props.id}`}>
                        Enrollment :
                    </Link>
                </h2>
                <div>
                    <p className="overflow-auto ">Lecturers  : {props.lecturer.name}</p>
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
</>);
    return(
        <>
        {card}
        </>
    )
}
export default EnrolmentCard;