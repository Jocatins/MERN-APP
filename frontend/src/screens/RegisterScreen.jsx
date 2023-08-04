import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	//to get user data, use the useSelector hook
	const { userInfo } = useSelector((state) => state.auth);

	const [register, { isLoading }] = useRegisterMutation();

	// We use useEffect to redirect the user to home screen
	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				// set the users data in res and use unwrap the promise
				const res = await register({ name, email, password }).unwrap();
				// call setCredentials which will set the data to our localStorage
				dispatch(setCredentials({ ...res }));
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};
	return (
		<>
			<div className="container px-4 px-lg-5">
				<div className="row gx-4 gx-lg-5 justify-content-center">
					<div className="col-lg-8 col-xl-6 text-center">
						<h2 className="mt-0">Lets Get In Touch!!</h2>
						<hr className="divider" />
						<p className="text-muted mb-5">
							Ready to start your next project with us? Send us a
							messages and we will get back to you as soon as
							possible!
						</p>
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
									Submit
								</button>
							</div>
						</form>

						<div className="d-grid mt-2">
							<Link
								to="/login"
								className="btn btn-light btn-xl "
								type="submit"
							>
								Click here to Sign In
							</Link>
						</div>

						{isLoading && <Loader />}
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterScreen;
