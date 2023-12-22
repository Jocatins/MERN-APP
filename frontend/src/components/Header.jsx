import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {
	FaSignInAlt,
	FaSignOutAlt,
	FaStoreAlt,
	FaShoppingBag,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";

import "../assets/styles/header-styles.css";

const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { cartTotalQuantity } = useSelector((state) => state.cart);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			// making the request which will destroy the cookie
			await logoutApiCall().unwrap();
			dispatch(clearCredentials());
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<header>
				<Navbar
					bg="dark"
					variant="dark"
					expand="sm"
					collapseOnSelect
					className="navbar navbar-expand-lg navbar-light "
				>
					<Container>
						<LinkContainer to="/">
							<Navbar.Brand>
								<FaStoreAlt />
								SphinX
							</Navbar.Brand>
						</LinkContainer>

						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ms-auto">
								{userInfo ? (
									<>
										<LinkContainer to="/store">
											<Nav.Link>
												<FaStoreAlt />
												Store
											</Nav.Link>
										</LinkContainer>

										<NavDropdown
											title={userInfo.name}
											id="username"
										>
											<LinkContainer to="/profile">
												<NavDropdown.Item>
													Profile
												</NavDropdown.Item>
											</LinkContainer>
											<NavDropdown.Item
												onClick={logoutHandler}
											>
												Logout
											</NavDropdown.Item>
										</NavDropdown>
									</>
								) : (
									<>
										<LinkContainer to="/products">
											<Nav.Link>
												<div className="nav-bag">
													<FaShoppingBag
														style={{
															width: 25,
															height: 25,
														}}
													/>
													<span className="bag-quantity">
														{cartTotalQuantity}
													</span>
												</div>
											</Nav.Link>
										</LinkContainer>

										<LinkContainer to="/login">
											<Nav.Link>
												<FaSignInAlt />
												Sign In
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/register">
											<Nav.Link>
												<FaSignOutAlt />
												Sign up
											</Nav.Link>
										</LinkContainer>
									</>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
};

export default Header;
