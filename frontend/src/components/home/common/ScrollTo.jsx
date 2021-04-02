import React from "react";
import { scrollTo } from "../../base/utils";
import PropTypes from "prop-types";

const ScrollTo = ({ to, onScroll, children }) => {
  let appContainer = document.querySelector(".scrollable-content");
  if (!appContainer) appContainer = window;

  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        scrollTo(appContainer, to);
        if (onScroll) {
          e.preventDefault();
          onScroll(e);
        }
      }}
    >
      {children}
    </a>
  );
};

ScrollTo.propTypes = {
  to: PropTypes.any,
  children: PropTypes.any,
  onScroll: PropTypes.any
};

export default ScrollTo;
