import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_LOGIN } from "../../utils/graphql/mutations";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [authenticate, { loading }] = useMutation(GET_LOGIN);
  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleLoginSubmit = (e) => {
    if (!loginData.email || !loginData.password) return;
    e.preventDefault();
    try {
      authenticate({
        variables: {
          input: loginData
        }
      }).then((res) => {
        console.log(res);
        if (res.data.getLogin.code === 200) {
          localStorage.setItem("token", res.data.getLogin.token);
          localStorage.setItem("email", loginData.email);
          navigate("/");
        } else {
          alert(res.data.getLogin.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex sm:flex-row flex-col-reverse login">
      <div className="login-form sm:w-1/2 flex items-center relative">
        <div className="signup-form-container ml-10 absolute">
          <div className="signup-header">
            <h2 className="text-3xl mb-3 font-md">Welcome to Recipee</h2>
            <h3>
              Please login to continue or
              <Link to="/signup">
                <span className="cursor-pointer font-bold"> Sign Up</span>
              </Link>
            </h3>
          </div>
          <div className="signup-forms mt-10 text-white">
            <form
              action=""
              className="flex flex-col"
              onSubmit={handleLoginSubmit}
            >
              <label htmlFor="">Email Id</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginData}
              />
              <label htmlFor="">Password</label>
              <div className="w-full relative">
                <input
                  type={`${visibility ? "text" : "password"}`}
                  name="password"
                  className="w-full"
                  value={loginData.password}
                  onChange={handleLoginData}
                />
                {visibility ? (
                  <AiFillEye
                    className="absolute text-xl top-0 right-0 mb-1 cursor-pointer"
                    onClick={() => setVisibility(!visibility)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="absolute text-xl top-0 right-0 mb-1 cursor-pointer"
                    onClick={() => setVisibility(!visibility)}
                  />
                )}
              </div>
              <p className="">
                Forget password?{" "}
                <span className="font-bold cursor-pointer">Click here</span>
              </p>
              <div className="signup-forms-btns flex flex-col w-full mt-7">
                <button type="submit" className="cursor-pointer">
                  {loading ? <span class="loader"></span> : "Continue"}
                </button>
                <button className="mt-3">Continue with Google</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="welcome-img sm:w-1/2 h-screen">
        <img
          className="h-full w-full object-cover"
          src="https://marleyspoon.com/media/recipes/53977/main_photos/large/mexican_chicken_pizzas-f681a95cd4526aa0d0b0def8ddcce973.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
