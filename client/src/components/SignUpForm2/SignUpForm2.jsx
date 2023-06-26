import React from "react";
import "./SignUpForm2.css";

const SignUpForm2 = (props) => {
  return (
    <div
      className={`signup-form-container mt-10 mx-16 absolute`}
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
              your picture here
            </p>
            <input
              type="file"
              id="pic-input"
              onChange={props.handleFileChange}
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
          <label htmlFor="">PIN code</label>
          <input
            type="text"
            name="pin"
            value={props.formData.pin}
            onChange={props.handleFormChange}
          />
          <p className="">
            Already have an account?{" "}
            <span className="font-bold cursor-pointer">Login</span>
          </p>
          <div className="signup-forms-btns flex flex-col w-full mt-7">
            <button type="submit">Continue</button>
            <button className="mt-3">Continue with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm2;
