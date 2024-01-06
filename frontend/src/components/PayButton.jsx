import axios from "axios";
import { url } from "../slices/api";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
	const { userInfo } = useSelector((state) => state.auth);

	const handleCheckout = () => {
		// console.log(cartItems);
		axios
			.post(`${url}/stripe/create-checkout-session`, {
				cartItems,
				// userId: userInfo.name,
			})
			.then((res) => {
				if (res.data.url) {
					window.location.href = res.data.url;
				}
			})
			.catch((err) => console.log(err.message));
	};
	return (
		<>
			<button onClick={() => handleCheckout()}>Check out</button>
		</>
	);
};

export default PayButton;
