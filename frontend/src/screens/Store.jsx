import { useGetAllProductsQuery } from "../slices/productsApi";
import "../assets/styles/main-store-styles.css";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// With createAsyncThunk -->
// import { useSelector } from "react-redux";

function Store() {
	// then destructure the items from the useSelector

	const { items: products, status } = useSelector((state) => state.products);
	const { data, error, isLoading } = useGetAllProductsQuery();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
		navigate("/cart");
	};

	return (
		<>
			<div className="store-container">
				{status === "success" ? (
					<>
						<h2>New Arrivals</h2>
						<div className="products">
							{data &&
								data?.map((product) => (
									<div key={product.id} className="product">
										<h3>{product.name}</h3>
										<img
											src={product.image}
											alt={product.name}
										/>
										<div className="details">
											<span>{product.desc}</span>
											<span className="price">
												${product.price}
											</span>
										</div>
										<button
											onClick={() =>
												handleAddToCart(product)
											}
										>
											Add To Cart
										</button>
									</div>
								))}
						</div>
					</>
				) : status === "pending" ? (
					<p>Loading...</p>
				) : (
					<p>Unexpected error occured...</p>
				)}
			</div>
		</>
	);
}

export default Store;
