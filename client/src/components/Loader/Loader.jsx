import React from "react";
import "./Loader.css";

const Loader = (props) => {
  return (
    <div
      className={`h-screen w-screen ${
        props.position === "no-pos" ? "static" : "absolute"
      } flex justify-center items-center -z-10`}
    >
      <div class="lds-ring ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
