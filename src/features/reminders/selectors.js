import { createSelector } from "@reduxjs/toolkit";
import { setHours, setMinutes, format } from "date-fns";
import { getDateKey } from "./functions";

const dateReminders = (state, date) => {
  const dateKey = getDateKey(date);

  let reminders = state.reminders[dateKey] || [];

  if (reminders) {
    reminders = reminders.map((item) => {
      const { hour, minute, reminder } = item;
      const time = format(setMinutes(setHours(date, hour), minute), "kk:mm");
      const short = `${time} ${reminder}`;

      return { ...item, short };
    });
  }

  return reminders;
};

export const dateRemindersSelector = createSelector(dateReminders, (x) => x);
