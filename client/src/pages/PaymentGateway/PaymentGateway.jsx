import React, { useState } from "react";
import "./PaymentGateway.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { GET_BASKET, GET_SECRET_KEY } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import Loader2 from "../../components/Loader2/Loader2";
import { loadStripe } from "@stripe/stripe-js";
// import { cardElement } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import Loader from "../../components/Loader/Loader";

const PaymentGateway = () => {
  const [shift, setShift] = useState(false);
  const { loading: basketLoading, data: basketData } = useQuery(GET_BASKET, {
    variables: {
      user: localStorage.getItem("email")
    }
  });
  // console.log(basketData);
  const total_amount = basketData?.basket.reduce(
    (prev, next) => prev + next.quantity * next?.dish?.price,
    0
  );
  const stripePromise = loadStripe(
    "pk_test_51KuKUKSGwa0EAembrLQFi7MKO6C62USlvWmYIHmLHrlenxXHyBWWhOSE9bhan56QygtgiCMCFn6X9JoKYL8f5JTU00X2ky9iWi"
  );
  const { loading: secretKeyLoading, data: secretKeyData } = useQuery(
    GET_SECRET_KEY,
    {
      variables: {
        amount: total_amount,
        currency: "inr"
      }
    }
  );
  const options = {
    // clientSecret: secretKeyData?.getClientSecret,
    mode: "payment",
    currency: "inr",
    amount: total_amount,
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: true
    },
    business:"Recipee shop",
    payment_method_configuration: 'pmc_234',
    appearance: {
      theme: "night",
      labels: "floating"
    }
  };

  console.log(total_amount);

  return (
    <div className="payment-gateway flex">
      <Sidebar />
      {total_amount === undefined || isNaN(total_amount) || basketLoading ? (
        <Loader />
      ) : (
        <Elements
          stripe={stripePromise}
          // clientSecret="pi_3NVe5wSGwa0EAemb1gacee8T_secret_yk8N22thZPlXL56ivPmOukCeB"
          options={options}
        >
          <div className="payment-main text-white sm:mt-5">
            <nav>
              <h2>Checkout</h2>
            </nav>
            <div
              className=" payment-container sm:mt-10 mt-5 flex h-full gap-5 justify-between transition-all overflow-hidden"
              style={{
                transform: shift ? "translateX(-90vw)" : ""
              }}
            >
              <div className="payment-form">
                <PaymentElement className="pl-5 mt-5 " />
              </div>
              {/* <div className="payment-form p-7 sm:p-0">
                <form action="">
                  <div className="payment-card">
                    <h3>Card Number</h3>
                    <div className="card-number flex items-center">
                    </div>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="pl-5 mt-5"
                    />
                  </div>
                  <div className="card-info mt-10 flex gap-5">
                    <div className="card-expiry">
                      <h3>Expiry date</h3>
                      <input
                        type="text"
                        className="pl-5 mt-5"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="card-cvv">
                      <h3>CVV</h3>
                      <input
                        type="number"
                        placeholder="CVV"
                        className="pl-5 mt-5"
                      />
                    </div>
                  </div>
                  <div className="user-address mt-10">
                    <input
                      type="text"
                      placeholder="address"
                      className="pl-5 mt-5"
                    />
                  </div>
                  <div className="promo-code mt-10">
                    <h3>Promo code(optional)</h3>
                    <input
                      type="text"
                      placeholder="Enter the code here"
                      className="pl-5 mt-5"
                    />
                  </div>
                  <div className="other-payments mt-10">
                    <h3>Other Payment options</h3>
                  </div>
                </form>
              </div> */}
              <div className="payment-ticket p-7 flex flex-col justify-between">
                <div className="payment-ticket-container overflow-x-scroll no-scrollbar">
                  {basketLoading && (
                    <div className="mb-5">
                      <Loader2 />
                    </div>
                  )}
                  <div className="payment-items ">
                    {basketData?.basket.map((item, index) => {
                      return (
                        <div
                          className="payment-item flex gap-5 mb-5 items-center w-full"
                          key={index}
                        >
                          <div className="payment-item-image h-16 w-16 rounded-lg">
                            <img
                              src={item?.dish.image}
                              alt=""
                              className="h-full w-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="payment-item-content flex justify-between items-center flex-1">
                            <div className="">
                              <h3 className="text-lg">{item?.dish.name}</h3>
                              <div className="payment-item-price">
                                <span className="mr-3">
                                  {item.quantity} plates
                                </span>
                                <span>{`Rs. ${item.dish.price}/-`}</span>
                              </div>
                            </div>
                            <div className="total-price">
                              <h2 className="text-lg">{`Rs. ${
                                parseInt(item.dish.price) * item.quantity
                              }/-`}</h2>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {basketLoading ? (
                    <p className="my-5 text-center w-full">Loading...</p>
                  ) : (
                    <>
                      <div className="payment-sum mt-3 text-lg pb-3 pl-3">
                        <div className="payment-total flex justify-between">
                          <h2>Total</h2>
                          <h2>{`Rs. ${total_amount}/-`}</h2>
                        </div>
                        <div className="payment-cgst flex justify-between my-5">
                          <h2>CGST</h2>
                          <h2>Rs. 20/-</h2>
                        </div>
                        <div className="payment-sgst flex justify-between">
                          <h2>SGST</h2>
                          <h2>Rs. 10/-</h2>
                        </div>
                      </div>
                      <div className="payment-final my-5 pl-3 flex justify-between text-lg">
                        <h2>Sum total</h2>
                        <h2>Rs. {total_amount + 10 + 20}/-</h2>
                      </div>
                    </>
                  )}
                </div>
                <div className="payment-button flex justify-center">
                  <button
                    disabled={basketLoading}
                    className="flex justify-center items-center text-lg"
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="payment-pagination sm:hidden mt-10 flex justify-center">
          <div className="payment-pagination-container flex justify-between w-14">
            <span
              className={`pagination-dot rounded-full ${
                !shift && "pagination-circle"
              }`}
              onClick={() => setShift(false)}
            ></span>
            <span
              className={`pagination-dot rounded-full ${
                shift && "pagination-circle"
              }`}
              onClick={() => setShift(true)}
            ></span>
          </div>
        </div>
        <div className="payment-button mt-10 flex justify-center sm:hidden">
          <button>Make Payment</button>
        </div> */}
          </div>
        </Elements>
      )}
    </div>
  );
};

export default PaymentGateway;
