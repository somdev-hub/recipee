import React, { useEffect } from "react";
import "./Success.css";
import Lottie from "lottie-react";
import Green_tick from "../../utils/lottie/green_tick.json";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { Invoice } from "../../components/Invoice/Invoice";
import { PDFDownloadLink, PDFViewer, usePDF } from "@react-pdf/renderer";
import { useQuery } from "@apollo/client";
import {
  GET_BASKET_HEAD,
  GET_PROFILE_ADDRESS,
  ON_PAYMENT_SUCCESS
} from "../../utils/graphql/queries";
import { BiArrowBack } from "react-icons/bi";
import { convertToBase64 } from "../../utils/base64";

const style = {
  height: "7rem",
  width: "7rem"
};

const Success = () => {
  const { data: basketData } = useQuery(GET_BASKET_HEAD, {
    variables: {
      user: localStorage.getItem("email")
    }
  });
  const { error: profile_error, data: userData } = useQuery(
    GET_PROFILE_ADDRESS,
    {
      variables: {
        email: localStorage.getItem("email")
      }
    }
  );
  const purchasedItems = basketData?.basket?.map((item) => {
    return [item.dish.name, item.quantity, item.dish.price];
  });
  // console.log(purchasedItems);
  // const { refNumber, paymentDataTime, amount } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refNumber = searchParams.get("refNumber");
  const paymentDate = searchParams.get("paymentDate");
  const paymentTime = searchParams.get("paymentTime");
  const amount = searchParams.get("amount");
  // const paymentDataTime1 = new Date(paymentDataTime);

  // console.log(paymentDataTime.toLocaleDateString());
  // console.log(refNumber, paymentDate, paymentTime, amount);

  const invoice = (
    <Invoice
      amount={amount}
      refNumber={refNumber}
      paymentDataTime={paymentDate}
      purchasedItems={purchasedItems}
      user={
        userData?.getProfile.firstName + " " + userData?.getProfile.lastName
      }
      userEmail={localStorage.getItem("email")}
      userAddress={
        userData?.getProfile.address +
        ", " +
        userData?.getProfile.city +
        ", " +
        userData?.getProfile.pin
      }
    />
  );

  if (profile_error) console.log(profile_error);
  // console.log(userData?.getProfile.firstName);

  const [instance, updateInstance] = usePDF({
    document: invoice
  });
  // console.log(instance.loading);
  const [base64PDF, setBase64PDF] = React.useState(null);
  if (!instance.loading) {
    convertToBase64(instance.blob).then((res) => {
      setBase64PDF(res);
    });
  }
  // console.log(base64PDF);

  const { error: successError, data: successData } = useQuery(
    ON_PAYMENT_SUCCESS,
    {
      variables: {
        user: localStorage.getItem("email"),
        invoice: base64PDF,
        date: paymentDate,
        refNumber: refNumber
      },
      enabled: !!base64PDF && basketData?.basket?.length > 0 && !!userData
    }
  );

  // if (successError) console.log(successError);
  console.log(successData?.onPaymentSuccess);

  return (
    <div className="success text-white relative">
      <Link to="/" className="sm:block hidden">
        <div className="pt-5 ml-5 absolute flex gap-3 items-center">
          <BiArrowBack />
          <h3 className="">Back to Dashboard</h3>
        </div>
      </Link>
      <div className="success-page-main w-full h-screen flex justify-center items-center">
        <div className="success-cards">
          <div className="success-head">
            <div className="lottie-animation flex justify-center">
              <Lottie
                animationData={Green_tick}
                // loop={true}
                style={style}
                className="flex justify-center"
              />
            </div>
            <div className="payment-head-data  flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Payment Success!</h3>
              <p>INR {amount}/-</p>
            </div>
          </div>
          <div className="success-body my-5 p-5 ">
            <h3 className="text-lg">Payment details</h3>
            <div className="success-body-data mt-5 pb-7">
              <div className="flex justify-between text-sm mt-5">
                <h4>Ref number</h4>
                <p>{refNumber}</p>
              </div>
              <div className="flex justify-between text-sm mt-5">
                <h4>Payment status</h4>
                <p>Success</p>
              </div>
              <div className="flex justify-between text-sm mt-5">
                <h4>Payment date</h4>
                <p>{paymentDate}</p>
              </div>
              <div className="flex justify-between text-sm mt-5">
                <h4>Payment time</h4>
                <p>{paymentTime}</p>
              </div>
            </div>
            <div className="total-payment mt-5 flex justify-between">
              <h4>Total payment</h4>
              <p>Rs. {amount}/-</p>
            </div>
          </div>
          <div className="success-tail flex items-center justify-between p-3">
            <div className="success-tail-icon rounded-full flex items-center justify-center">
              <AiOutlineQuestionCircle className="text-3xl " />
            </div>
            <div className="w-2/3 ">
              <h3 className="mb-1">Having trouble with payments?</h3>
              <p className="text-sm">Contact our helpline</p>
            </div>
            <MdOutlineArrowForwardIos className="text-xl font-thin" />
          </div>

          <PDFDownloadLink document={invoice} fileName="invoice.pdf">
            {({ blob, url, loading, error }) => {
              return loading ? (
                <p className="mt-5 text-center text-sm">Loading document...</p>
              ) : (
                <div
                  className="flex mt-5 justify-center cursor-pointer"
                  // onClick={handlePdf}
                >
                  <PiDownloadSimpleBold className="text-lg mr-2" />
                  <h3 className="text-sm">Download PDF Receipt</h3>
                </div>
              );
            }}
          </PDFDownloadLink>
          {/* <PDFViewer>{invoice}</PDFViewer> */}

          <div className="sm:hidden block mt-5">
            <Link to="/">
              <button className="dashboard-btn w-full h-12">Dashboard</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
