import React, { useState } from "react";
import "./SignUp.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignUpForm2 from "../../components/SignUpForm2/SignUpForm2";
import { ADD_IMAGE, CREATE_PROFILE } from "../../utils/graphql/mutations";
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
    image: null
  });
  const [createProfile] = useMutation(CREATE_PROFILE);
  const clickPos = () => {
    setPos(!pos);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (img) => {
    setFormData({ ...formData, image: img });
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(formData);
  return (
    <div className="signup flex">
      <div className="signup-form w-1/2 flex items-center relative">
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
