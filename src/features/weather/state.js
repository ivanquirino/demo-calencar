import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fromUnixTime,
  isSameDay,
  differenceInMinutes,
  parseISO,
} from "date-fns";
import { reduce, reduced } from "ramda";
import { getForecast } from "./service";
import { getDateKey } from "../reminders/functions";

export const fetchForecastByCity = createAsyncThunk(
  "weather/fetchByCity",
  async ({ city, timestamp }) => {
    const date = parseISO(timestamp);
    const dateKey = getDateKey(date);

    const response = await getForecast(city);

    try {
      const dateResults = response.data.list.filter(({ dt }) =>
        isSameDay(date, fromUnixTime(dt))
      );

      const result = reduce(
        (acc, weather) => {
          const { dt } = weather;
          const weatherDate = fromUnixTime(dt);
          const diff = Math.abs(differenceInMinutes(weatherDate, date));

          if (diff === 0) return reduced(weather);
          if (diff < acc) return weather;
          return acc;
        },
        dateResults[0], // amount of minutes of a day
        dateResults
      );

      const { main, description } = result.weather[0];

      return { dateKey, forecast: `${main}, ${description}` };
    } catch (e) {
      console.error(e);
    }

    return { dateKey, forecast: "" };
  }
);

const slice = createSlice({
  name: "weather",
  initialState: {},
  reducers: {
    clearForecast: {
      reducer: (state, action) => {
        const dateKey = action.payload;
        return { ...state, [dateKey]: undefined };
      },
      prepare: (timestamp) => ({ payload: getDateKey(parseISO(timestamp)) }),
    },
  },
  extraReducers: {
    [fetchForecastByCity.fulfilled]: (state, action) => {
      const { dateKey, forecast } = action.payload;
      return { ...state, [dateKey]: forecast };
    },
  },
});

export const { clearForecast } = slice.actions;

export default slice.reducer;
