import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import QueryContextProvider from "./context/QueryContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5040/graphql",
  cache: new InMemoryCache(),
});

const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

button {
  outline:none;
  border:none;
  cursor:pointer;
  border-radius:6px;
}

@media screen and (max-width: 767px){
	input{
		font-size:16px;
		
	}
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryContextProvider>
        <GlobalStyle />
        <App />
      </QueryContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
