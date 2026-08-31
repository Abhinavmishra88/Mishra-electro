import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";

import "./auth.css";


function RegisterForm() {

  const navigate = useNavigate();

  const {
    register,
  } = useAuth();


  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================================
  // REGISTER
  // =====================================================

  const handleSubmit = (e) => {

    e.preventDefault();


    const fullName =
      formData.fullName.trim();

    const email =
      formData.email.trim().toLowerCase();

    const phone =
      formData.phone.trim();

    const password =
      formData.password;

    const confirmPassword =
      formData.confirmPassword;


    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }


    // =================================================
    // EMAIL VALIDATION
    // =================================================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {

      toast.error(
        "Please enter a valid email address"
      );

      return;
    }


    // =================================================
    // PHONE VALIDATION
    // =================================================

    const phonePattern =
      /^[0-9]{10}$/;

    if (
      !phonePattern.test(phone)
    ) {

      toast.error(
        "Please enter a valid 10-digit phone number"
      );

      return;
    }


    // =================================================
    // PASSWORD LENGTH
    // =================================================

    if (password.length < 6) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }


    // =================================================
    // PASSWORD MATCH
    // =================================================

    if (
      password !== confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }


    // =================================================
    // CREATE USER
    // =================================================

    register({

      name: fullName,

      email: email,

      phone: phone,

      /*
       * IMPORTANT:
       *
       * Every registration is a normal user.
       *
       * Admin accounts must be created
       * separately.
       */

      role: "user",

    });


    // =================================================
    // SUCCESS
    // =================================================

    toast.success(
      "Registration Successful"
    );


    // =================================================
    // REDIRECT
    // =================================================

    navigate("/", {
      replace: true,
    });

  };


  return (
    <div className="auth-card">

      {/* =========================================
          TITLE
      ========================================= */}

      <h2>
        Create Account
      </h2>


      <p>
        Join Mishra Electro today
      </p>


      {/* =========================================
          FORM
      ========================================= */}

      <form
        onSubmit={handleSubmit}
      >

        {/* =======================================
            FULL NAME
        ======================================= */}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="form-control mb-3"
          value={formData.fullName}
          onChange={handleChange}
          autoComplete="name"
        />


        {/* =======================================
            EMAIL
        ======================================= */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />


        {/* =======================================
            PHONE
        ======================================= */}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="form-control mb-3"
          value={formData.phone}
          onChange={handleChange}
          maxLength="10"
          inputMode="numeric"
          autoComplete="tel"
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
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
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
            CONFIRM PASSWORD
        ======================================= */}

        <div className="password-field mb-3">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control"
            value={
              formData.confirmPassword
            }
            onChange={handleChange}
            autoComplete="new-password"
          />


          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (previous) =>
                  !previous
              )
            }
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >

            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}

          </button>

        </div>


        {/* =======================================
            REGISTER BUTTON
        ======================================= */}

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Register
        </button>

      </form>


      {/* =========================================
          LOGIN
      ========================================= */}

      <p className="text-center mt-4">

        Already have an account?{" "}

        <Link to="/login">
          Login
        </Link>

      </p>

    </div>
  );
}


export default RegisterForm;