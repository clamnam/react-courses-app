const Home = () => {
// landing page with sliding images
	return (
		<>

			<div>
				<div className="diff h-screen">
				<div className="diff-item-1">
						<div
							className=" bg-primary-content text-slate-950 text-7xl font-black grid place-content-center"
							style={{
								backgroundImage: `url(${require("../resources/proffesor.jpg")})`,
								backgroundSize: "cover",
							}}
						>
							Find the Best Lecturer
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
							&#32;&#32;Find the Best Course &#32;	&#32;
						</div>
					</div>

					<div className="diff-resizer"></div>
				</div>
			</div>
		</>
	);
};

export default Home;
