import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // =========================================================
  // STATE
  // =========================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // -----------------------------------------------------
      // API REQUEST
      // -----------------------------------------------------

      const response = await fetch(
        "https://mishra-electro.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            email: cleanEmail,
            password: password,
          }),
        }
      );

      // -----------------------------------------------------
      // READ RESPONSE
      // -----------------------------------------------------

      let data = {};

      const contentType =
        response.headers.get("content-type");

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        data = await response.json();
      } else {
        const text = await response.text();

        data = {
          message: text,
        };
      }

      console.log("Login API Status:", response.status);
      console.log("Login API Response:", data);

      // -----------------------------------------------------
      // API ERROR
      // -----------------------------------------------------

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Login failed. Please check your email and password."
        );
      }

      // -----------------------------------------------------
      // CHECK RESPONSE
      // -----------------------------------------------------

      if (!data || !data.email) {
        throw new Error(
          "Invalid response received from server."
        );
      }

      // -----------------------------------------------------
      // NORMALIZE USER
      // -----------------------------------------------------

      const loggedInUser = {
        ...data,

        email: String(data.email)
          .trim()
          .toLowerCase(),

        role: String(data.role || "CUSTOMER")
          .trim()
          .toUpperCase(),
      };

      // -----------------------------------------------------
      // CUSTOMER CHECK
      // -----------------------------------------------------

      if (loggedInUser.role !== "CUSTOMER") {
        throw new Error(
          "This account is not a customer account."
        );
      }

      // -----------------------------------------------------
      // SAVE USER IN AUTH CONTEXT
      //
      // IMPORTANT:
      // Do NOT require login() to return true.
      // AuthContext may save the user without returning anything.
      // -----------------------------------------------------

      login(loggedInUser);

      // -----------------------------------------------------
      // REMEMBER ME
      // -----------------------------------------------------

      if (rememberMe) {
        localStorage.setItem(
          "rememberMe",
          "true"
        );
      } else {
        localStorage.removeItem(
          "rememberMe"
        );
      }

      // Save user information as an additional backup.
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      setError("");

      console.log(
        "Customer login successful:",
        loggedInUser
      );

      // -----------------------------------------------------
      // REDIRECT
      // -----------------------------------------------------

      navigate("/", {
        replace: true,
      });

    } catch (err) {
      console.error(
        "Customer login error:",
        err
      );

      setError(
        err?.message ||
          "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="user-login-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="user-login-header">

        <div className="user-login-logo">

          <span className="logo-icon">
            ⚡
          </span>

          <span className="logo-text">
            MISHRA ELECTRO
          </span>

        </div>

        <nav className="user-login-nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

        </nav>

        <div className="user-login-header-icons">

          <span>
            🔍
          </span>

          <Link
            to="/wishlist"
            className="header-icon-link"
          >
            ♡
          </Link>

          <Link
            to="/cart"
            className="header-icon-link"
          >
            🛒
          </Link>

        </div>

      </header>


      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <main className="user-login-main">

        {/* TOP NAVIGATION */}

        <div className="user-login-topbar">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <Link
            to="/"
            className="home-link"
          >
            ⚡ Home
          </Link>

        </div>


        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <section className="user-login-card">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="user-login-left">

            <div className="left-brand">

              <div className="left-brand-logo">
                ⚡ MISHRA ELECTRO
              </div>

              <div className="left-brand-subtitle">
                Electrical Store
              </div>

            </div>


            <div className="portal-label">
              CUSTOMER PORTAL
            </div>


            <h1>
              Start Your
              <br />
              Journey With
              <br />
              Mishra Electro.
            </h1>


            <p className="left-description">
              Your trusted destination for
              quality electrical products,
              easy ordering and reliable
              service.
            </p>


            {/* FEATURES */}

            <div className="customer-features">

              <div className="feature-item">
                <span>✓</span>
                <span>
                  Quality Products
                </span>
              </div>

              <div className="feature-item">
                <span>✓</span>
                <span>
                  Easy Ordering
                </span>
              </div>

              <div className="feature-item">
                <span>✓</span>
                <span>
                  Order Tracking
                </span>
              </div>

            </div>


            <div className="left-bottom">

              <div>
                QUALITY • TRUST
              </div>

              <div>
                • RELIABILITY
              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="user-login-right">

            <div className="login-form-wrapper">

              {/* USER ICON */}

              <div className="login-user-icon">
                👤
              </div>


              {/* TITLE */}

              <div className="account-label">
                ACCOUNT ACCESS
              </div>


              <h2>
                Customer Login
              </h2>


              <p className="login-subtitle">
                Sign in to your account
                to continue shopping.
              </p>


              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="login-error">

                  <span>
                    ⚠
                  </span>

                  <span>
                    {error}
                  </span>

                </div>
              )}


              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleLogin}
                noValidate
              >

                {/* EMAIL */}

                <div className="form-group">

                  <label htmlFor="user-email">
                    Email Address
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      ✉
                    </span>

                    <input
                      id="user-email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={loading}
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div className="form-group">

                  <label htmlFor="user-password">
                    Password
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      🔒
                    </span>

                    <input
                      id="user-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                    />

                    {/* SHOW / HIDE PASSWORD */}

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (previous) =>
                            !previous
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      title={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      disabled={loading}
                    >
                      {showPassword ? "◉" : "◌"}
                    </button>

                  </div>

                </div>


                {/* REMEMBER + SECURE */}

                <div className="login-options">

                  <label className="remember-option">

                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(
                          event.target.checked
                        )
                      }
                      disabled={loading}
                    />

                    <span>
                      Remember me
                    </span>

                  </label>


                  <span className="secure-login">
                    🛡 Secure Login
                  </span>

                </div>


                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="login-submit-button"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span className="login-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span>→</span>
                    </>
                  )}

                </button>

              </form>


              {/* FORGOT PASSWORD */}

              <div className="forgot-password">

                <Link to="/forgot-password">
                  Forgot your password?
                </Link>

              </div>


              {/* REGISTER */}

              <div className="create-account">

                <span>
                  Don't have an account?
                </span>

                <Link to="/register">
                  Create Account
                </Link>

              </div>


              {/* BACK */}

              <Link
                to="/"
                className="back-to-store"
              >
                ← Back to Mishra Electro
              </Link>


              {/* PROTECTED AREA */}

              <div className="protected-area">

                <span>
                  ✓
                </span>

                <span>
                  Protected Area
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default UserLogin;