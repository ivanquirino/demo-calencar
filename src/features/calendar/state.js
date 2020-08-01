import { createSlice } from "@reduxjs/toolkit";
import { getYear, getMonth, getDate } from "date-fns";

const now = new Date();

const year = getYear(now);
const month = getMonth(now);
const date = 0;

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    year,
    month,
    date,
  },
});

const { reducer } = calendarSlice;

export default reducer;
