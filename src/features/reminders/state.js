import { createSlice } from "@reduxjs/toolkit";
import { reminderCompare, getDateKey } from "./functions";
import { v4 as uuid } from "uuid";
import { setHours, setMinutes, formatISO } from "date-fns";

const slice = createSlice({
  name: "reminders",
  initialState: {},
  reducers: {
    addReminder: (state, action) => {
      const { dateKey, values } = action.payload;

      const dateReminders = state[dateKey] || [];
      const newReminders = [...dateReminders, values].sort(reminderCompare);

      return { ...state, [dateKey]: newReminders };
    },
    editReminder: (state, action) => {
      const { dateKey, values } = action.payload;
      const id = values.id;

      const dateReminders = state[dateKey];
      const edited = dateReminders.filter((item) => item.id !== id);

      edited.push(values);
      edited.sort(reminderCompare);

      return { ...state, [dateKey]: edited };
    },
  },
});

export const { addReminder, editReminder } = slice.actions;

export const submitReminder = (date, values) => {
  const action = values.id ? editReminder : addReminder;

  const { id, hour, minute } = values;

  const reminderId = id ? id : uuid();
  const timestamp = formatISO(setMinutes(setHours(date, hour), minute));
  const dateKey = getDateKey(date);

  return action({ dateKey, values: { ...values, id: reminderId, timestamp } });
};

export default slice.reducer;
