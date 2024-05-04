import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import rootReducer from "./reducer";
import { ClerkProvider } from '@clerk/clerk-react'


// Import your publishable key
const PUBLISHABLE_KEY = "pk_test_ZGFzaGluZy1tdXN0YW5nLTUwLmNsZXJrLmFjY291bnRzLmRldiQ"


const store = configureStore({
  reducer: rootReducer,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
      </ClerkProvider>
  </React.StrictMode>
);
