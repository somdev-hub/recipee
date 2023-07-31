import React from "react";
import "./Checkout.css";
// import Draggable from "react-draggable";
import { RxCross2 } from "react-icons/rx";

const Checkout = ({
  items,
  loading,
  rightbarView,
  setRightbarView,
  checkout,
  paymentLoading
}) => {
  const itemsCost = items?.reduce(
    (prev, next) => prev + next.quantity * next?.dish?.price,
    0
  );
  const gst = itemsCost * 0.05;
  return (
    <div
      className="checkout flex flex-col fixed h-screen-dvh transition-all"
      style={
        window.innerWidth <= 768
          ? { right: rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
      <div className="flex items-center text-white mt-5 ml-5 gap-3">
        {window.innerWidth < 640 && (
          <RxCross2
            className="text-2xl"
            onClick={() => setRightbarView(false)}
          />
        )}
        <h3 className="">Checkout</h3>
      </div>
      <div className="flex flex-col justify-between md:h-full">
        <div className="total-container mt-10 flex flex-col items-center">
          <div className="total-cost  flex items-center ">
            <div className="total-col flex justify-between w-full mx-10">
              <p className="text-white">Items</p>
              <p className="text-white">Cost</p>
            </div>
          </div>
          {loading ? (
            <p className="text-white mt-5">Loading...</p>
          ) : (
            <>
              <div className="total-orders mt-5 pb-5">
                {items?.map((item, index) => {
                  return (
                    <div className="flex justify-between mb-5" key={index}>
                      <p className="text-white">
                        {index + 1}. {item?.dish?.name}
                      </p>
                      <p className="text-white">
                        {item?.quantity} x Rs. {item?.dish?.price}/-
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="calculate-sum mt-5 flex justify-between">
                <p className="text-white">Sum total: </p>
                <p className="text-white">{`Rs. ${itemsCost}/-`}</p>
              </div>
              <div className="calculate-sum mt-5 flex justify-between">
                <p className="text-white">SGST: </p>
                <p className="text-white">{`Rs. ${gst / 2}/-`}</p>
              </div>
              <div className="calculate-sum mt-5 flex justify-between">
                <p className="text-white">CGST: </p>
                <p className="text-white">{`Rs. ${gst / 2}/-`}</p>
              </div>
              <div className="total-cost  flex items-center mt-5">
                <div className="total-col flex justify-between w-full mx-10">
                  <p className="text-white">Total</p>
                  <p className="text-white">{`Rs. ${itemsCost + gst}/-`}</p>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <Draggable axis="y" bounds={{ top: -200, bottom: 0 }}> */}
        <div className="payment mt-10 flex flex-col items-center overflow-y-auto no-scrollbar h-2/6 relative ">
          <div className="bar bg-white mt-3"></div>
          <div className="w-full flex justify-center">
            <button className="pay-button border-none" onClick={checkout}>
              {paymentLoading ? <span className="loader"></span> : "Pay Now"}
            </button>
          </div>
          <div className="more-options mt-5 w-full">
            <h3 className="text-left text-white ml-5">More options</h3>
            <div className="button-container flex flex-col items-center mt-5">
              <button className="mb-5">PhonePe</button>
              <button className="mb-5">Paytm</button>
              <button className="mb-5">GooglePay</button>
            </div>
          </div>
        </div>
        {/* </Draggable> */}
      </div>
    </div>
  );
};

export default Checkout;
