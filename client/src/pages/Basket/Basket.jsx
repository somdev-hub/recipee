import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Basket.css";
import { basket } from "../../utils/providers/baskets";
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkout from "../../components/Checkout/Checkout";
import { useQuery, gql, useMutation } from "@apollo/client";
// import { set } from "mongoose";

const GET_BASKET = gql`
  query dishes {
    basket {
      id
      basketItem {
        name
        price
        image
        description
        category
        weight
        likes
      }
      quantity
    }
  }
`;

const DELETE_ITEM = gql`
  mutation Mutation($deleteBasketItemId: ID!) {
    deleteBasketItem(id: $deleteBasketItemId) {
      code
      success
      message
      basket {
        basketItem {
          name
          price
          image
          description
          category
          weight
          likes
        }
        quantity
      }
    }
  }
`;

const Basket = () => {
  const { loading, error, data } = useQuery(GET_BASKET);
  // const [deleted, setDeleted] = useState(false);
  // const [basketItemId, setBasketItemId] = useState("");
  // const [basketData, setBasketData] = useState([]);
  // const [deleteBasketItem] = useMutation(DELETE_ITEM, {
  //   variables: { deleteBasketItemId: basketItemId },
  //   onCompleted: (data) => {
  //     console.log(data);
  //   }
  // });

  // useEffect(() => {
  //   if (deleted) {
  //     deleteBasketItem();
  //   }
  //   if (data) {
  //     setBasketData(data.basket);
  //   }
  //   setDeleted(false);
  // }, []);

  // console.log("====================================");
  // console.log(data?.basket);
  // console.log("====================================");
  return (
    <div className="basket flex">
      <Sidebar />
      <div className="basket-main mt-5">
        <nav className="">
          <h2 className="text-white">Your Basket</h2>
        </nav>
        <div className="basket-items-container mt-10">
          <div className="basket-items">
            {data?.basket.map((item, index) => {
              return (
                <BasketCard
                  key={index}
                  img={item.basketItem.image}
                  title={item.basketItem.name}
                  quantity={item.quantity}
                  price={item.basketItem.price}
                  id={item.id}
                  // setDeleted={setDeleted}
                  // setBasketItemId={setBasketItemId}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Checkout items={data?.basket}/>
    </div>
  );
};

export default Basket;
