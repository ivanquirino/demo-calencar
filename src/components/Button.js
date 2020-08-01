import React from "react";
import { Button } from "theme-ui";

const style = {
  cursor: "pointer",
  "&:hover": { bg: "secondary" },
  "&:active": { bg: "text" },
  "&:disabled": { bg: "gray", cursor: "auto" },
};

export default ({ sx, children, ...props }) => (
  <Button {...props} sx={{ ...style, ...sx }}>
    {children}
  </Button>
);
