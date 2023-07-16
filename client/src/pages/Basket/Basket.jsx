import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Basket.css";
// import { basket } from "../../utils/providers/baskets";
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkout from "../../components/Checkout/Checkout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_BASKET } from "../../utils/graphql/queries";
import Loader from "../../components/Loader/Loader";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { GET_DISHES_BY_ID } from "../../utils/graphql/mutations";

const Basket = () => {
  const {
    loading,
    error,
    data: basketData
  } = useQuery(GET_BASKET, {
    variables: {
      user: localStorage.getItem("email")
    }
  });

  // console.log(basketData?.basket[0].dish.name);

  const [checkoutBar, setCheckoutBar] = useState(false);
  const [sidebarView, setSidebarView] = useState(false);

  return (
    <div className="basket flex">
      <Sidebar sidebarView={sidebarView} />
      {loading && <Loader />}
      <div
        className={`basket-main sm:mt-5 ${
          sidebarView || checkoutBar
            ? "h-screen-dvh overflow-hidden brightness-50 transition-all"
            : ""
        } `}
      >
        <MobileNavbar
          setSidebarView={setSidebarView}
          sidebarView={sidebarView}
          setRightbarView={setCheckoutBar}
          rightbarView={checkoutBar}
        />
        {basketData?.basket.length === 0 || !basketData ? (
          <div
            className=" flex text-center justify-center text-white h-screen"
            onClick={() => {
              setSidebarView(false);
              setCheckoutBar(false);
            }}
          >
            {!loading && <h3>No data available</h3>}
          </div>
        ) : (
          <div
            className=""
            onClick={() => {
              setSidebarView(false);
              setCheckoutBar(false);
            }}
          >
            <nav className="">
              <h2 className="text-white">Your Basket</h2>
            </nav>
            <div className="basket-items-container mt-10">
              <div className="basket-items">
                {basketData?.basket.map((item, index) => {
                  console.log(item);
                  return (
                    <BasketCard
                      key={index}
                      img={item?.dish?.image}
                      title={item?.dish?.name}
                      quantity={item?.quantity}
                      price={item?.dish?.price}
                      id={item?.id}
                      // setDeleted={setDeleted}
                      // setBasketItemId={setBasketItemId}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <Checkout
        items={basketData?.basket}
        loading={loading}
        rightbarView={checkoutBar}
      />
    </div>
  );
};

export default Basket;
