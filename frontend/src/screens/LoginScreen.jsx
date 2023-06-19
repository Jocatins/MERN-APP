import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	//to get user data, use the useSelector hook
	const { userInfo } = useSelector((state) => state.auth);
	// if there is userInfo that means we are logged in.
	// We use useEffect to redirect the user to home screen
	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			// set the users data in res and use unwrap the promise
			const res = await login({ email, password }).unwrap();
			// call setCredentials which will set the data to our localStorage
			dispatch(setCredentials({ ...res }));
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<FormContainer>
			<h3>Sign In</h3>
			<Form onSubmit={submitHandler}>
				<Form.Group className="my-2" controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="email">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				{isLoading && <Loader />}

				<Button type="submit" variant="primary" className="mt-3">
					Sign In
				</Button>
				<Row className="py-3">
					<Col>
						New Customer? <Link to="/register">Register</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default LoginScreen;
