import React from "react";
import "./PlacedOrderCard.css";
import { GET_PROFILE_ADDRESS } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";

const PlacedOrderCard = ({ props }) => {
  const { loading, error, data } = useQuery(GET_PROFILE_ADDRESS, {
    variables: {
      email: props?.customerEmail
    }
  });
  return (
    <div className="placed-order-card p-5 sm:mb-0 mb-5">
      <div className="placed-order-card-main">
        <div className="placed-order-head flex gap-5 items-center">
          <div className="customer-profile-pic w-12 h-12 rounded-full">
            <img
              src={data?.getProfile.image}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="customer-profile">
            <h3>
              {data?.getProfile.firstName} {data?.getProfile.lastName}
            </h3>
            <p className="text-sm">{props?.customerEmail}</p>
          </div>
        </div>
        <div className="placed-order-details flex justify-between mt-5 text-sm">
          <p>
            Order-Id:
            <span>{props?.orderId}</span>
          </p>
          <p>
            Date:
            <span>{props.orderDate}</span>
          </p>
        </div>
        <div className="placed-order-address mt-5">
          <div className="placed-order-heading border-b-2 pb-3 border-b-slate-400">
            <h4 className="font-medium">Address</h4>
          </div>
          <p className="mt-3 text-sm">
            {data?.getProfile.address}, {data?.getProfile.city}, pin:{" "}
            {data?.getProfile.pin}
          </p>
        </div>
        <div className="placed-order-list mt-5">
          <div className="placed-order-heading border-b-2 pb-3 border-b-slate-400">
            <h4 className="font-medium">Orders</h4>
          </div>
          <div className="placed-order-list-items mt-3">
            {props.orderItems.map((item, index) => {
              return (
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex gap-3">
                    <p>{index + 1}.</p>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.quantity} plates</p>
                </div>
              );
            })}
          </div>
          <div className="resolve-buttons flex justify-end gap-5 mt-5 text-sm">
            <button className="">Cancel</button>
            <button className="">Resolved</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacedOrderCard;
