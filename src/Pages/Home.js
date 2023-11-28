import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
const Home = () => {
	const { authenticated } = useAuth();

	return (
		<>
			{!authenticated && (
				<>
					<Link className="btn text-xl bg-neutral-800" to={"/Login"}>
						Login
					</Link>{" "}
					<Link className="btn text-xl bg-neutral-800" to={"/Register"}>
						Register
					</Link>
				</>
			)}
			<div>
				<div className="diff h-screen">
					<div className="diff-item-1">
						<div
							className="bg-primary-content text-7xl text-slate-950 font-black grid place-content-center"
							style={{
								backgroundImage: `url(${require("../resources/proffesor.jpg")})`,
								backgroundSize: "cover",
							}}
						>
							<Link to="/">Find the Best Lecturers</Link>
						</div>
					</div>

					<div className="diff-item-2">
						<div
							className=" bg-primary-content text-slate-950 text-7xl font-black grid place-content-center"
							style={{
								backgroundImage: `url(${require("../resources/graduate.jpg")})`,
								backgroundSize: "cover",
							}}
						>
							Find the Right Course
						</div>
					</div>

					<div className="diff-resizer"></div>
				</div>
			</div>
		</>
	);
};

export default Home;
