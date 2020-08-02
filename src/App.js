import React from "react";
import { Container, Box, Heading } from "theme-ui";
import CalendarContainer from "features/calendar/components/CalendarContainer";
import DateDetail from "./features/calendar/components/DateDetail";

function App() {
  return (
    <>
      <Container>
        <Box mt={4}>
          <Heading as="h1" sx={{ textAlign: "center" }}>
            Demo Calendar App
          </Heading>
        </Box>
        <Box mt={4} mb={4}>
          <CalendarContainer />
        </Box>
      </Container>
      <DateDetail />
    </>
  );
}

export default App;
