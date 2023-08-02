import { createSlice } from "@reduxjs/toolkit";

// this will check localStorage for user-info
// take the user data that we get from our API and put it in local storage
const initialState = {
	// check local Storage for userInfo
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
		clearCredentials: (state) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

// when you call setCredentials, its an action, when it changes the state, it becomes a reducer
export default authSlice.reducer;
