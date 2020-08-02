import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Text } from "theme-ui";
import Button from "components/Button";
import { dateRemindersSelector } from "../selectors";
import { deleteAll } from "../state";

function Reminders({ date, setValues }) {
  const reminders = useSelector((state) => dateRemindersSelector(state, date));
  const dispatch = useDispatch();

  const editReminder = (values) => () => setValues(values);
  const deleteAllReminders = () => dispatch(deleteAll(date));

  return (
    <>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text mb={3}>Reminders for the day:</Text>
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
            <Button sx={{ bg: "red" }}>Delete</Button>
          </Flex>
        );
      })}
    </>
  );
}

export default Reminders;
