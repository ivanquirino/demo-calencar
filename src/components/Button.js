import React from "react";
import { Button } from "theme-ui";

const style = {
  cursor: "pointer",
  "&:hover": { bg: "secondary" },
  "&:active": { bg: "text" },
};

export default (props) => <Button {...props} sx={style} />;
