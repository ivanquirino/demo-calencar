import { configureStore } from "@reduxjs/toolkit";
import calendar from "features/calendar/state";

export default configureStore({
  reducer: { calendar },
});
