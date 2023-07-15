import React from "react";
import { MdDelete } from "react-icons/md";
import "./BasketCard.css";
import { useMutation, gql } from "@apollo/client";
import { DELETE_ITEM } from "../../utils/graphql/mutations";

const BasketCard = (props) => {
  const [deleteBasketItem] = useMutation(DELETE_ITEM, {
    variables: { deleteBasketItemId: props.id },
    onCompleted: (data) => {
      if (data.deleteBasketItem.code === 200) alert("Item Deleted");
      console.log(data);
    }
  });
  return (
    <div className="basketcard flex flex-1 items-center mb-5 px-2">
      <div className="item-img-container flex items-center justify-center sm:mr-0 mr-3">
        <div className="item-img sm:mr-5 flex items-center justify-center">
          <img src={props.img} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="item-contents item-start flex justify-between sm:flex-row flex-col">
        <div className="item-title flex flex-col justify-center">
          <h3 className="text-white mb-3 text-lg">{props.title}</h3>
          <div className="item-price flex">
            <p className="mr-5">Quantity : {props.quantity}</p>
            <p>Price : Rs. {props.price}/-</p>
          </div>
        </div>
        <div className="item-end">
          <div
            className="item-delete flex items-center sm:mb-3 cursor-pointer"
            onClick={async () => {
              await deleteBasketItem();
              window.location.reload(false);
            }}
          >
            <p className="mr-2">Delete</p>
            <MdDelete className="text-lg" />
          </div>
          <div className="total-price">
            <p>Total : Rs. {props.quantity * props.price}/-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
