import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8700" }),
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: () => "products",
		}),
	}),
});

export const { useGetAllProductsQuery } = productsApi;
