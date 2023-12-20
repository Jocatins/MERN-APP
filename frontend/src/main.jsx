import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import StoreScreen from "./screens/StoreScreen.jsx";
import Store from "./screens/Store.jsx";
import NotFound from "./screens/NotFound.jsx";
import Cart from "./screens/Cart.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route path="/products" element={<Store />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="*" element={<NotFound />} />
			{/* Private Routes */}
			<Route path="/" element={<PrivateRoute />}>
				<Route path="/profile" element={<ProfileScreen />} />
				<Route path="/dashboard" element={<DashboardScreen />} />
				<Route path="/store" element={<StoreScreen />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
