import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "components/Modal";
import Button from "components/Button";
import { Flex, Box, Heading } from "theme-ui";
import { dateDataSelector } from "../selectors";
import { setMonth } from "../state";

function DateDetail() {
  const dispatch = useDispatch();
  const { show, dateText, date } = useSelector(dateDataSelector);

  const closeClick = () => dispatch(setMonth(date));

  return (
    <Modal show={show}>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Heading as="h2">{dateText}</Heading>
        <Button sx={{ bg: "orange" }} onClick={closeClick}>
          X
        </Button>
      </Flex>
    </Modal>
  );
}

export default DateDetail;
