import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/layouts/Navbar";
import { useAuth } from "../context/AuthContext";

import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const { register } = useAuth();


  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

  });


  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));


    setError("");

    setSuccess("");

  };


  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {

    const name =
      formData.name.trim();

    const email =
      formData.email.trim().toLowerCase();

    const phone =
      formData.phone.trim();

    const password =
      formData.password;

    const confirmPassword =
      formData.confirmPassword;


    if (!name) {

      return "Please enter your name.";

    }


    if (name.length < 2) {

      return "Name must contain at least 2 characters.";

    }


    if (!email) {

      return "Please enter your email.";

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) {

      return "Please enter a valid email address.";

    }


    if (!phone) {

      return "Please enter your phone number.";

    }


    const phoneRegex =
      /^[6-9]\d{9}$/;


    if (!phoneRegex.test(phone)) {

      return "Please enter a valid 10-digit Indian phone number.";

    }


    if (!password) {

      return "Please enter a password.";

    }


    if (password.length < 6) {

      return "Password must contain at least 6 characters.";

    }


    if (password !== confirmPassword) {

      return "Passwords do not match.";

    }


    return null;

  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");


    const validationError =
      validateForm();


    if (validationError) {

      setError(validationError);

      return;

    }


    const registeredUser = {

      name: formData.name.trim(),

      email: formData.email
        .trim()
        .toLowerCase(),

      phone: formData.phone.trim(),

      password: formData.password,

      role: "CUSTOMER",

    };


    try {

      const result =
        register(registeredUser);


      if (!result) {

        setError(
          "Unable to create your account. Please try again."
        );

        return;

      }


      setSuccess(
        "Account created successfully!"
      );


      setTimeout(() => {

        navigate("/");

      }, 1000);

    } catch (err) {

      console.error(
        "Registration error:",
        err
      );

      setError(
        "Something went wrong while creating your account."
      );

    }

  };


  return (

    <>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />


      {/* =================================================
          REGISTER PAGE
      ================================================= */}

      <main className="register-page">

        <div className="register-container">


          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="register-left">

            <div className="register-decoration register-decoration-top"></div>

            <div className="register-decoration register-decoration-bottom"></div>


            <div className="register-left-content">


              {/* BRAND */}

              <div className="register-brand">

                <div className="register-brand-icon">

                  <FaBolt />

                </div>

                <div>

                  <h2>
                    MISHRA ELECTRO
                  </h2>

                  <span>
                    Electrical Store
                  </span>

                </div>

              </div>


              {/* HEADING */}

              <div className="register-welcome">

                <span className="register-eyebrow">
                  CUSTOMER REGISTRATION
                </span>

                <div className="register-eyebrow-line"></div>

                <h1>

                  Create Your
                  <br />

                  Account
                  <br />

                  Today.

                </h1>

                <p>

                  Join Mishra Electro and enjoy a
                  simple and reliable shopping
                  experience for electrical products.

                </p>

              </div>


              {/* FEATURES */}

              <div className="register-features">


                <div className="register-feature">

                  <div className="register-feature-icon">

                    <FaCheckCircle />

                  </div>

                  <div>

                    <strong>
                      Quality Products
                    </strong>

                    <span>
                      Reliable electrical products
                    </span>

                  </div>

                </div>


                <div className="register-feature">

                  <div className="register-feature-icon">

                    <FaCheckCircle />

                  </div>

                  <div>

                    <strong>
                      Easy Ordering
                    </strong>

                    <span>
                      Shop and manage orders easily
                    </span>

                  </div>

                </div>


                <div className="register-feature">

                  <div className="register-feature-icon">

                    <FaCheckCircle />

                  </div>

                  <div>

                    <strong>
                      Trusted Service
                    </strong>

                    <span>
                      Safe and dependable shopping
                    </span>

                  </div>

                </div>


              </div>


              <div className="register-left-footer">

                QUALITY

                <span>•</span>

                TRUST

                <span>•</span>

                RELIABILITY

              </div>


            </div>

          </section>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <section className="register-right">

            <div className="register-form-wrapper">


              {/* HEADER */}

              <div className="register-heading">

                <div className="register-heading-icon">

                  <FaUser />

                </div>

                <div>

                  <span>
                    NEW CUSTOMER
                  </span>

                  <h1>
                    Create Account
                  </h1>

                  <p>
                    Fill in your details to get started.
                  </p>

                </div>

              </div>


              {/* ERROR */}

              {error && (

                <div className="register-message register-error">

                  {error}

                </div>

              )}


              {/* SUCCESS */}

              {success && (

                <div className="register-message register-success">

                  {success}

                </div>

              )}


              {/* FORM */}

              <form
                className="register-form"
                onSubmit={handleSubmit}
              >


                {/* NAME */}

                <div className="register-field">

                  <label htmlFor="name">
                    Full Name
                  </label>

                  <div className="register-input-wrapper">

                    <FaUser />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div className="register-field">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <div className="register-input-wrapper">

                    <FaEnvelope />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />

                  </div>

                </div>


                {/* PHONE */}

                <div className="register-field">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <div className="register-input-wrapper">

                    <FaPhone />

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      autoComplete="tel"
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div className="register-field">

                  <label htmlFor="password">
                    Password
                  </label>

                  <div className="register-input-wrapper">

                    <FaLock />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}

                    </button>

                  </div>

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="register-field">

                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>

                  <div className="register-input-wrapper">

                    <FaLock />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) => !previous
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}

                    </button>

                  </div>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="register-submit"
                >

                  <span>
                    Create Account
                  </span>

                  <FaArrowLeft
                    className="register-submit-arrow"
                  />

                </button>


              </form>


              {/* LOGIN */}

              <div className="register-login">

                <span>
                  Already have an account?
                </span>

                <Link to="/login">
                  Login Here
                </Link>

              </div>


              {/* BACK */}

              <Link
                to="/"
                className="register-back"
              >

                <FaArrowLeft />

                <span>
                  Back to Store
                </span>

              </Link>


            </div>

          </section>


        </div>

      </main>

    </>

  );

}

export default Register;