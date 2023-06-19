// Responsible for making async requests to the backend
// It uses RTK query which is a library for interacting with the backend APIs

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User"], // has to do with caching data
	endpoints: (builder) => ({}), // builder is like a parent to any other apiSlices eg Users ApiSlice
});
