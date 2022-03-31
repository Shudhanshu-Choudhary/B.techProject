import React, { useState, useEffect } from "react";
import { debounce, classList } from "../base/utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import ScrollTo from "../home/common/ScrollTo";
import { Button } from "@material-ui/core";

// eslint-disable-next-line no-unused-vars
const TopBar6 = (props) => {

  const isUserLogged = props.isUserLogged;
  const [isTop, setIsTop] = useState(true);
  const [isClosed, setIsClosed] = useState(true);

  let scrollableElement = document.querySelector(".scrollable-content");
  if (!scrollableElement) scrollableElement = window;

  let handleScrollRef = null;
  let toggleIcon = isClosed ? "menu" : "close";

  const handleScroll = () => {
    return debounce(({ target: { scrollTop } }) => {
      let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
      setIsTop(isCurrentTop);
    }, 20);
  };

  handleScrollRef = handleScroll();

  const close = () => {
    setIsClosed(false);
  };

  useEffect(() => {
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScrollRef);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScrollRef);
      }
    };
  }, [scrollableElement, handleScrollRef]);

  return (
    <section
      className={classList({
        header: true,
        "header-fixed": !isTop,
        closed: isClosed,
      })}
    >
      <div className="container header-container">
        <div className="brand" >
          <img src="../../assets/img/react-logo.svg" alt=""
            style={{ width: "8rem",height: "3rem" }}/>
        </div>
        <ul className="navigation">
          <li>
            <ScrollTo to="intro6" onScroll={close}>
              Home
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="services8" onScroll={close}>
              Features
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="testimonial6" onScroll={close}>
              Review
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="pricing2" onScroll={close}>
              Pricing
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="subscription1" onScroll={close}>
              Subscribe
            </ScrollTo>
          </li>
        </ul>
        <div className="m-auto" />
        {!isUserLogged ? (
           <div className="navigation flex">
              <NavLink to="/login" className="mr-1">
                <Button
                  className="box-shadow-none px-8 rounded-l hover-bg-primary capitalize"
                  variant="outlined"
                  color="primary"
                >
                  Login
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button
                  className="box-shadow-none px-8 rounded-r hover-bg-primary capitalize"
                  variant="outlined"
                  color="primary"
                >
                  Signup
                </Button>
              </NavLink>
            </div>
        ): (
          <div className="navigation flex">
            <NavLink to="/dashboard" className="mr-1">
              <Button
                className="box-shadow-none px-8 rounded-l hover-bg-primary capitalize"
                variant="outlined"
                color="primary"
              >
                Dashboard
              </Button>
          </NavLink>
          <NavLink to="/account">
              <Button
                className="box-shadow-none px-8 rounded-r hover-bg-primary capitalize"
                variant="outlined"
                color="primary"
              >
                Account
              </Button>
          </NavLink>
        </div>
        )}

        <IconButton
          className="header__toggle"
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        >
          <Icon>{toggleIcon}</Icon>
        </IconButton>
      </div>
    </section>
  );
};

export default TopBar6;
