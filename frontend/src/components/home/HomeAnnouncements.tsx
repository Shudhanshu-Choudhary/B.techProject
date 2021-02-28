import React from "react";
import EditCardPostView from "../base/EditCardPostView";

const HomeAnnouncements = ()=>{
  return(
    <div className='home-announcement-main-container'>
      <div className="home-announcement-header">
        <span>ANNOUNCEMENTS</span>
      </div>
      <div className='home-announcement-container'>
        <EditCardPostView primaryHeader='Announcement' secondaryheader='17-11-20' description='NOTICE: Online and Offline classes will remain suspended from 14/11/20 to 16/11/20 on account of Diwali. Principal Maulana Azad Girls School'/>
        <EditCardPostView primaryHeader='Quote of the Day' secondaryheader='13-11-20' description='If you want to shine like a sun, first burn like a sun. -APJ Abdul Kalam'/>
        <EditCardPostView primaryHeader='Test Title' secondaryheader='31-11-20' description='Test Description'/>
        <EditCardPostView primaryHeader='Thought For the Day' secondaryheader='17-11-20' description='If i cannot do great things. I can do small things in a great way. - Martin Luther King Jr.'/>
      </div>
    </div>
  );
};
export default HomeAnnouncements;
