import React from "react";
// import "../../pages/SignUp/SignUp.css"
import "./SignUpForm.css";
import { Link } from "react-router-dom";

const SignUpForm = (props) => {
  return (
    <div
      className="signup-form-container ml-10 absolute"
      style={{ right: props.pos === "full" ? "100%" : "auto" }}
    >
      <div className="signup-header">
        <h2 className="text-3xl mb-3 font-md">Welcome to Recipee</h2>
        <h3>Please signup to continue</h3>
      </div>
      <div className="signup-forms mt-7 text-white">
        <form action="" className="flex flex-col">
          <label htmlFor="">First name</label>
          <input
            type="text"
            name="firstName"
            value={props.formData.firstName}
            onChange={props.handleFormChange}
            required={true}
          />
          <label htmlFor="">Last name</label>
          <input
            type="text"
            name="lastName"
            value={props.formData.lastName}
            onChange={props.handleFormChange}
          />
          <label htmlFor="">Email Id</label>
          <input
            type="email"
            name="email"
            value={props.formData.email}
            onChange={props.handleFormChange}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={props.formData.password}
            onChange={props.handleFormChange}
          />
          <label htmlFor="">Phone number</label>
          <input
            type="number"
            name="phone"
            value={props.formData.phone}
            onChange={props.handleFormChange}
          />
        </form>
        <p className="">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-bold cursor-pointer">Login</span>
          </Link>
        </p>
        <div className="signup-forms-btns flex flex-col w-full mt-7">
          <button
            type="submit"
            onClick={props.click}
            className="cursor-pointer"
          >
            Continue
          </button>
          <button className="mt-3">Continue with Google</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
