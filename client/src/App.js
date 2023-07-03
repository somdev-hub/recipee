import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Basket from "./pages/Basket/Basket";
import Favorites from "./pages/Favorites/Favorites";
import Community from "./pages/Community/Community";
import Settings from "./pages/Settings/Settings";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import jwt_decode from "jwt-decode";
import AddRecipee from "./pages/AddRecipe/AddRecipee";
import Article from "./pages/Article/Article";

const client = new ApolloClient({
  uri: "https://recipee-server.onrender.com",
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: "https://recipee-server.onrender.com" }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
      }
    }
  }, [navigate, token]);
  // console.log(token);
  return (
    <ApolloProvider client={client}>
      {/* <React.Fragment id="app"> */}

      <Routes>
        {token && <Route path="/" element={<Dashboard />} />}
        {token && <Route path="/basket" element={<Basket />} />}
        {token && <Route path="/favorites" element={<Favorites />} />}
        {token && <Route path="/community" element={<Community />} />}
        {token && <Route path="/settings" element={<Settings />} />}
        {token && <Route path="/add-recipee" element={<AddRecipee />} />}
        {token && (
          <Route path="/community/article/:articleId" element={<Article />} />
        )}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<Navigate replace to="/signup" />} />
        {/* <Route path="/signup2" element={<SignUp />} /> */}
      </Routes>

      {/* </React.Fragment> */}
    </ApolloProvider>
  );
}

export default App;
