import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false
  },
  reducers: {
    setUserIsLoggedIn: (state, action) => {
      console.log({ payload: action.payload });
      state.isLogged = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
