import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatISO } from "date-fns";
import { Flex, Text } from "theme-ui";
import Button from "components/Button";
import { dateRemindersSelector } from "../selectors";
import { deleteAll, deleteReminder } from "../state";
import { fetchForecastByCity, clearForecast } from "../../weather/state";
import { dateWeatherSelector } from "../../weather/selectors";
import { decideFetchForecast } from "../../weather/functions";

function Reminders({ date, setValues }) {
  const reminders = useSelector((state) => dateRemindersSelector(state, date));
  const { city = "" } = reminders[0] || {};
  const timestamp = formatISO(date);
  const forecast = useSelector((state) => dateWeatherSelector(state, date));
  const dispatch = useDispatch();

  useEffect(() => {
    if (city && decideFetchForecast(timestamp)) {
      dispatch(fetchForecastByCity({ city, timestamp }));
    } else {
      dispatch(clearForecast(timestamp));
    }
  }, [city, dispatch, timestamp]);

  const editReminder = (values) => () => setValues(values);
  const deleteAllReminders = () => dispatch(deleteAll(date));
  const deleteReminderClick = (date, id) => () =>
    dispatch(deleteReminder(date, id));

  return (
    <>
      {forecast && <Text>Forecast for the day: {forecast}</Text>}
      <Flex
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Text>Reminders for the day:</Text>
        {reminders.length > 0 && (
          <Button sx={{ bg: "red" }} onClick={deleteAllReminders}>
            Delete All
          </Button>
        )}
      </Flex>

      {reminders.map((item) => {
        const { id, reminder, city, color, time } = item;

        return (
          <Flex
            key={id}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              my: 2,
              p: 2,
              border: "1px solid",
              borderColor: color,
              borderRadius: 4,
            }}
          >
            <Flex sx={{ alignItems: "center" }}>
              <Button sx={{ mr: 3 }} onClick={editReminder(item)}>
                Edit
              </Button>
              <Text>
                {reminder} at {time} on {city}
              </Text>
            </Flex>
            <Button
              sx={{ bg: "red" }}
              onClick={deleteReminderClick(date, item.id)}
            >
              Delete
            </Button>
          </Flex>
        );
      })}
    </>
  );
}

export default Reminders;
