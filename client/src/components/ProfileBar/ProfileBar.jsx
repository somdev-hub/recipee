import React from "react";
import "./ProfileBar.css";

const ProfileBar = (props) => {
  return (
    <div
      className="profile-bar h-screen fixed p-5 text-white transition-all"
      style={
        window.innerWidth < 640 && { right: props.rightbarView ? "0" : "-100%" }
      }
    >
      <h3>Recent orders</h3>
    </div>
  );
};

export default ProfileBar;
