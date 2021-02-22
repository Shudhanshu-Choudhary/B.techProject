import React from "react";
import "../assets/scss/login.scss";
import "semantic-ui-css/semantic.min.css";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";
import BookingBackendApiService from "../services/bookingBackendApi.service";
import Layout from "./Layout";
import StorageService from "../services/storageService";
import Logger from "../lib/logger";

interface IState {
    bookings: Array<any>,
    [key: string]: any; // or the type of your input
}

class BookingsList extends React.Component<any,IState>{
  constructor(props: any) {
    super(props);
    this.state = {
      bookings: [],
      loading: true
    };
  }
  async componentDidMount() {
    const res = await BookingBackendApiService.getAllBookings();
    Logger.log(res);
    this.setState({
      bookings: res.data,
      loading: false
    });
  }

    renderTableRows = () => {
      const rows:any = [];
      const userId = StorageService.getValueFromKey("userId");
      this.state.bookings.forEach((booking: any) => {
        if(booking.userId === userId) {
          rows.push(
            <Table.Row>
              <Table.Cell>{booking.carType}</Table.Cell>
              <Table.Cell>{booking.pickupLocation || "City Square, Washington"}</Table.Cell>
              <Table.Cell>{booking.pickupTime}</Table.Cell>
              <Table.Cell>{booking.dropOffLocation || "43 Walton Street"}</Table.Cell>
              <Table.Cell>{booking.numberOfPassengers || 4}</Table.Cell>
              <Table.Cell>{booking.luggageCount || 12}</Table.Cell>
            </Table.Row>
          );
        }
      });
      return rows;
    }

    render() {
      return(
        <Layout>
          <div>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>CarType</Table.HeaderCell>
                  <Table.HeaderCell>PickUpLocation</Table.HeaderCell>
                  <Table.HeaderCell>PickUpTime</Table.HeaderCell>
                  <Table.HeaderCell>DropOffLocation</Table.HeaderCell>
                  <Table.HeaderCell>Passengers</Table.HeaderCell>
                  <Table.HeaderCell>Luggage</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              {this.state.loading ? <span>Loading..</span> :
                <Table.Body>
                  {this.renderTableRows()}
                </Table.Body>
              }
            </Table>
          </div>
        </Layout>
      );
    }
}

export default withRouter(BookingsList);
