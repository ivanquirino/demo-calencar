import { createSelector } from "@reduxjs/toolkit";
import { getDateKey } from "../reminders/functions";

export const dateWeatherSelector = (state, date) => {
  const dateKey = getDateKey(date);

  return state.weather[dateKey];
};

export const makeDayOfMonthForecastSelector = () =>
  createSelector(dateWeatherSelector, (forecast) => {
    if (!forecast) return "";

    const [main] = forecast.split(", ");
    return main;
  });
