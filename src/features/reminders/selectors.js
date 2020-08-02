import { createSelector } from "@reduxjs/toolkit";
import { getHours, getMinutes, format, parseISO } from "date-fns";
import { getDateKey } from "./functions";

export const dateReminders = (state, date) => {
  const dateKey = getDateKey(date);

  return state.reminders[dateKey];
};

export const mapReminders = (selectedReminders) => {
  let reminders = selectedReminders || [];

  reminders = reminders.map((item) => {
    const { reminder, timestamp } = item;
    const date = parseISO(timestamp);
    const hour = getHours(date);
    const minute = getMinutes(date);
    const time = format(date, "kk:mm");
    const short = `${time} ${reminder}`;

    return { ...item, hour, minute, short, time };
  });

  return reminders;
};

export const dateRemindersSelector = createSelector(
  dateReminders,
  mapReminders
);

export const makeRemindersMicroListSelector = () =>
  createSelector(dateReminders, mapReminders);
