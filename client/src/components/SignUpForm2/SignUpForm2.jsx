import React, { useState } from "react";
import "./SignUpForm2.css";
import { Link } from "react-router-dom";

const SignUpForm2 = (props) => {
  const [selectedImg, setSelectedImg] = useState("");

  const handleImg = (e) => {
    props.handleFileChange(e.target.files[0]);
    setSelectedImg(e.target.files[0].name);
  };
  // console.log(selectedImg);
  return (
    <div
      className="signup-form-container ml-10 absolute"
      style={{ right: props.pos === "full" ? "100%" : "auto" }}
    >
      <div className="signup-header">
        <h2 className="text-3xl mb-3 font-md">Welcome to Recipee</h2>
        <h3>Please signup to continue</h3>
      </div>
      <div className="signup-forms mt-10 text-white">
        <form action="" className="flex flex-col" onSubmit={props.handleSubmit}>
          <label htmlFor="">Upload a profile picture</label>
          <div className="pic-upload mt-2 mb-5 flex justify-center items-center p-5">
            <p>
              <label htmlFor="pic-input" className="mr-2 cursor-pointer">
                Upload{" "}
              </label>
              {selectedImg ? selectedImg : `your picture here`}
            </p>
            <input
              type="file"
              id="pic-input"
              accept="image/*"
              onChange={handleImg}
            />
          </div>
          <label htmlFor="">Address</label>
          <input
            type="text"
            name="address"
            value={props.formData.address}
            onChange={props.handleFormChange}
          />
          <label htmlFor="">City</label>
          <input
            type="text"
            name="city"
            value={props.formData.city}
            onChange={props.handleFormChange}
          />
          <div className="flex gap-5 justify-between items-center w-full mb-5">
            <div className="flex-1 flex flex-col">
              <label htmlFor="">PIN code</label>
              <input
                type="text"
                name="pin"
                value={props.formData.pin}
                onChange={props.handleFormChange}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="">Register yourself as</label>
              <select
                name="client"
                id=""
                className=""
                value={props.formData.client}
                onChange={props.handleFormChange}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="customer">Customer</option>
                <option value="restaurant owner">Restaurant owner</option>
              </select>
            </div>
          </div>
          {/* <label htmlFor="">
            Restaurant name (applicable only if your are a restaurant owner)
          </label>
          <input type="text" /> */}
          <p className="">
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-bold cursor-pointer">Login</span>
            </Link>
          </p>
          <div className="signup-forms-btns flex flex-col w-full mt-7">
            <button type="submit">
              {props.loading ? <span className="loader"></span> : "Sign up"}
            </button>
            <button className="mt-3">Continue with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm2;
