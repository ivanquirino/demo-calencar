import { configureStore } from "@reduxjs/toolkit";
import calendar from "features/calendar/state";
import reminders from "features/reminders/state";
import weather from "features/weather/state";

export const createStore = () =>
  configureStore({
    reducer: { calendar, reminders, weather },
  });

export default createStore();
