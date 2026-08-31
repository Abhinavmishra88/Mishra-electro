import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/auth/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Invalid administrator credentials."
        );
      }

      /*
       * Expected backend response:
       *
       * {
       *   "email": "admin@example.com",
       *   "role": "ADMIN",
       *   ...
       * }
       *
       * If your backend wraps the user:
       * { "user": {...}, "token": "..." }
       * this also handles it.
       */

      const adminUser = data?.user || data;

      const adminData = {
        ...adminUser,
        email:
          adminUser?.email ||
          email.trim().toLowerCase(),
        role: "ADMIN",
      };

      const loggedIn = login(adminData);

      if (!loggedIn) {
        throw new Error("Unable to save administrator login.");
      }

      /*
       * Save token if backend sends one.
       */
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      /*
       * Remember login preference.
       */
      if (rememberMe) {
        localStorage.setItem(
          "adminRememberMe",
          "true"
        );
      } else {
        localStorage.removeItem("adminRememberMe");
      }

      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <div className="admin-login-top">

        <Link
          to="/"
          className="admin-nav-brand"
        >
          <span className="admin-nav-logo">
            ⚡
          </span>

          <span>
            MISHRA ELECTRO
          </span>

          <small>
            Electrical Store
          </small>
        </Link>

        <nav className="admin-nav-links">

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

        <div className="admin-nav-actions">

          <Link to="/">
            ← Back
          </Link>

          <Link to="/">
            ⚡ Home
          </Link>

        </div>

      </div>


      {/* =================================================
          MAIN LOGIN BOX
      ================================================= */}

      <main className="admin-login-container">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <section className="admin-login-left">

          <div className="admin-left-top">

            <div className="admin-brand">

              <div className="admin-brand-icon">
                ⚡
              </div>

              <div className="admin-brand-text">

                <h2>
                  MISHRA ELECTRO
                </h2>

                <p>
                  Electrical Store
                </p>

              </div>

            </div>


            <div className="admin-left-content">

              <div className="admin-portal-label">
                ADMIN PORTAL
              </div>

              <div className="admin-portal-line"></div>

              <h1 className="admin-left-title">
                Manage Your
                <br />
                Business With
                <br />
                <span>
                  Confidence.
                </span>
              </h1>

              <p className="admin-left-description">
                Securely access your administration
                panel to manage products, orders,
                customers and your complete
                electrical store.
              </p>


              {/* FEATURES */}

              <div className="admin-features">

                <div className="admin-feature">

                  <div className="admin-feature-icon">
                    ✓
                  </div>

                  <div className="admin-feature-content">

                    <strong>
                      Product Management
                    </strong>

                    <span>
                      Manage your complete product catalog
                    </span>

                  </div>

                </div>


                <div className="admin-feature">

                  <div className="admin-feature-icon">
                    ✓
                  </div>

                  <div className="admin-feature-content">

                    <strong>
                      Order Management
                    </strong>

                    <span>
                      Track and manage customer orders
                    </span>

                  </div>

                </div>


                <div className="admin-feature">

                  <div className="admin-feature-icon">
                    ✓
                  </div>

                  <div className="admin-feature-content">

                    <strong>
                      Customer Management
                    </strong>

                    <span>
                      View and manage your customers
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* LEFT FOOTER */}

          <div className="admin-left-footer">
            QUALITY
            <span>•</span>
            TRUST
            <span>•</span>
            RELIABILITY
          </div>

        </section>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <section className="admin-login-right">

          <div className="admin-login-form-wrapper">

            {/* LOGIN ICON */}

            <div className="admin-login-icon">
              <i className="bi bi-person"></i>
            </div>


            {/* HEADER */}

            <div className="admin-login-label">
              ACCOUNT ACCESS
            </div>

            <h1 className="admin-login-title">
              Admin Login
            </h1>

            <p className="admin-login-description">
              Enter your administrator credentials
              to continue.
            </p>


            {/* ERROR */}

            {error && (
              <div className="admin-login-error">
                <i className="bi bi-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}


            {/* FORM */}

            <form
              className="admin-login-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div className="admin-form-group">

                <label
                  htmlFor="admin-email"
                  className="admin-form-label"
                >
                  Email Address
                </label>

                <div className="admin-input-wrapper">

                  <i className="bi bi-envelope admin-input-icon"></i>

                  <input
                    id="admin-email"
                    type="email"
                    className="admin-form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="admin-form-group">

                <label
                  htmlFor="admin-password"
                  className="admin-form-label"
                >
                  Password
                </label>

                <div className="admin-input-wrapper">

                  <i className="bi bi-lock admin-input-icon"></i>

                  <input
                    id="admin-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="admin-form-input admin-password-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                  />


                  {/* EYE / HIDE */}

                  <button
                    type="button"
                    className="admin-password-toggle"
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
                  >
                    <i
                      className={
                        showPassword
                          ? "bi bi-eye-slash"
                          : "bi bi-eye"
                      }
                    ></i>
                  </button>

                </div>

              </div>


              {/* OPTIONS */}

              <div className="admin-login-options">

                <label className="admin-remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    Remember me
                  </span>

                </label>


                <div className="admin-secure-login">

                  <i className="bi bi-shield-check"></i>

                  <span>
                    Secure Login
                  </span>

                </div>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="admin-login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="admin-spinner"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span>
                      Sign In to Admin Panel
                    </span>

                    <i className="bi bi-arrow-right"></i>
                  </>
                )}

              </button>

            </form>


            {/* BACK */}

            <div className="admin-back-store">

              <Link to="/">
                ← Back to Mishra Electro
              </Link>

            </div>


            {/* DIVIDER */}

            <div className="admin-login-divider"></div>


            {/* PROTECTED AREA */}

            <div className="admin-protected-area">

              <div className="admin-protected-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <div className="admin-protected-content">

                <strong>
                  Protected Area
                </strong>

                <span>
                  This area is restricted to
                  authorized administrators only.
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}