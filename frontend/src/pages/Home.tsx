import React, { useEffect } from "react";
import { scrollTo } from "../components/base/utils";
import Intro6 from "../components/home/Intro6";
import Services8 from "../components/home/Services8";
import TopBar6 from "../components/home/TopBar6";
import Testimonial6 from "../components/home/Testimonial6";
import Pricing2 from "../components/home/Pricing2";
import Subscription1 from "../components/home/Subscription1";
import Footer2 from "../components/home/Footer2";

const Home = ()=>{
  useEffect(() => {
    const api = process.env.REACT_APP_API_ENDPOINT;
    console.log(api);
    scrollTo("root");
  });
  return(
    <div className="landing">
      <TopBar6 />
      <Intro6 />
      <Services8 />
      <Testimonial6 />
      <Pricing2 />
      <Subscription1 />
      <Footer2 />
    </div>
  );
};
export default Home;
