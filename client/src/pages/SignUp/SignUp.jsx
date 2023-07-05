import React, { useState } from "react";
import "./SignUp.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignUpForm2 from "../../components/SignUpForm2/SignUpForm2";
import { CREATE_PROFILE } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import { convertToBase64 } from "../../utils/base64";

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
    image: null
  });
  const [createProfile, { loading }] = useMutation(CREATE_PROFILE);
  const clickPos = () => {
    setPos(!pos);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (img) => {
    setFormData({ ...formData, image: img });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      pin,
      image
    } = formData;

    if (
      [firstName, lastName, email, password, phone, address, city, pin].some(
        (field) => field === ""
      )
    ) {
      alert("Please fill all the fields");
      return;
    }

    const base64Image = await convertToBase64(image);

    try {
      const response = await createProfile({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            city,
            pin,
            image: base64Image
          }
        }
      });
      console.log(response);
      if (response.data.addProfile.code === 200) {
        alert("Profile created successfully please login");
      } else {
        alert(response.data.addProfile.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup flex sm:flex-row flex-col-reverse">
      <div className="signup-form sm:w-1/2 flex items-center relative">
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
          loading={loading}
        />
      </div>
      <div className="welcome-img sm:w-1/2 sm:h-screen">
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
