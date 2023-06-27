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
    // console.log("clicked");
    setPos(!pos);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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

    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   phone,
    //   address,
    //   city,
    //   pin,
    //   image
    // } = formData;

    // const base64 = await convertToBase64(image);
    // console.log(typeof base64);

    formData.image = await convertToBase64(formData.image);

    try {
      const response = await createProfile({
        variables: {
          input: formData
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [addImage, { loading, error, data }] = useMutation(ADD_IMAGE);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = formData.image;
    const base64 = await convertToBase64(file);
    console.log(base64);
    const uri = "http://localhost:5000/imgUpload";
    const response = await fetch(uri, {
      method: "POST",
      body: {
        img: base64
      }
    });
    console.log(response);
    // console.log(file);
    // try {
    //   const response = await addImage({
    //     variables: {
    //       file: formData.image
    //     }
    //   });
    //   console.log(response);
    //   console.log(error);
    // } catch (error) {
    //   console.log(error);
    // }
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
