import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/styles/store-styles.css";
import Loader from "../components/Loader";

const DashboardScreen = () => {
	const [data, setData] = useState([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		setLoading(true);
		axios({ method: "GET", url: "https://fakestoreapi.com/products" })
			.then((res) => {
				console.log(res.data);
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			<div className="products-container">
				{loading && (
					<div className="loader">
						{""}
						<Loader />
					</div>
				)}
				{data.map((product, index) => (
					<>
						<Card style={{ width: "18rem", marginTop: 20 }}>
							<Card.Img
								variant="top"
								src={product.image}
								alt="#"
							/>
							<Card.Body key={index}>
								<Card.Title>{product.title}</Card.Title>
								<Card.Text>
									{`Description: ${product.description}`}
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>
					</>
				))}
			</div>
		</>
	);
};

export default DashboardScreen;
