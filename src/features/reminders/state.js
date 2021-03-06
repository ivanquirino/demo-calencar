import { createSlice } from "@reduxjs/toolkit";
import { reminderCompare, getDateKey } from "./functions";
import { v4 as uuid } from "uuid";
import { setHours, setMinutes, formatISO } from "date-fns";

const slice = createSlice({
  name: "reminders",
  initialState: {},
  reducers: {
    add: (state, action) => {
      const { dateKey, values } = action.payload;

      const dateReminders = state[dateKey] || [];
      const newReminders = [...dateReminders, values].sort(reminderCompare);

      return { ...state, [dateKey]: newReminders };
    },
    edit: (state, action) => {
      const { dateKey, values } = action.payload;
      const id = values.id;

      const dateReminders = state[dateKey];
      const edited = dateReminders.filter((item) => item.id !== id);

      edited.push(values);
      edited.sort(reminderCompare);

      return { ...state, [dateKey]: edited };
    },
    deleteAll: {
      reducer: (state, action) => {
        const dateKey = action.payload;
        return { ...state, [dateKey]: [] };
      },
      prepare: (date) => ({ payload: getDateKey(date) }),
    },
    deleteReminder: {
      reducer: (state, action) => {
        const { dateKey, id } = action.payload;

        const dateReminders = state[dateKey];
        const edited = dateReminders.filter((item) => item.id !== id);

        return { ...state, [dateKey]: edited };
      },
      prepare: (date, id) => ({ payload: { dateKey: getDateKey(date), id } }),
    },
  },
});

export const { add, edit, deleteAll, deleteReminder } = slice.actions;

export const submit = (date, values) => {
  const action = values.id ? edit : add;

  const { id, hour, minute, color, city, reminder } = values;

  const reminderId = id ? id : uuid();
  const timestamp = formatISO(setMinutes(setHours(date, hour), minute));
  const dateKey = getDateKey(date);

  return action({
    dateKey,
    values: { reminder, city, color, id: reminderId, timestamp },
  });
};

export default slice.reducer;
