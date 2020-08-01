import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import { reminderCompare } from "./functions";

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
        const dateKey = formatISO(date, { representation: "date" });

        return { payload: { dateKey, values } };
      },
    },
  },
});

export const { addReminder } = slice.actions;

export default slice.reducer;
