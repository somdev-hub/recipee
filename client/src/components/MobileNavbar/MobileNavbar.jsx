import React from "react";
import logo from "../../utils/recipee_logo-cropped.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgOptions } from "react-icons/cg";
import { Link } from "react-router-dom";

const MobileNavbar = (props) => {
  return (
    <div className="navbar flex justify-between mb-7 items-start">
      <GiHamburgerMenu
        className="text-lg text-white"
        onClick={() => {
          !props.rightbarView && props.setSidebarView(!props.sidebarView);
        }}
      />
      <div className="navbar-logo w-20">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      {props.rightbarView != null ? (
        <CgOptions
          className="text-lg text-white"
          onClick={() => {
            !props.sidebarView && props.setRightbarView(!props.rightbarView);
          }}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MobileNavbar;
