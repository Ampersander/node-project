import React from "react";
import ProfileSide from "../components/ProfileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <ProfileSide />
      <RightSide />
    </div>
  );
};

export default Home;
