import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import ScreenImg from "../assets/img/phone-img.png";

const Hero = () => {
	return (
		<>
			<div className="container px-5 pt-5 mt-5">
				<div className="row gx-5 align-items-center">
					<div className="col-lg-6">
						<div className="mb-5 mb-lg-0 text-center text-lg-start">
							<h1 className="display-1 lh-1 mb-3">
								Shopping has gotten easier.
							</h1>
							<p className="lead fw-normal text-muted mb-5">
								Purchase your items on a landing page faster
								with this free, open source theme from Start
								Bootstrap!
							</p>
							<div className="d-flex flex-column flex-lg-row align-items-center">
								<LinkContainer to="/login">
									<Button
										variant="primary"
										className="me-lg-3 mb-4 mb-lg-0"
									>
										Sign In
									</Button>
								</LinkContainer>
								<LinkContainer to="/register">
									<Button
										variant="secondary"
										className="me-lg-3 mb-4 mb-lg-0"
									>
										Sign up
									</Button>
								</LinkContainer>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="d-flex justify-content-center mt-5 mt-xxl-0">
							<div className="profile bg-gradient-primary-to-secondary">
								<img
									src={ScreenImg}
									alt="...."
									style={{ width: 400, height: 600 }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
