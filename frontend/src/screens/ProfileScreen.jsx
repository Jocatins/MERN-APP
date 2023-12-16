import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [upateProfile, { isLoading }] = useUpdateUserMutation();

	//to get user data, use the useSelector hook
	const { userInfo } = useSelector((state) => state.auth);

	// We use useEffect to redirect the user to home screen
	useEffect(() => {
		setName(userInfo.name);
		setEmail(userInfo.email);
	}, [userInfo.setName, userInfo.setEmail]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await upateProfile({
					_id: userInfo.id,
					name,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile updated Successfully");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
		navigate("/dashboard");
	};
	return (
		<>
			<div className="container px-4 px-lg-5">
				<div className="row gx-4 gx-lg-5 justify-content-center">
					<div className="col-lg-8 col-xl-6 text-center">
						<h2 className="mt-0">Update your Profile</h2>
						<hr className="divider" />
					</div>
				</div>
				<div className="row gx-4 gx-lg-5 justify-content-center mb-5">
					<div className="col-lg-6">
						<form onSubmit={submitHandler}>
							<div className="form-floating mb-3">
								<input
									className="form-control"
									id="name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<label>Name</label>
							</div>
							<div className="form-floating mb-3">
								<input
									className="form-control"
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label>Email Address</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control"
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<label>Password</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control"
									id="confirmPassword"
									type="password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
								<label>Confirm Password</label>
							</div>

							<div className="d-grid">
								<button
									className="btn btn-primary btn-xl "
									type="submit"
								>
									Update Profile
								</button>
							</div>
						</form>

						<div className="d-grid mt-2">
							<Link
								to="/dashboard"
								className="btn btn-light btn-xl "
								type="submit"
							>
								Back
							</Link>
						</div>

						{isLoading && <Loader />}
					</div>
				</div>
			</div>

			{/* <FormContainer>
				<h3>Update Profile</h3>
				<Form onSubmit={submitHandler}>
					<Form.Group className="my-2" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className="my-2" controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className="my-2" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className="my-2" controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					{isLoading && <Loader />}

					<Button
						type="submit"
						variant="primary"
						className="mt-3 me-2"
					>
						Update
					</Button>
					<LinkContainer to="/">
						<Button variant="primary" className="mt-3">
							Back
						</Button>
					</LinkContainer>
				</Form>
			</FormContainer> */}
		</>
	);
};

export default ProfileScreen;
