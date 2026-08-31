import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";


import App from "./App";


import {
  AuthProvider,
} from "./context/AuthContext";

import {
  WishlistProvider,
} from "./context/WishlistContext";

import {
  CartProvider,
} from "./context/CartContext";

import {
  OrderProvider,
} from "./context/OrderContext";

import {
  ProductProvider,
} from "./context/ProductContext";

import {
  CategoryProvider,
} from "./context/CategoryContext";


import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <WishlistProvider>

          <CartProvider>

            <OrderProvider>

              <ProductProvider>

                <CategoryProvider>

                  <App />

                </CategoryProvider>

              </ProductProvider>

            </OrderProvider>

          </CartProvider>

        </WishlistProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);