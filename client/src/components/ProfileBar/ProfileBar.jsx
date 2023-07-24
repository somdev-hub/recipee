import React from "react";
import "./ProfileBar.css";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { GET_ORDERS } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import Loader2 from "../Loader2/Loader2";

const orderItem = {
  date: "12/12/2021",
  items: [
    {
      img: "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
      name: "Veg cheese burger",
      plates: 2,
      price: 200
    },
    {
      img: "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
      name: "Veg cheese burger",
      plates: 2,
      price: 200
    },
    {
      img: "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
      name: "Veg cheese burger",
      plates: 2,
      price: 200
    },
    {
      img: "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
      name: "Veg cheese burger",
      plates: 2,
      price: 200
    }
  ]
};

const OrderCard = (props) => {
  return (
    <div className="order-card w-full mb-5">
      <div className="order-card-main p-5">
        <div className="order-date border-b-2 border-b-slate-300 pb-3">
          <p className="text-sm">Dt: {props.date}</p>
        </div>
        <div className="order-items mt-5">
          {props.items.map((item, index) => {
            return (
              <div
                className="order-item border-b-2 border-b-slate-400 flex gap-5 mb-5 pb-3"
                key={index}
              >
                <div className="order-dish-img">
                  <img
                    src={item?.dish?.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="order-dish-content w-1/2">
                  <h3 className=" font-semibold">{item?.dish?.name}</h3>
                  <div className="order-meta-data flex justify-between my-2 text-sm">
                    <p>{item?.quantity} plates</p>
                    <p>Rs. {item?.dish?.price}/-</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="order-invoice flex justify-center">
          <a href={props.invoice} download="invoice.pdf">
            <button className="flex gap-1  items-center">
              <PiDownloadSimpleBold className="text-lg mr-2" />
              Download Invoice
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProfileBar = (props) => {
  const {
    error: orderErr,
    loading: orderLoading,
    data: orderData
  } = useQuery(GET_ORDERS, {
    variables: {
      user: localStorage.getItem("email")
    }
  });

  console.log(orderData?.getOrders.orders[0].basketItems[0].dish);

  return (
    <div
      className="profile-bar h-screen fixed p-5 text-white transition-all"
      style={
        window.innerWidth < 640
          ? { right: props.rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
      <div className="flex gap-3">
        {window.innerWidth < 640 && (
          <RxCross2
            className="text-2xl"
            onClick={() => props.setRightbarView(false)}
          />
        )}
        <h3>Recent orders</h3>
      </div>
      {orderLoading && <Loader2 />}
      <div className="profile-bar-main mt-5">
        {orderData?.getOrders.orders.map((order, index) => {
          return (
            <OrderCard
              date={order.date}
              invoice={order.invoice}
              items={order.basketItems}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileBar;
