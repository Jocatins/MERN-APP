import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";

const Hero = () => {
	return (
		<div className=" py-5">
			<Container className="d-flex justify-content-center">
				<Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-50">
					<h1 className="text-center mb-4">MERN Authentication</h1>
					<p className="text-center mb-4">
						This is a boilerplate for MERN authentication that
						stores a JWT in an HTTP-Only cookie. It also uses Redux
						Toolkit and the React Bootstrap library
					</p>
					<div className="d-flex">
						<LinkContainer to="/login">
							<Button variant="primary" className="me-3">
								Sign In
							</Button>
						</LinkContainer>
					</div>
				</Card>
				<Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-50">
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>Card Title</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title
							and make up the bulk of the card content.
						</Card.Text>
						<LinkContainer to="/register">
							<Button variant="secondary">Sign up</Button>
						</LinkContainer>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
};

export default Hero;
