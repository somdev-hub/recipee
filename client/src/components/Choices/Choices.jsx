import React from "react";
import "./Choices.css";

const CuisineItems = ({ items }) => {
  return (
    <div className="item flex flex-col justify-center items-center">
      <div className="choice-item-img">
        <img src={items.image} alt="" className="h-full w-full rounded-full" />
      </div>
      <div className="flex flex-col items-center cuis-item mt-3">
        <h3 className="text-sm mb-1">{items.name}</h3>
        <p className="text-sm">Rs.{items.price}/-</p>
      </div>
    </div>
  );
};

const Choices = (props) => {
  const [mouseOver, setMouseOver] = React.useState(false);
  return (
    <div
      className="choice flex flex-col sm:flex-row items-center sm:mr-5"
      onClick={props.click}
    >
      <div className="main flex flex-col justify-center items-center sm:pl-2 pt-2 sm:pt-0">
        <div className="category-image relative flex justify-center h-full w-full">
          <h2
            className="absolute text-white text-3xl text-center font-semibold z-10 bottom-10 transition-all duration-500"
            style={{
              transform: mouseOver ? "translateY(-20px)" : "translateY(0)",
              opacity: mouseOver ? "1" : "0"
            }}
          >
            {props.item.name}
          </h2>
          <img
            src={props.item.image}
            alt=""
            className={`h-full w-full object-cover transition-all ${
              mouseOver && "brightness-50"
            }`}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
          />
        </div>
        {/* <h3 className="text-xl text-center mt-3">{props.item.name}</h3> */}
      </div>
      <div className="cuisine-content grid grid-cols-3 grid-rows-2  gap-y-5 sm:m-auto py-5">
        {props.item.dishes.map((items, index) => {
          return <CuisineItems items={items} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Choices;
