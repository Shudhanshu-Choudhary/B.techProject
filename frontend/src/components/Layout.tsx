import React from "react";
import Navbar from "./Navbar";

class Layout extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
