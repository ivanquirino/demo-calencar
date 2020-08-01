import { createSelector } from "@reduxjs/toolkit";
import { getDateKey } from "./functions";

const dateReminders = (state, date) => {
  const dateKey = getDateKey(date);

  return state.reminders[dateKey] || [];
};
export const dateRemindersSelector = createSelector(dateReminders, (x) => x);
