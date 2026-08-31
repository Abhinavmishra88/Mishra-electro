import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "../styles/changePassword.css";

function ChangePassword() {

  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isAuthenticated || !user) {

    return (
      <div className="change-password-page">

        <div className="change-password-card">

          <h2>
            Login Required
          </h2>

          <p>
            Please login before changing your password.
          </p>

          <Link
            to="/login"
            className="change-password-button"
          >
            Go to Login
          </Link>

        </div>

      </div>
    );
  }


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setMessage("");


    // ===================================================
    // VALIDATION
    // ===================================================

    if (!currentPassword) {

      setError(
        "Please enter your current password."
      );

      return;
    }


    if (!newPassword) {

      setError(
        "Please enter a new password."
      );

      return;
    }


    if (newPassword.length < 8) {

      setError(
        "New password must contain at least 8 characters."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      setError(
        "New password and confirm password do not match."
      );

      return;
    }


    if (currentPassword === newPassword) {

      setError(
        "New password must be different from your current password."
      );

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/change-password",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: user.email,
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to change password."
        );
      }


      // =================================================
      // SUCCESS
      // =================================================

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage(
        data.message ||
        "Password changed successfully."
      );


    } catch (error) {

      console.error(
        "Change password error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <main className="change-password-page">

      <div className="change-password-card">


        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to={
            user.role === "ADMIN"
              ? "/admin/profile"
              : "/profile"
          }
          className="change-password-back"
        >

          <FaArrowLeft />

          Back to Profile

        </Link>


        {/* =================================================
            ICON
        ================================================= */}

        <div className="change-password-icon">

          <FaLock />

        </div>


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="change-password-heading">

          <span>
            ACCOUNT SECURITY
          </span>

          <h1>
            Change Password
          </h1>

          <p>
            Update your account password securely.
          </p>

        </div>


        {/* =================================================
            SUCCESS
        ================================================= */}

        {message && (

          <div className="change-password-success">

            {message}

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="change-password-error">

            {error}

          </div>

        )}


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="change-password-form"
        >


          {/* CURRENT PASSWORD */}

          <div className="change-password-group">

            <label>
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              placeholder="Enter current password"
              autoComplete="current-password"
              disabled={loading}
              required
            />

          </div>


          {/* NEW PASSWORD */}

          <div className="change-password-group">

            <label>
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              placeholder="Enter new password"
              autoComplete="new-password"
              disabled={loading}
              required
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="change-password-group">

            <label>
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
              disabled={loading}
              required
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="change-password-submit"
            disabled={loading}
          >

            {loading
              ? "Changing Password..."
              : "Change Password"}

          </button>

        </form>


        {/* =================================================
            FORGOT PASSWORD
        ================================================= */}

        <div className="change-password-forgot">

          Forgot your current password?

          <Link to="/forgot-password">
            Reset Password
          </Link>

        </div>

      </div>

    </main>
  );
}

export default ChangePassword;