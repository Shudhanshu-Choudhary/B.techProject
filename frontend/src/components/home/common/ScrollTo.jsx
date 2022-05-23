import React from "react";
import { scrollTo } from "../../base/utils";
import PropTypes from "prop-types";

const ScrollTo = ({ to, onScroll, children }) => {
 
  let appContainer = document.querySelector(".scrollable-content");
  if (!appContainer) appContainer = window;
  console.log(`${to} , ${children}`);
 
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        scrollTo(appContainer, to);
        if (onScroll) {<div className="container">
        <div className="google-login-btn-container mt-5">
            {
                status === "unauthenticated" ? (
                    <div className="google-sign-in-btn text-center">
                        <Link href='/api/auth/signin'>
                            <Button
                                onClick={e => {
                                    e.preventDefault()
                                    signIn("google")
                                }}
                            >
                                Sign In with Google
                            </Button>
                        </Link>
                   </div>
                ) : (
                    <div className="google-signout-btn-container text-center">
                        <Link href='/api/auth/signout'>
                            <Button
                                onClick={e => {
                                    e.preventDefault()
                                    signOut("google")
                                }}
                            >
                                Sign out with Google    
                            </Button>
                        </Link>
                    </div>
                )
            }
             
        </div>
        <div className="col d-flex justify-content-center mt-5">
            {
               user ? (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= {user.image} />
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                {user.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : {}
            }
        </div>
    </div>
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
