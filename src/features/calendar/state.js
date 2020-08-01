import { createSlice } from "@reduxjs/toolkit";
import { getYear, getMonth, addMonths, subMonths } from "date-fns";

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

      return { ...state, year: getYear(next), month: getMonth(next) };
    },
    previousMonth: (state) => {
      const { year, month } = state;
      const current = new Date(year, month);
      const previous = subMonths(current, 1);

      return { ...state, year: getYear(previous), month: getMonth(previous) };
    },
    setMonthFromDate: {
      reducer: (state, action) => {
        const { year, month } = action.payload;

        return { ...state, year, month };
      },
      prepare: (date) => ({
        payload: { year: getYear(date), month: getMonth(date) },
      }),
    },
  },
});

const { reducer } = slice;

export default reducer;

export const { nextMonth, previousMonth, setMonthFromDate } = slice.actions;
