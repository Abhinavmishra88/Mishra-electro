import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";

import "./auth.css";


function LoginForm() {

  const navigate = useNavigate();

  const location = useLocation();

  const {
    login,
  } = useAuth();


  const [showPassword, setShowPassword] =
    useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;


    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };


  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = (e) => {

    e.preventDefault();


    const email =
      formData.email.trim().toLowerCase();

    const password =
      formData.password.trim();


    // ================================================
    // VALIDATION
    // ================================================

    if (!email || !password) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }


    /*
     * ==============================================
     * DEMO LOGIN
     *
     * Admin account:
     * admin@mishraelectro.com
     *
     * Any other email:
     * normal user
     * ==============================================
     */

    const isAdmin =
      email ===
      "admin@mishraelectro.com";


    const userData = {

      name: isAdmin
        ? "Mishra Electro Admin"
        : "Abhinav Mishra",

      email: email,

      role: isAdmin
        ? "admin"
        : "user",
    };


    // ================================================
    // SAVE LOGIN
    // ================================================

    login(userData);


    // ================================================
    // SUCCESS MESSAGE
    // ================================================

    if (isAdmin) {

      toast.success(
        "Admin Login Successful"
      );

    } else {

      toast.success(
        "Login Successful"
      );

    }


    // ================================================
    // REDIRECT
    // ================================================

    const redirectTo =
      location.state?.from?.pathname ||
      "/";


    navigate(
      redirectTo,
      {
        replace: true,
      }
    );

  };


  return (
    <div className="auth-card">

      {/* =========================================
          TITLE
      ========================================= */}

      <h2>
        Welcome Back
      </h2>


      <p>
        Login to your Mishra Electro account
      </p>


      {/* =========================================
          FORM
      ========================================= */}

      <form
        onSubmit={handleSubmit}
      >

        {/* =======================================
            EMAIL
        ======================================= */}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3"
          autoComplete="email"
        />


        {/* =======================================
            PASSWORD
        ======================================= */}

        <div className="password-field mb-3">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            autoComplete="current-password"
          />


          <button
            type="button"
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

            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}

          </button>

        </div>


        {/* =======================================
            OPTIONS
        ======================================= */}

        <div className="auth-options">

          <label>

            <input
              type="checkbox"
              name="remember"
              checked={
                formData.remember
              }
              onChange={handleChange}
            />

            {" "}

            Remember Me

          </label>


          <Link
            to="/forgot-password"
          >
            Forgot Password?
          </Link>

        </div>


        {/* =======================================
            LOGIN BUTTON
        ======================================= */}

        <button
          type="submit"
          className="btn btn-primary w-100 mt-4"
        >
          Login
        </button>

      </form>


      {/* =========================================
          REGISTER
      ========================================= */}

      <p className="text-center mt-4">

        Don't have an account?{" "}

        <Link to="/register">
          Register
        </Link>

      </p>

    </div>
  );
}


export default LoginForm;