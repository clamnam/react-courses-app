import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Navbar = ({ authenticated, onAuthenticated }) => {
	const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");

  let token = localStorage.getItem("token");

    const logout = () => {

        axios
          .get(`https://college-api.vercel.app/api/logout`, {headers: {'Authorization': `Bearer ${token} `
            }})
          .then((response) => {
            console.log(response.data);
            onAuthenticated(true, response.data.token)
          })
          .catch((err) => {
            console.error(err);
            console.log(err.response.data.message);
            setErrMessage(err.response.data.message);
          });
          
          localStorage.removeItem("token");
          onAuthenticated(false);
          navigate(`/`)
      }

      return (
        <div className="bg-red-500 p-4">
          <Link to="/" className="text-white mr-4">Home</Link>
          <span className="text-white">|</span>
          <Link to="/courses" className="text-white ml-4">All courses</Link>
          {authenticated && (
            <button
              className="bg-white  ml-4 px-2 py-1 rounded"
              onClick={logout}
            >
              Logout
            </button>
          )}
          
        </div>
      );
};

export default Navbar;
