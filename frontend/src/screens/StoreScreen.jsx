import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/store-styles.css";

const StoreScreen = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoading(true);
		axios({
			method: "GET",
			url: "https://fakestoreapi.com/products",
		})
			.then((res) => {
				console.log(res.data);
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<>
			<div className="products-container">
				{loading && (
					<div>
						{""}
						<h3>Loading....</h3>
					</div>
				)}
				{data.map((product) => (
					<div key={product.id} className="card">
						<div>
							<img src={product.image} alt="#" />
						</div>
						<div className="card-description"></div>
						<h6>{product.title}</h6>
						<h6>{`Price: ${product.price}`}</h6>
						<h6>{`Description: ${product.description}`}</h6>
					</div>
				))}
			</div>
		</>
	);
};

export default StoreScreen;
