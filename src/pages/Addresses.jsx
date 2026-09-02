import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/address.css";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://mishra-electro.onrender.com/api/users";

function Addresses() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // =====================================================
  // LOAD USER ADDRESS
  // =====================================================

  useEffect(() => {
    const loadAddress = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/${user.id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load address"
          );
        }

        const savedUser = data.user;

        setFormData({
          address: savedUser.address || "",
          city: savedUser.city || "",
          state: savedUser.state || "",
          pincode: savedUser.pincode || "",
        });

        // Keep AuthContext/localStorage updated
        if (login) {
          login(savedUser);
        }

      } catch (err) {
        console.error("Load address error:", err);

        setError(
          err.message || "Failed to load address"
        );

      } finally {
        setLoading(false);
      }
    };

    loadAddress();
  }, [user?.id]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =====================================================
  // SAVE ADDRESS
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      setError("Please login before saving your address.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Please enter your address.");
      return;
    }

    if (!formData.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!formData.state.trim()) {
      setError("Please enter your state.");
      return;
    }

    if (!formData.pincode.trim()) {
      setError("Please enter your pincode.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setError("Pincode must contain exactly 6 digits.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch(
        `${API_URL}/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: formData.address.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            pincode: formData.pincode.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save address"
        );
      }

      // =================================================
      // UPDATE AUTH CONTEXT + LOCAL STORAGE
      // =================================================

      if (data.user && login) {
        login(data.user);
      }

      // Keep form synchronized with backend response
      setFormData({
        address: data.user?.address || formData.address,
        city: data.user?.city || formData.city,
        state: data.user?.state || formData.state,
        pincode: data.user?.pincode || formData.pincode,
      });

      setMessage(
        "Address saved successfully."
      );

    } catch (err) {
      console.error("Save address error:", err);

      setError(
        err.message || "Failed to save address."
      );

    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // NO USER
  // =====================================================

  if (!user?.id) {
    return (
      <div className="address-page">
        <div className="address-container">

          <div className="address-main">

            <div className="address-header">
              <div className="address-header-content">
                <h1>My Addresses</h1>
                <p>
                  Manage your delivery addresses
                </p>
              </div>

              <button
                type="button"
                className="address-back-button"
                onClick={() =>
                  navigate("/profile")
                }
              >
                <i className="bi bi-arrow-left"></i>
                Back to Profile
              </button>
            </div>

            <div className="address-content">

              <div className="address-empty">

                <div className="address-empty-icon">
                  <i className="bi bi-person-lock"></i>
                </div>

                <h2>
                  Please Login
                </h2>

                <p>
                  Login to manage your delivery address.
                </p>

                <button
                  type="button"
                  className="address-add-button"
                  onClick={() =>
                    navigate("/login/user")
                  }
                >
                  Login
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="address-page">
        <div className="address-container">
          <div className="address-main">

            <div className="address-loading">
              <i className="bi bi-arrow-repeat"></i>
              <p>Loading your address...</p>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="address-page">

      <div className="address-container">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="address-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/profile">
            My Account
          </Link>

          <span>/</span>

          <span>
            Addresses
          </span>

        </div>

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="address-main">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="address-header">

            <div className="address-header-content">

              <h1>
                My Addresses
              </h1>

              <p>
                Manage your delivery address
              </p>

            </div>

            <button
              type="button"
              className="address-back-button"
              onClick={() =>
                navigate("/profile")
              }
            >
              <i className="bi bi-arrow-left"></i>
              Back to Profile
            </button>

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="address-content">

            {/* SUCCESS MESSAGE */}

            {message && (
              <div className="address-success">
                <i className="bi bi-check-circle-fill"></i>
                <span>{message}</span>
              </div>
            )}

            {/* ERROR MESSAGE */}

            {error && (
              <div className="address-error">
                <i className="bi bi-exclamation-circle-fill"></i>
                <span>{error}</span>
              </div>
            )}

            {/* =================================================
                ADDRESS FORM
            ================================================= */}

            <form
              className="address-form"
              onSubmit={handleSubmit}
            >

              {/* ADDRESS */}

              <div className="address-form-group">

                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area"
                  rows="4"
                />

              </div>

              {/* CITY + STATE */}

              <div className="address-form-row">

                <div className="address-form-group">

                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />

                </div>

                <div className="address-form-group">

                  <label htmlFor="state">
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />

                </div>

              </div>

              {/* PINCODE */}

              <div className="address-form-group">

                <label htmlFor="pincode">
                  Pincode
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6 digit pincode"
                />

              </div>

              {/* BUTTONS */}

              <div className="address-form-actions">

                <button
                  type="button"
                  className="address-cancel-button"
                  onClick={() =>
                    navigate("/profile")
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="address-save-button"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <i className="bi bi-arrow-repeat"></i>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg"></i>
                      Save Address
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Addresses;