import React from "react";
import { Button, Divider, Dropdown, Form, Grid, Input, Segment } from "semantic-ui-react";
import imgA from "../assets/images/suv2.jpeg";
import Logger from "../lib/logger";
import { toast } from "react-toastify";
import BookingBackendApiService from "../services/bookingBackendApi.service";
import { withRouter, RouteProps } from "react-router-dom";
import Layout from "./Layout";
import StorageService from "../services/storageService";

const carOptions = [
  {
    key: "suv",
    text: "SUV",
    value: "suv"
  },{
    key: "sedan",
    text: "Sedan",
    value: "sedan"
  },{
    key: "van",
    text: "Van",
    value: "van"
  }
];

class BookingCar extends React.Component<any & RouteProps, any>{
state = {
  carType: ""
}
  changeHandler = (e: any): void => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.carType) {
      this.setState({
        carType: this.props.location.state.carType
      }) ;
    }
  }

  renderInputFields = () => {
    const inputs: any = [];
    const inputData = [
      { name: "pickupLocation", placeHolder: "PickUp Location" },
      { name: "pickupTime", placeHolder: "PickUp Time" },
      { name: "dropOffLocation", placeHolder: "Dropoff Location" },
      { name: "numberOfPassengers", placeHolder: "Number of passengers" },
      { name: "luggageCount", placeHolder: "Luggage Count" },
    ];
    // {
    //   "pickupLocation": "sagarpur",
    //     "dropOffLocation": "nawadad",
    //     "numberOfPassengers": 4,
    //     "luggageCount": 10,
    //     "carType": "suv"
    // }
    inputData.forEach((data) => {
      inputs.push(
        <Input
          name={data.name}
          onChange={this.changeHandler}
          style={{ width: "100%", margin: "1rem 0" }}
          label={{ icon: "asterisk" }}
          labelPosition='right corner'
          placeholder={data.placeHolder}
        />
      );
    });
    return inputs;
  }

  bookingHandler = async () => {
    try {
      let bookingObject = Object.assign(this.state, { userId: StorageService.getValueFromKey("userId") });
      const res = await BookingBackendApiService.addBooking(bookingObject);
      if(res.status === 200) {
        toast.success("Booking successful.");
        this.props.history.push("/bookings");
      } else {
        toast.error(res.data);
      }
    } catch (e) {
      Logger.logError(e);
      toast.error("Some error occurred");
    }

  }

  carTypeChangeHandler = (e: any) => {
    this.setState({
      carType: e.currentTarget.textContent.toLowerCase()
    });
  }

  render(){
    Logger.log(this.props.location);
    return(
      <Layout>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                {this.renderInputFields()}
                <Dropdown
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => this.carTypeChangeHandler(e)}
                  placeholder='Select Car Type'
                  fluid
                  selection
                  defaultValue={this.props.location.state && this.props.location.state.carType}
                  options={carOptions}
                />
                <Button content='Book Now' primary onClick={this.bookingHandler}/>
              </Form>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <img src={imgA} className="visible content"/>
            </Grid.Column>
          </Grid>

          <Divider vertical>
          </Divider>
        </Segment>
      </Layout>
    );
  }
}
export default withRouter(BookingCar);
