import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Basket from "./pages/Basket/Basket";
import Favorites from "./pages/Favorites/Favorites";
import Community from "./pages/Community/Community";
import Settings from "./pages/Settings/Settings";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import SignUp from "./pages/SignUp/SignUp";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: "http://localhost:4000/" }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

function App() {
  // const [theme, setTheme] = React.useState("light");
  return (
    <ApolloProvider client={client}>
      {/* <React.Fragment id="app"> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/favourites" element={<Favorites />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/signup2" element={<SignUp />} /> */}
        </Routes>
      </BrowserRouter>
      {/* </React.Fragment> */}
    </ApolloProvider>
  );
}

export default App;
