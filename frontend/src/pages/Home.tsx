import React from "react";
import Intro6 from "../components/home/Intro6";
import Marketing1 from "../components/home/Marketing1";
import Services8 from "../components/home/Services8";
import TopBar6 from "../components/home/TopBar6";
import Testimonial6 from "../components/home/Testimonial6";
import Pricing2 from "../components/home/Pricing2";
import Blog1 from "../components/home/Blog1";
import Subscription1 from "../components/home/Subscription1";
import Footer2 from "../components/home/Footer2";

const Home = ()=>{
  return(
    <div className="landing">
      <TopBar6 />
      <Intro6 />
      <Services8 />
      <Marketing1 />
      <Testimonial6 />
      <Pricing2 />
      <Blog1 />
      <Subscription1 />
      <Footer2 />
    </div>
  );
};
export default Home;
