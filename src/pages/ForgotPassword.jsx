import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  FaLock,
  FaArrowLeft,
  FaKey,
} from "react-icons/fa";

import "../styles/forgotPassword.css";

function ResetPassword() {

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const tokenFromUrl =
    searchParams.get("token") || "";


  const [token, setToken] =
    useState(tokenFromUrl);

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

  const [success, setSuccess] =
    useState(false);


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

    if (!token.trim()) {

      setError(
        "Please enter your reset token."
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
        "Passwords do not match."
      );

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        "https://mishra-electro.onrender.com/api/auth/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token: token.trim(),
            newPassword: newPassword,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to reset password."
        );
      }


      // =================================================
      // SUCCESS
      // =================================================

      setMessage(
        data.message ||
        "Password reset successfully."
      );

      setSuccess(true);

      setNewPassword("");
      setConfirmPassword("");


    } catch (error) {

      console.error(
        "Reset password error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <main className="reset-password-page">

      <div className="reset-password-card">


        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/login"
          className="reset-password-back"
        >

          <FaArrowLeft />

          Back to Login

        </Link>


        {/* =================================================
            ICON
        ================================================= */}

        <div className="reset-password-icon">

          {success ? (
            <FaKey />
          ) : (
            <FaLock />
          )}

        </div>


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="reset-password-heading">

          <span>
            ACCOUNT RECOVERY
          </span>

          <h1>
            Reset Password
          </h1>

          <p>
            Enter your reset token and create
            a new password for your account.
          </p>

        </div>


        {/* =================================================
            SUCCESS
        ================================================= */}

        {message && (

          <div className="reset-password-success">

            {message}

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="reset-password-error">

            {error}

          </div>

        )}


        {!success ? (

          <form
            onSubmit={handleSubmit}
            className="reset-password-form"
          >


            {/* =================================================
                TOKEN
            ================================================= */}

            <div className="reset-password-group">

              <label htmlFor="reset-token">
                Reset Token
              </label>

              <div className="reset-password-input">

                <FaKey />

                <input
                  id="reset-token"
                  type="text"
                  placeholder="Enter reset token"
                  value={token}
                  onChange={(event) =>
                    setToken(
                      event.target.value
                    )
                  }
                  disabled={loading}
                  required
                />

              </div>

            </div>


            {/* =================================================
                NEW PASSWORD
            ================================================= */}

            <div className="reset-password-group">

              <label htmlFor="new-password">
                New Password
              </label>

              <div className="reset-password-input">

                <FaLock />

                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />

              </div>

            </div>


            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="reset-password-group">

              <label htmlFor="confirm-password">
                Confirm New Password
              </label>

              <div className="reset-password-input">

                <FaLock />

                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />

              </div>

            </div>


            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              className="reset-password-submit"
              disabled={loading}
            >

              {loading
                ? "Resetting Password..."
                : "Reset Password"}

            </button>

          </form>

        ) : (

          /* =================================================
             SUCCESS ACTION
          ================================================= */

          <div className="reset-password-complete">

            <p>
              Your password has been changed successfully.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
              className="reset-password-login-button"
            >
              Go to Login
            </button>

          </div>

        )}


        {/* =================================================
            FOOTER
        ================================================= */}

        {!success && (

          <div className="reset-password-footer">

            Don't have a reset token?

            <Link to="/forgot-password">
              Request a new one
            </Link>

          </div>

        )}

      </div>

    </main>
  );
}

export default ResetPassword;