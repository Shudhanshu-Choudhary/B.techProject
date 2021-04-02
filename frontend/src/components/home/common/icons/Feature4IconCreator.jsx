import React from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    position: "relative",
    display: "inline-block",
    "&::before": {
      content: "\" \"",
      position: "absolute",
      height: "78px",
      width: "38px",
      borderRadius: "300px",
      transform: "rotate(45deg)",
      top: "calc(50% - 42px)",
      left: 6,
      background: lighten(theme.palette.primary.light, 0.85),
      zIndex: -2,
    },
    "&::after": {
      content: "\" \"",
      position: "absolute",
      height: "78px",
      width: "38px",
      top: "calc(50% - 42px)",
      left: 20,
      borderRadius: "300px",
      transform: "rotate(45deg)",
      background: lighten(theme.palette.primary.light, 0.55),
      zIndex: -1,
    },
  },
}));

// eslint-disable-next-line react/prop-types
const Feature4IconCreator = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.iconWrapper}>{children}</div>;
};
useStyles.propTypes = {
  children: PropTypes.any
};
export default Feature4IconCreator;
