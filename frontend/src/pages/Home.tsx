import React from 'react';
import "../assets/scss/pages/home.scss";
import HomeAnnouncements from "../components/home/HomeAnnouncements";
import HomeCards from "../components/home/HomeCards";
import HomeContent from "../components/home/HomeContent";
import Layout from "../components/base/Layout";

const Home = ()=>{
    return(
        <Layout header='DashBoard'>
            <div className='home-main-container'>
                <HomeCards/>
                <HomeContent/>
                <HomeAnnouncements/>
            </div>
        </Layout>
    )
};
export default Home;
