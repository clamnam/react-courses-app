import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Navbar = () => {
		// defines onauthenticated as brought from the context provider

	const { authenticated, onAuthenticated } = useAuth();
    // sets state variables and assign usenavigate to Navigate
	const navigate = useNavigate();
	// removes token and authentication
	const logout = () => {
		onAuthenticated(false);
		navigate(`/`);
	};


	return (
		<div data-theme='cupcake'className="bg-blue-800 p-4">
			<Link to="/" className="text-white mr-4">
				Home
			</Link>
			<span className="text-white">|</span>
			<></>
			<Link to="/courses" className="text-white ml-4">
				Courses
			</Link>
			<Link to="/lecturers" className="text-white ml-4">
				Lecturers
			</Link>
			<Link to="/enrolments" className="text-white ml-4">
				Enrolments
			</Link>

			{authenticated && (
				<>
					<span className="text-white ml-5">|</span>

					<button
						className="text-white ml-4 px-2 py-1 rounded"
						onClick={logout}
					>
						Logout
					</button>
				</>
			)}
			{!authenticated && (
				<>
					<span className="text-white p-4">|</span>
					<Link className="text-white " to={"/Login"}>
						Login
					</Link>{" "}
					<Link className="text-white ml-4" to={"/Register"}>
						Register
					</Link>
				</>
			)}
		</div>
);
};

export default Navbar;
