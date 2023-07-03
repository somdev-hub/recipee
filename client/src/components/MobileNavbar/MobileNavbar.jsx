import React from "react";
import logo from "../../utils/recipee_logo-cropped.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgOptions } from "react-icons/cg";

const MobileNavbar = (props) => {
  return (
    <div className="navbar flex justify-between mb-7 items-start">
      <GiHamburgerMenu
        className="text-lg text-white"
        onClick={() => props.setSidebarView(!props.sidebarView)}
      />
      <div className="navbar-logo w-20">
        <img src={logo} alt="" />
      </div>
      <CgOptions
        className="text-lg text-white"
        onClick={() => props.setRightbarView(!props.rightbarView)}
      />
    </div>
  );
};

export default MobileNavbar;
