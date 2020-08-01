import { configureStore } from "@reduxjs/toolkit";
import calendar from "features/calendar/state/calendar";

export default configureStore({
  reducer: { calendar },
});
