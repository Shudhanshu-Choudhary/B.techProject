import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import StorageService from "../services/storageService";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

interface IState {
    [key: string]: any; // or the type of your input
}

class Navbar extends Component<any, IState> {
    state = {
      activeItem: null
    }

    handleItemClick = (e: any, { name }: {name: string}) => {
      this.setState({ activeItem: name });
      if(name === "home") {
        this.props.history.push("/");
      } else if(name === "addBooking") {
        this.props.history.push("/book");
      } else if(name === "bookings") {
        this.props.history.push("/bookings");
      } else if(name === "logout") {
        StorageService.clearStorage();
        toast.success("Logout successful.");
        this.props.history.push("/login");
      }
    }

    render() {
      const { activeItem } = this.state;

      return (
        <div style={{ marginBottom: "3rem" }}>
          <Menu>
            <Menu.Item
              name='home'
              active={activeItem === "home"}
              onClick={(e) => this.handleItemClick(e, { name: "home" })}
            >
                    Home
            </Menu.Item>

            <Menu.Item
              name='addBooking'
              active={activeItem === "addBooking"}
              onClick={(e) => this.handleItemClick(e, { name: "addBooking" })}
            >
                    Add Booking
            </Menu.Item>

            <Menu.Item
              name='bookings'
              active={activeItem === "bookings"}
              onClick={(e) => this.handleItemClick(e, { name: "bookings" })}
            >
                    View Bookings
            </Menu.Item>

            <Menu.Item
              name='logout'
              active={activeItem === "upcomingEvents"}
              onClick={(e) => this.handleItemClick(e, { name: "logout" })}
            >
                    Logout
            </Menu.Item>
          </Menu>
        </div>
      );
    }
}

export default withRouter(Navbar);
