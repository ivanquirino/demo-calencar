import React from "react";
import { Container } from "theme-ui";
import styled from "@emotion/styled";

const Background = styled.div({
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.4)",
  top: 0,
  left: 0,
  display: "flex",
  width: "100%",
  height: "100%",
  zIndex: 999,
});

function Modal(props) {
  const { show, children } = props;

  return show ? (
    <Background>
      <Container sx={{ bg: "white", my: "auto", borderRadius: "4px", p: 4 }}>
        {children}
      </Container>
    </Background>
  ) : null;
}

export default Modal;
