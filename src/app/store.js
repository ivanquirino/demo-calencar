import { configureStore } from "@reduxjs/toolkit";
import calendar from "features/calendar/state";
import reminders from "features/reminders/state";

export default configureStore({
  reducer: { calendar, reminders },
});
