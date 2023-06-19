import { createSlice } from "@reduxjs/toolkit";

// this will check localStorage for user-info
const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			(state.userInfo = action.payload),
				localStorage.setItem(
					"userInfo",
					JSON.stringify(action.payload)
				);
		},
		clearCredentials: (state, action) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

// when you call setCredentials, its an action, when it changes the state, it becomes a reducer
export default authSlice.reducer;
