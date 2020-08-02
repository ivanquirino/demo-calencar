import { getDateKey } from "../reminders/functions";

export const dateWeatherSelector = (state, date) => {
  const dateKey = getDateKey(date);

  return state.weather[dateKey];
};
