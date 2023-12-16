import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<Header />
			<ToastContainer />
			<Container>
				<Outlet />
			</Container>
			<Footer />
		</>
	);
};

export default App;
