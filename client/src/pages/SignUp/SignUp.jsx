import React, { useState } from "react";
import "./SignUp.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignUpForm2 from "../../components/SignUpForm2/SignUpForm2";
import { CREATE_PROFILE } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";

const SignUp = () => {
  const [pos, setPos] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    pin: "",
    file: null
  });
  const [createProfile] = useMutation(CREATE_PROFILE);
  const clickPos = () => {
    // console.log("clicked");
    setPos(!pos);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await createProfile({
      variables: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pin,
        image: formData.file
      }
    });
    console.log(res);
  };
  // console.log(formData);
  return (
    <div className="signup flex">
      <div className="signup-form w-1/2 relative">
        <SignUpForm
          pos={pos ? "full" : "auto"}
          click={clickPos}
          handleFormChange={handleFormChange}
          formData={formData}
        />
        <SignUpForm2
          pos={!pos ? "full" : "auto"}
          handleFormChange={handleFormChange}
          handleFileChange={handleFileChange}
          formData={formData}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="welcome-img w-1/2 h-screen">
        <img
          className="h-full w-full object-cover"
          src="https://marleyspoon.com/media/recipes/53977/main_photos/large/mexican_chicken_pizzas-f681a95cd4526aa0d0b0def8ddcce973.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignUp;
