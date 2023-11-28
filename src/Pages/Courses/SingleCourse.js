import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const SingleCourse = () => {
  let { id } = useParams();
  const [course, setCourse] = useState(null);
  let token = localStorage.getItem("token");
  console.log(course);

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.data);
        setCourse(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  let enrolments = null;

  if (course?.enrolments && course.enrolments.length) {
    enrolments = course.enrolments.map((enrollment, index) => (
      <div key={index} className="">

        <div id={`enrollment-collapse-${index}`} className="" aria-labelledby={`enrollment-heading-${index}`} data-bs-parent="#accordionExample">
          <div className=" bg-base-200">
            <p>Lecturer: {enrollment.lecturer.name}</p>
            <p>Status: {enrollment.status}</p>
          </div>
        </div>
        </div>

    ));
  }
  if(!course){
    return(
      <><p className="text-lg"> oh no, no course found!</p><br/><Link to='/'>return home</Link></>
    )
  }
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-500 shadow-md rounded-md">
        
      <h2 className="text-3xl text-gray-600 font-bold mb-4">{course?.title}</h2>
      <p className="text-gray-600 ">Course Code : {course?.code}</p>
      <p className="text-gray-600 mb-8">{course?.description}</p>
      <div className="" id="accordion">
      </div>
      <div className="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" defaultChecked={true} />
  <div className="collapse-title text-xl font-medium">
    Additional info
  </div>
  <div className="collapse-content">
  Points : {course?.points}
  <br/>
  Level : {course?.level}

  </div>
</div>
<div className="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-xl font-medium">
    enrollments
  </div>
  <div className="collapse-content"> 
  {enrolments ? enrolments : <p>No enrollments available.</p>}
  </div>



      </div>
      <Link to={`/course/edit/${id}`}>Edit this course</Link>
      {/* <Link to={`/course/edit/${id}`}>Edit this course</Link> */}


    </div>
  );
};

export default SingleCourse;
