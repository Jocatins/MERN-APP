import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import cartReducer, { getTotals } from "./slices/cartSlice";
import productReducer, { productsFetch } from "./slices/productSlice";
import { productsApi } from "./slices/productsApi";

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		products: productReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			apiSlice.middleware,
			productsApi.middleware,
		]),
	devTools: true,
});

store.dispatch(productsFetch());
store.dispatch(getTotals());

export default store;
