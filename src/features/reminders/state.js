import { createSlice } from "@reduxjs/toolkit";
import { reminderCompare, getDateKey } from "./functions";
import { v4 as uuid } from "uuid";

const prepare = (date, values) => {
  const dateKey = getDateKey(date);

  return { payload: { dateKey, values } };
};

const slice = createSlice({
  name: "reminders",
  initialState: {},
  reducers: {
    addReminder: {
      reducer: (state, action) => {
        const { dateKey, values } = action.payload;

        const dateReminders = state[dateKey] || [];
        const newReminders = [...dateReminders, values].sort(reminderCompare);

        return { ...state, [dateKey]: newReminders };
      },
      prepare,
    },
    editReminder: {
      reducer: (state, action) => {
        const { dateKey, values } = action.payload;
        const id = values.id;

        const dateReminders = state[dateKey];
        const edited = dateReminders.filter((item) => item.id !== id);

        edited.push(values);
        edited.sort(reminderCompare);

        return { ...state, [dateKey]: edited };
      },
      prepare,
    },
  },
});

export const { addReminder, editReminder } = slice.actions;

export const submitReminder = (date, values) => {
  const action = values.id ? editReminder : addReminder;
  const id = values.id ? values.id : uuid();

  return action(date, { ...values, id });
};

export default slice.reducer;
