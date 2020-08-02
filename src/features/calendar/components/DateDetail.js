import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "components/Modal";
import Button from "components/Button";
import { Flex, Box, Heading } from "theme-ui";
import { dateDataSelector } from "../selectors";
import { setMonth, nextDate, previousDate } from "../state";
import ReminderContainer from "../../reminders/components/ReminderContainer";

function DateDetail() {
  const dispatch = useDispatch();
  const { show, dateText, date } = useSelector(dateDataSelector);

  const closeClick = () => dispatch(setMonth(date));
  const previousDayClick = () => dispatch(previousDate(date));
  const nextDayClick = () => dispatch(nextDate(date));

  return (
    <Modal show={show}>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Flex sx={{ alignItems: "center" }}>
          <Button onClick={previousDayClick}>{"<"}</Button>
          <Heading as="h2" sx={{ width: "300px", textAlign: "center", mx: 4 }}>
            {dateText}
          </Heading>
          <Button onClick={nextDayClick}>{">"}</Button>
        </Flex>

        <Button sx={{ bg: "orange" }} onClick={closeClick}>
          X
        </Button>
      </Flex>
      <Box mt={3}>
        <ReminderContainer date={date} />
      </Box>
    </Modal>
  );
}

export default DateDetail;
