import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="h-screen w-screen absolute flex justify-center items-center -z-10">
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
