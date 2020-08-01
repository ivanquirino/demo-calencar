import React from "react";
import { useSelector } from "react-redux";
import { Flex, Text } from "theme-ui";
import Button from "components/Button";
import { dateRemindersSelector } from "../selectors";

function Reminders({ date }) {
  const reminders = useSelector((state) => dateRemindersSelector(state, date));

  return (
    <>
      <Text mb={3}>Reminders for the day:</Text>
      {reminders.map((item) => {
        const { id, reminder, city, color, hour, minute } = item;

        return (
          <Flex
            key={id}
            sx={{
              alignItems: "center",
              my: 2,
              p: 2,
              border: "2px solid",
              borderColor: color,
              borderRadius: 4,
            }}
          >
            <Button sx={{ mr: 3 }}>Edit</Button>
            <Text>
              {reminder} at {hour}:{minute} on {city}
            </Text>
          </Flex>
        );
      })}
    </>
  );
}

export default Reminders;
