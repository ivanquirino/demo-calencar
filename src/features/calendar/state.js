import { createSlice } from "@reduxjs/toolkit";
import { getYear, getMonth, getDate, addMonths, subMonths } from "date-fns";

const now = new Date();

const year = getYear(now);
const month = getMonth(now);
const date = 0;

const slice = createSlice({
  name: "calendar",
  initialState: {
    year,
    month,
    date,
  },
  reducers: {
    nextMonth: (state) => {
      const { year, month } = state;
      const current = new Date(year, month);
      const next = addMonths(current, 1);

      return { ...state, year: getYear(next), month: getMonth(next), date: 0 };
    },
    previousMonth: (state) => {
      const { year, month } = state;
      const current = new Date(year, month);
      const previous = subMonths(current, 1);

      return {
        ...state,
        year: getYear(previous),
        month: getMonth(previous),
        date: 0,
      };
    },
    setDate: {
      reducer: (state, action) => {
        const { year, month, date } = action.payload;

        return { ...state, year, month, date };
      },
      prepare: (date) => ({
        payload: {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date),
        },
      }),
    },
  },
});

export const { nextMonth, previousMonth, setDate } = slice.actions;

export const setMonth = (date) => ({
  type: setDate.type,
  payload: { year: getYear(date), month: getMonth(date), date: 0 },
});

export default slice.reducer;
