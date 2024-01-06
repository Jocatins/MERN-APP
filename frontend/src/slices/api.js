export const url = "http://localhost:8700/api";

export const setHeaders = () => {
	const headers = {
		headers: {
			"x-auth-token": localStorage.getItem("token"),
		},
	};

	return headers;
};
