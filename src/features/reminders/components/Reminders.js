import React from "react";
import { useSelector } from "react-redux";
import { Flex, Text } from "theme-ui";
import Button from "components/Button";
import { dateRemindersSelector } from "../selectors";

function Reminders({ date, setValues }) {
  const reminders = useSelector((state) => dateRemindersSelector(state, date));

  const editReminder = (values) => () => setValues(values);

  return (
    <>
      <Text mb={3}>Reminders for the day:</Text>
      {reminders.map((item) => {
        const { id, reminder, city, color, time } = item;

        return (
          <Flex
            key={id}
            sx={{
              alignItems: "center",
              my: 2,
              p: 2,
              border: "1px solid",
              borderColor: color,
              borderRadius: 4,
            }}
          >
            <Button sx={{ mr: 3 }} onClick={editReminder(item)}>
              Edit
            </Button>
            <Text>
              {reminder} at {time} on {city}
            </Text>
          </Flex>
        );
      })}
    </>
  );
}

export default Reminders;
