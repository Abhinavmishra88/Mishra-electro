import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingCart,
  FaLock,
  FaTruck,
  FaBox,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

import useCart from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";

import "../styles/checkout.css";


// ============================================================
// API
// ============================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://mishra-electro.onrender.com";


// ============================================================
// RAZORPAY KEY
// ============================================================

const RAZORPAY_KEY_ID =
  import.meta.env.VITE_RAZORPAY_KEY_ID;


// ============================================================
// LOAD RAZORPAY SCRIPT
// ============================================================

const loadRazorpayScript = () => {
  return new Promise((resolve) => {

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript =
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

    if (existingScript) {

      existingScript.addEventListener(
        "load",
        () => resolve(true)
      );

      existingScript.addEventListener(
        "error",
        () => resolve(false)
      );

      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};


// ============================================================
// CHECKOUT COMPONENT
// ============================================================

function Checkout() {

  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  const { user } = useAuth();


  // ==========================================================
  // FORM
  // ==========================================================

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",

    address: "",
    city: "",
    state: "",
    pincode: "",

    paymentMethod: "COD",
  });


  // ==========================================================
  // STATE
  // ==========================================================

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================================================
  // LOAD USER INFORMATION
  // ==========================================================

  useEffect(() => {

    if (!user) {
      return;
    }

    setFormData((previous) => ({
      ...previous,

      customerName:
        previous.customerName ||
        user.name ||
        user.username ||
        "",

      customerEmail:
        previous.customerEmail ||
        user.email ||
        "",

      customerPhone:
        previous.customerPhone ||
        user.phone ||
        "",
    }));

  }, [user]);


  // ==========================================================
  // SHIPPING
  // ==========================================================

  const shipping =
    cartTotal === 0
      ? 50
      : cartTotal >= 1000
        ? 0
        : 50;


  // ==========================================================
  // GRAND TOTAL
  // ==========================================================

  const grandTotal =
    Number(cartTotal) +
    Number(shipping);


  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };


  // ==========================================================
  // VALIDATE FORM
  // ==========================================================

  const validateForm = () => {

    if (cart.length === 0) {
      return "Your cart is empty.";
    }


    if (!formData.customerName.trim()) {
      return "Please enter your full name.";
    }


    if (!formData.customerEmail.trim()) {
      return "Please enter your email address.";
    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.customerEmail.trim()
      )
    ) {
      return "Please enter a valid email address.";
    }


    if (!formData.customerPhone.trim()) {
      return "Please enter your phone number.";
    }


    const phone =
      formData.customerPhone.replace(
        /\D/g,
        ""
      );

    if (phone.length !== 10) {
      return "Please enter a valid 10-digit phone number.";
    }


    if (!formData.address.trim()) {
      return "Please enter your complete delivery address.";
    }


    if (!formData.city.trim()) {
      return "Please enter your city.";
    }


    if (!formData.state.trim()) {
      return "Please enter your state.";
    }


    if (!formData.pincode.trim()) {
      return "Please enter your pincode.";
    }


    if (!/^\d{6}$/.test(formData.pincode)) {
      return "Please enter a valid 6-digit pincode.";
    }


    if (!formData.paymentMethod) {
      return "Please select a payment method.";
    }


    return null;
  };


  // ==========================================================
  // BUILD ORDER DATA
  // ==========================================================

  const buildOrderData = ({
    razorpayOrderId = null,
    razorpayPaymentId = null,
  } = {}) => {

    return {

      customerName:
        formData.customerName.trim(),

      customerEmail:
        formData.customerEmail.trim(),

      customerPhone:
        formData.customerPhone.trim(),

      address:
        formData.address.trim(),

      city:
        formData.city.trim(),

      state:
        formData.state.trim(),

      pincode:
        formData.pincode.trim(),


      shipping:
        shipping === 0
          ? "FREE SHIPPING"
          : "Standard Shipping",


      shippingCharge:
        Number(
          shipping.toFixed(2)
        ),


      paymentMethod:
        formData.paymentMethod,


      paymentStatus:
        formData.paymentMethod === "RAZORPAY"
          ? "PAID"
          : "PENDING",


      orderStatus:
        "PLACED",


      approvalStatus:
        "PENDING",


      deliveryStatus:
        "PENDING",


      subtotal:
        Number(
          Number(cartTotal).toFixed(2)
        ),


      total:
        Number(
          Number(grandTotal).toFixed(2)
        ),


      razorpayOrderId,

      razorpayPaymentId,
    };
  };


  // ==========================================================
  // SAVE ORDER TO SPRING BOOT
  // ==========================================================

  const saveOrder = async ({
    razorpayOrderId = null,
    razorpayPaymentId = null,
  } = {}) => {

    const orderData =
      buildOrderData({
        razorpayOrderId,
        razorpayPaymentId,
      });


    console.log(
      "================================="
    );

    console.log(
      "SENDING ORDER TO SPRING BOOT:"
    );

    console.log(orderData);

    console.log(
      "================================="
    );


    const response =
      await fetch(
        `${API_BASE_URL}/api/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              orderData
            ),
        }
      );


    let data;


    try {

      data =
        await response.json();

    } catch {

      throw new Error(
        "Server returned an invalid response."
      );
    }


    console.log(
      "ORDER RESPONSE:",
      data
    );


    if (!response.ok) {

      throw new Error(
        data?.message ||
        data?.error ||
        `Unable to create order. Server returned ${response.status}.`
      );
    }


    if (!data?.id) {

      throw new Error(
        "Order was created but order ID was not returned."
      );
    }


    return data;
  };


  // ==========================================================
  // CLEAR CART
  // ==========================================================

  const clearShoppingCart = () => {

    try {
      clearCart();
    } catch (error) {

      console.error(
        "useCart clearCart error:",
        error
      );
    }


    localStorage.removeItem(
      "cart"
    );

    localStorage.removeItem(
      "cartItems"
    );
  };


  // ==========================================================
  // SAVE LAST ORDER
  // ==========================================================

  const saveLastOrder = (order) => {

    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order)
    );
  };


  // ==========================================================
  // COD ORDER
  // ==========================================================

  const handleCODOrder = async () => {

    try {

      setLoading(true);

      setError("");

      setSuccess("");


      const savedOrder =
        await saveOrder();


      console.log(
        "COD ORDER CREATED:",
        savedOrder
      );


      saveLastOrder(
        savedOrder
      );


      clearShoppingCart();


      navigate(
        `/orders/${savedOrder.id}`,
        {
          replace: true,
        }
      );


    } catch (err) {

      console.error(
        "COD ORDER ERROR:",
        err
      );


      setError(
        err?.message ||
        "Unable to place COD order."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==========================================================
  // CREATE RAZORPAY ORDER
  // ==========================================================

  const createRazorpayOrder =
    async () => {

      const response =
        await fetch(
          `${API_BASE_URL}/api/payment/create-order`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                amount:
                  Number(
                    grandTotal.toFixed(2)
                  ),
              }),
          }
        );


      let data;


      try {

        data =
          await response.json();

      } catch {

        throw new Error(
          "Invalid response from Razorpay server."
        );
      }


      console.log(
        "RAZORPAY CREATE ORDER RESPONSE:",
        data
      );


      if (!response.ok) {

        throw new Error(
          data?.message ||
          data?.error ||
          `Unable to create Razorpay order. Server returned ${response.status}.`
        );
      }


      // Your Spring Boot controller
      // returns:
      //
      // {
      //   success: true,
      //   message: "...",
      //   order: {
      //      id,
      //      amount,
      //      currency,
      //      keyId
      //   }
      // }

      const razorpayOrder =
        data?.order || data;


      const razorpayOrderId =
        razorpayOrder?.id ||
        data?.orderId;


      const razorpayAmount =
        razorpayOrder?.amount ||
        data?.amount;


      const razorpayCurrency =
        razorpayOrder?.currency ||
        data?.currency ||
        "INR";


      // Prefer backend key.
      // Fall back to Vite .env key.

      const razorpayKey =
        razorpayOrder?.keyId ||
        razorpayOrder?.key ||
        data?.keyId ||
        data?.key ||
        RAZORPAY_KEY_ID;


      console.log(
        "RAZORPAY ORDER ID:",
        razorpayOrderId
      );

      console.log(
        "RAZORPAY AMOUNT:",
        razorpayAmount
      );


      if (!razorpayOrderId) {

        throw new Error(
          "Razorpay order ID is missing. Check Spring Boot /api/payment/create-order."
        );
      }


      if (!razorpayAmount) {

        throw new Error(
          "Razorpay amount is missing."
        );
      }


      if (!razorpayKey) {

        throw new Error(
          "Razorpay Key ID is missing. Check your .env file."
        );
      }


      return {

        id:
          razorpayOrderId,

        amount:
          razorpayAmount,

        currency:
          razorpayCurrency,

        key:
          razorpayKey,
      };
    };


  // ==========================================================
  // VERIFY RAZORPAY PAYMENT
  // ==========================================================

  const verifyRazorpayPayment =
    async ({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    }) => {

      const response =
        await fetch(
          `${API_BASE_URL}/api/payment/verify`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                razorpayOrderId,

                razorpayPaymentId,

                razorpaySignature,
              }),
          }
        );


      let data;


      try {

        data =
          await response.json();

      } catch {

        throw new Error(
          "Invalid payment verification response."
        );
      }


      console.log(
        "RAZORPAY VERIFY RESPONSE:",
        data
      );


      if (!response.ok) {

        throw new Error(
          data?.message ||
          data?.error ||
          "Payment verification failed."
        );
      }


      if (
        data?.success === false
      ) {

        throw new Error(
          data?.message ||
          "Payment verification failed."
        );
      }


      return data;
    };


  // ==========================================================
  // RAZORPAY PAYMENT
  // ==========================================================

  const handleRazorpayPayment =
    async () => {

      try {

        setLoading(true);

        setError("");

        setSuccess("");


        // ------------------------------------------------------
        // LOAD RAZORPAY
        // ------------------------------------------------------

        const loaded =
          await loadRazorpayScript();


        if (!loaded) {

          throw new Error(
            "Razorpay could not be loaded. Check your internet connection."
          );
        }


        // ------------------------------------------------------
        // CHECK KEY
        // ------------------------------------------------------

        if (!RAZORPAY_KEY_ID) {

          console.warn(
            "VITE_RAZORPAY_KEY_ID is missing. Waiting for backend keyId."
          );
        }


        // ------------------------------------------------------
        // CREATE RAZORPAY ORDER
        // ------------------------------------------------------

        const razorpayOrder =
          await createRazorpayOrder();


        // ------------------------------------------------------
        // RAZORPAY OPTIONS
        // ------------------------------------------------------

        const options = {

          key:
            razorpayOrder.key,

          amount:
            razorpayOrder.amount,

          currency:
            razorpayOrder.currency,

          name:
            "Mishra Electro",

          description:
            "Mishra Electro Order Payment",

          order_id:
            razorpayOrder.id,


          prefill: {

            name:
              formData.customerName,

            email:
              formData.customerEmail,

            contact:
              formData.customerPhone,
          },


          notes: {

            customerName:
              formData.customerName,

            customerEmail:
              formData.customerEmail,

            customerPhone:
              formData.customerPhone,
          },


          theme: {
            color: "#e63946",
          },


          modal: {

            ondismiss: () => {

              console.log(
                "Razorpay checkout closed."
              );

              setLoading(false);
            },
          },


          handler:
            async (response) => {

              try {

                console.log(
                  "RAZORPAY SUCCESS:",
                  response
                );


                const paymentId =
                  response
                    ?.razorpay_payment_id;


                const returnedOrderId =
                  response
                    ?.razorpay_order_id;


                const signature =
                  response
                    ?.razorpay_signature;


                if (
                  !paymentId ||
                  !returnedOrderId ||
                  !signature
                ) {

                  throw new Error(
                    "Incomplete Razorpay payment response."
                  );
                }


                // ------------------------------------------------
                // VERIFY PAYMENT
                // ------------------------------------------------

                await verifyRazorpayPayment({

                  razorpayOrderId:
                    returnedOrderId,

                  razorpayPaymentId:
                    paymentId,

                  razorpaySignature:
                    signature,
                });


                // ------------------------------------------------
                // SAVE DATABASE ORDER
                // ------------------------------------------------

                const savedOrder =
                  await saveOrder({

                    razorpayOrderId:
                      returnedOrderId,

                    razorpayPaymentId:
                      paymentId,
                  });


                console.log(
                  "DATABASE ORDER CREATED:",
                  savedOrder
                );


                saveLastOrder(
                  savedOrder
                );


                // ------------------------------------------------
                // CLEAR CART
                // ------------------------------------------------

                clearShoppingCart();


                // ------------------------------------------------
                // REDIRECT
                // ------------------------------------------------

                navigate(
                  `/orders/${savedOrder.id}`,
                  {
                    replace: true,
                  }
                );


              } catch (err) {

                console.error(
                  "PAYMENT SUCCESS ERROR:",
                  err
                );


                setError(
                  err?.message ||
                  "Payment succeeded but order processing failed."
                );

              } finally {

                setLoading(false);
              }
            },
        };


        // ------------------------------------------------------
        // OPEN RAZORPAY
        // ------------------------------------------------------

        const razorpay =
          new window.Razorpay(
            options
          );


        // ------------------------------------------------------
        // PAYMENT FAILED
        // ------------------------------------------------------

        razorpay.on(
          "payment.failed",
          (response) => {

            console.error(
              "RAZORPAY PAYMENT FAILED:",
              response
            );


            setError(
              response?.error?.description ||
              "Razorpay payment failed."
            );


            setLoading(false);
          }
        );


        razorpay.open();


      } catch (err) {

        console.error(
          "RAZORPAY ERROR:",
          err
        );


        setError(
          err?.message ||
          "Unable to start Razorpay payment."
        );


        setLoading(false);
      }
    };


  // ==========================================================
  // PLACE ORDER
  // ==========================================================

  const handlePlaceOrder =
    async (event) => {

      event.preventDefault();


      setError("");

      setSuccess("");


      const validationError =
        validateForm();


      if (validationError) {

        setError(
          validationError
        );

        return;
      }


      if (loading) {
        return;
      }


      // ------------------------------------------------------
      // COD
      // ------------------------------------------------------

      if (
        formData.paymentMethod ===
        "COD"
      ) {

        await handleCODOrder();

        return;
      }


      // ------------------------------------------------------
      // RAZORPAY
      // ------------------------------------------------------

      if (
        formData.paymentMethod ===
        "RAZORPAY"
      ) {

        await handleRazorpayPayment();

        return;
      }


      setError(
        "Please select a payment method."
      );
    };


  // ==========================================================
  // EMPTY CART
  // ==========================================================

  if (cart.length === 0) {

    return (
      <main className="checkout-page">

        <div className="checkout-container">

          <div className="checkout-header">

            <div>
              <h1>Checkout</h1>

              <p>
                Complete your order securely
              </p>
            </div>


            <div className="secure-badge">
              <FaLock />
              Secure Checkout
            </div>

          </div>


          <div className="checkout-empty">

            <div className="empty-icon">
              <FaShoppingCart />
            </div>


            <div>

              <h2>
                Your cart is empty
              </h2>

              <p>
                Add some products before
                proceeding to checkout.
              </p>


              <Link
                to="/products"
                className="checkout-primary-btn"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }


  // ==========================================================
  // MAIN UI
  // ==========================================================

  return (

    <main className="checkout-page">

      <div className="checkout-container">


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="checkout-header">

          <div>

            <h1>
              Checkout
            </h1>

            <p>
              Complete your order securely
            </p>

          </div>


          <div className="secure-badge">

            <FaLock />

            Secure Checkout

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="checkout-alert error">

            <FaExclamationCircle />

            <span>
              {error}
            </span>

          </div>

        )}


        {/* ==================================================
            SUCCESS
        ================================================== */}

        {success && (

          <div className="checkout-alert success">

            <FaCheckCircle />

            <span>
              {success}
            </span>

          </div>

        )}


        <form
          onSubmit={handlePlaceOrder}
          className="checkout-grid"
        >


          {/* =================================================
              LEFT
          ================================================= */}

          <div className="checkout-left">


            {/* ===============================================
                CUSTOMER
            =============================================== */}

            <section className="checkout-card">

              <div className="section-heading">

                <div className="section-icon purple">
                  <FaUser />
                </div>

                <div>

                  <h2>
                    Customer Details
                  </h2>

                  <p>
                    Enter your contact information
                  </p>

                </div>

              </div>


              <div className="form-grid">


                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="customerName"
                    value={
                      formData.customerName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="customerPhone"
                    value={
                      formData.customerPhone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your phone number"
                    maxLength="10"
                    autoComplete="tel"
                  />

                </div>


                <div className="form-group full">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="customerEmail"
                    value={
                      formData.customerEmail
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />

                </div>

              </div>

            </section>


            {/* ===============================================
                DELIVERY
            =============================================== */}

            <section className="checkout-card">

              <div className="section-heading">

                <div className="section-icon pink">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <h2>
                    Delivery Address
                  </h2>

                  <p>
                    Where should we deliver your order?
                  </p>

                </div>

              </div>


              <div className="form-grid">


                <div className="form-group full">

                  <label>
                    Complete Address
                  </label>

                  <textarea
                    name="address"
                    value={
                      formData.address
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="House / Flat No., Street, Area, Landmark"
                    rows="4"
                  />

                </div>


                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter city"
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={
                      formData.state
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter state"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={
                      formData.pincode
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />

                </div>

              </div>

            </section>


            {/* ===============================================
                PAYMENT
            =============================================== */}

            <section className="checkout-card">

              <div className="section-heading">

                <div className="section-icon blue">
                  <FaCreditCard />
                </div>

                <div>

                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Choose how you want to pay
                  </p>

                </div>

              </div>


              <div className="payment-options">


                {/* COD */}

                <label
                  className={
                    `payment-option ${
                      formData.paymentMethod ===
                      "COD"
                        ? "selected"
                        : ""
                    }`
                  }
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={
                      formData.paymentMethod ===
                      "COD"
                    }
                    onChange={
                      handleChange
                    }
                  />


                  <div className="payment-option-icon">
                    💵
                  </div>


                  <div className="payment-option-content">

                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>

                  </div>

                </label>


                {/* RAZORPAY */}

                <label
                  className={
                    `payment-option ${
                      formData.paymentMethod ===
                      "RAZORPAY"
                        ? "selected"
                        : ""
                    }`
                  }
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="RAZORPAY"
                    checked={
                      formData.paymentMethod ===
                      "RAZORPAY"
                    }
                    onChange={
                      handleChange
                    }
                  />


                  <div className="payment-option-icon">
                    💳
                  </div>


                  <div className="payment-option-content">

                    <strong>
                      Pay Online with Razorpay
                    </strong>

                    <span>
                      UPI, Cards, Net Banking & Wallets
                    </span>

                  </div>

                </label>

              </div>

            </section>

          </div>


          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="checkout-right">


            {/* ===============================================
                SUMMARY
            =============================================== */}

            <section className="summary-card">

              <div className="summary-header">

                <div>

                  <h2>
                    Order Summary
                  </h2>

                  <p>
                    {cart.length}{" "}
                    {cart.length === 1
                      ? "item"
                      : "items"}
                  </p>

                </div>


                <div className="summary-icon">
                  <FaShoppingCart />
                </div>

              </div>


              {/* ITEMS */}

              <div className="summary-items">

                {cart.map(
                  (item, index) => {

                    const price =
                      Number(
                        item.price ??
                        item.productPrice ??
                        0
                      );


                    const quantity =
                      Number(
                        item.quantity ??
                        item.qty ??
                        1
                      );


                    return (

                      <div
                        className="summary-item"
                        key={
                          item.id ??
                          item.productId ??
                          index
                        }
                      >

                        <div className="summary-product-image">

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                        </div>


                        <div className="summary-product-info">

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.category ||
                              "Electrical Product"}
                          </span>

                          <small>
                            Qty: {quantity}
                          </small>

                        </div>


                        <strong className="summary-price">

                          ₹
                          {(
                            price *
                            quantity
                          ).toFixed(2)}

                        </strong>

                      </div>

                    );
                  }
                )}

              </div>


              <div className="summary-divider" />


              {/* SUBTOTAL */}

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {Number(
                    cartTotal
                  ).toFixed(2)}
                </strong>

              </div>


              {/* DELIVERY */}

              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <strong
                  className={
                    shipping === 0
                      ? "free"
                      : ""
                  }
                >
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping.toFixed(2)}`}
                </strong>

              </div>


              <div className="summary-divider" />


              {/* TOTAL */}

              <div className="summary-total">

                <div>

                  <strong>
                    Total Amount
                  </strong>

                  <span>
                    Inclusive of applicable charges
                  </span>

                </div>


                <strong>
                  ₹
                  {grandTotal.toFixed(2)}
                </strong>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className={
                  `place-order-btn ${
                    loading
                      ? "loading"
                      : ""
                  }`
                }
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="spinner" />

                    Processing...
                  </>

                ) : (

                  <>
                    {formData.paymentMethod ===
                    "RAZORPAY"
                      ? "💳 Pay with Razorpay"
                      : "✓ Place Order"}
                  </>

                )}

              </button>


              {/* FEATURES */}

              <div className="checkout-features">


                <div className="checkout-feature">

                  <div>
                    <FaLock />
                  </div>

                  <section>

                    <strong>
                      Safe & Secure Checkout
                    </strong>

                    <span>
                      Your information is protected
                    </span>

                  </section>

                </div>


                <div className="checkout-feature">

                  <div>
                    <FaTruck />
                  </div>

                  <section>

                    <strong>
                      Reliable Delivery
                    </strong>

                    <span>
                      Track your order after confirmation
                    </span>

                  </section>

                </div>


                <div className="checkout-feature">

                  <div>
                    <FaBox />
                  </div>

                  <section>

                    <strong>
                      Easy Order Tracking
                    </strong>

                    <span>
                      Get delivery updates
                    </span>

                  </section>

                </div>


              </div>

            </section>

          </aside>

        </form>

      </div>

    </main>
  );
}


export default Checkout;