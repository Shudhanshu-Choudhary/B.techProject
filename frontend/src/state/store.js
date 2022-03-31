import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./reducers/dashboardReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
    user: userReducer
  },
  devTools: true
});
