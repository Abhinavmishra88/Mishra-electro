import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./auth.css";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    toast.success(
      "Password reset link has been sent to your email."
    );

    setEmail("");
  };

  return (
    <div className="auth-card">

      <h2>Forgot Password</h2>

      <p>
        Enter your email address and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          className="form-control mb-4"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Send Reset Link
        </button>

      </form>

      <div className="text-center mt-4">

        <Link to="/login">
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPasswordForm;