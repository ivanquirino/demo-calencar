import axios from "axios";

const URL = "http://api.openweathermap.org/data/2.5/forecast";
const appid = process.env.REACT_APP_OPEN_WEATHER_MAP_APP_ID;

export const getForecast = (city) =>
  axios.get(URL, { params: { q: city, appid } });
