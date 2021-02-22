import React from "react";
import suv1 from "../assets/images/suv2.jpeg";
import suv2 from "../assets/images/suv1.jpg";
import sedan1 from "../assets/images/sedan.jpeg";
import sedan2 from "../assets/images/sedan2.jpg";
import hatchback from "../assets/images/hatchback.jpg";
import hatchback2 from "../assets/images/hatchback2.jpg";
import { NavLink } from "react-router-dom";
import "../assets/scss/homePage.scss";
import { ECarType } from "../assets/constants";
import Layout from "./Layout";

class CarCard extends React.Component{

    renderCarChoices = () => {
      const carChoices: Array<any> = [];
      const carData = [
        { name: "Luxury Sedan", type: ECarType.SEDAN, feature: "Comfortable Seating", link: "/book", imgs: [sedan1, sedan2] },
        { name: "SUV's", type: ECarType.SUV, feature: "Comfortable Seating", link: "/book",  imgs: [suv1, suv2] },
        { name: "Sprinter Vans", type: ECarType.VAN, feature: "Comfortable Seating", link: "/book",  imgs: [hatchback, hatchback2] }
      ];
      carData.forEach((data) => {
        carChoices.push(
          <div className="ui car-card card">
            <div className="ui slide masked reveal image">
              <img src={data.imgs[0]} className="visible content"/>
              <img src={data.imgs[1]} className="hidden content"/>
            </div>
            <div className="content">
              <a className="header">{data.name}</a>
              <div className="meta">
                <span className="date">{data.feature}</span>
              </div>
            </div>
            <div className="extra content">
              <div className='pc-button-container'>
                <NavLink to={{ pathname: data.link, state: { carType: data.type } }} className='pc-button-buy'>
                  <span>Book Now</span>
                </NavLink>
              </div>
            </div>
          </div>
        );
      });
      return carChoices;
    }

    render() {
      return (
        <Layout>
          <div className='homepage-container'>
            <div className='homepage-container-cars'>
              {this.renderCarChoices()}
            </div>
          </div>
        </Layout>
      );
    }
}
export default CarCard;

