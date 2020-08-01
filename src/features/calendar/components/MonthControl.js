import React from "react";
import { useDispatch } from "react-redux";
import { Heading, Flex, Box } from "theme-ui";
import { nextMonth, previousMonth, setMonthFromDate } from "../state";
import Button from "components/Button";

function MonthControl({ children }) {
  const dispatch = useDispatch();

  const nextClick = () => dispatch(nextMonth());
  const previousClick = () => dispatch(previousMonth());
  const currentClick = () => dispatch(setMonthFromDate(new Date()));

  return (
    <Box my={4}>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Button onClick={previousClick}>{"<"}</Button>
          <Heading as="h2" mx={4}>
            {children}
          </Heading>
          <Button onClick={nextClick}>{">"}</Button>
        </Flex>
        <Button onClick={currentClick}>Current Month</Button>
      </Flex>
    </Box>
  );
}

export default MonthControl;
