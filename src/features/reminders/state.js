import { createSlice } from "@reduxjs/toolkit";
import { reminderCompare, getDateKey } from "./functions";
import { v4 as uuid } from "uuid";

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
      prepare: (date, values) => {
        const dateKey = getDateKey(date);
        const id = values.id ? values.id : uuid();

        return { payload: { dateKey, values: { ...values, id } } };
      },
    },
  },
});

export const { addReminder } = slice.actions;

export default slice.reducer;
