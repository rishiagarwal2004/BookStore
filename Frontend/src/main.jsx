import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";
import EnrollProvider from "./context/EnrollProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <EnrollProvider>
          <div className="dark:bg-slate-900 dark:text-white">
            <App />
          </div>
        </EnrollProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
