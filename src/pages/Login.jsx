import { Link } from "react-router-dom";

import {
  FaUser,
  FaShieldAlt,
  FaArrowRight,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/layouts/Navbar";
import "../styles/login.css";


function Login() {
  return (
    <>
      {/* =====================================================
          COMMON NAVBAR
      ===================================================== */}

      <Navbar />


      {/* =====================================================
          LOGIN PAGE
      ===================================================== */}

      <main className="login-page">

        <div className="login-wrapper">

          {/* ================= LEFT SIDE ================= */}

          <section className="login-left">

            <div className="login-left-decoration login-decoration-top"></div>

            <div className="login-left-decoration login-decoration-bottom"></div>


            <div className="login-left-content">

              {/* BRAND */}

              <div className="login-brand">

                <div className="login-brand-icon">
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


              {/* WELCOME */}

              <div className="login-welcome">

                <span className="login-eyebrow">
                  CUSTOMER PORTAL
                </span>

                <div className="login-eyebrow-line"></div>

                <h1>
                  Welcome Back
                  <br />
                  to Mishra
                  <br />
                  Electro.
                </h1>

                <p>
                  Login to your customer account and
                  continue shopping premium electrical
                  products for your home and office.
                </p>

              </div>


              {/* FEATURES */}

              <div className="login-features">

                <div className="login-feature">

                  <div className="login-feature-icon">
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


                <div className="login-feature">

                  <div className="login-feature-icon">
                    <FaCheckCircle />
                  </div>

                  <div>

                    <strong>
                      Trusted Service
                    </strong>

                    <span>
                      Safe and reliable shopping
                    </span>

                  </div>

                </div>


                <div className="login-feature">

                  <div className="login-feature-icon">
                    <FaCheckCircle />
                  </div>

                  <div>

                    <strong>
                      Easy Shopping
                    </strong>

                    <span>
                      Manage your orders easily
                    </span>

                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div className="login-left-footer">

                QUALITY

                <span>•</span>

                TRUST

                <span>•</span>

                RELIABILITY

              </div>

            </div>

          </section>


          {/* ================= RIGHT SIDE ================= */}

          <section className="login-right">

            <div className="login-content-inner">

              {/* ICON */}

              <div className="login-welcome-icon">
                <FaUser />
              </div>


              {/* HEADING */}

              <div className="login-heading">

                <span>
                  ACCOUNT ACCESS
                </span>

                <h1>
                  Choose your account
                </h1>

                <p>
                  Select how you want to continue
                </p>

              </div>


              {/* ================= CUSTOMER ================= */}

              <Link
                to="/login/user"
                className="login-option user-option"
              >

                <div className="login-option-icon">
                  <FaUser />
                </div>

                <div className="login-option-content">

                  <span className="login-option-label">
                    CUSTOMER ACCOUNT
                  </span>

                  <h3>
                    User Login
                  </h3>

                  <p>
                    Shop products, manage your cart
                    and track your orders.
                  </p>

                </div>

                <div className="login-option-arrow">
                  <FaArrowRight />
                </div>

              </Link>


              {/* ================= ADMIN ================= */}

              <Link
                to="/login/admin"
                className="login-option admin-option"
              >

                <div className="login-option-icon">
                  <FaShieldAlt />
                </div>

                <div className="login-option-content">

                  <span className="login-option-label">
                    ADMINISTRATOR
                  </span>

                  <h3>
                    Admin Login
                  </h3>

                  <p>
                    Manage products, orders,
                    customers and store settings.
                  </p>

                </div>

                <div className="login-option-arrow">
                  <FaArrowRight />
                </div>

              </Link>


              {/* ================= REGISTER ================= */}

              <div className="login-register">

                <span>
                  Don't have an account?
                </span>

                <Link to="/register">
                  Create Account
                </Link>

              </div>


              {/* ================= BACK ================= */}

              <Link
                to="/"
                className="login-back"
              >
                ← Back to Store
              </Link>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}


export default Login;