import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/editProfile.css";

const API_URL = "http://localhost:8080/api/users";

function EditProfile() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profilePicture: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
      profilePicture:
        user.profilePicture ||
        user.profileImage ||
        "",
    });
  }, [user, navigate]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =====================================================
  // PROFILE PICTURE
  // =====================================================

  const handleProfilePicture = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Profile picture must be less than 2 MB.");
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      return;
    }

    setError("");
    setMessage("");

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_SIZE = 800;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setError("Unable to process the image.");
          return;
        }

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const compressedImage =
          canvas.toDataURL("image/jpeg", 0.8);

        const base64Length =
          compressedImage.length -
          "data:image/jpeg;base64,".length;

        const compressedSize =
          (base64Length * 3) / 4;

        if (compressedSize > 2 * 1024 * 1024) {
          setError(
            "Image is still larger than 2 MB. Please choose a smaller image."
          );
          return;
        }

        setFormData((previous) => ({
          ...previous,
          profilePicture: compressedImage,
        }));

        setMessage(
          "Profile picture selected successfully."
        );
      };

      img.onerror = () => {
        setError("Unable to process this image.");
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      setError("Failed to read the selected image.");
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  // =====================================================
  // REMOVE PROFILE PICTURE
  // =====================================================

  const removeProfilePicture = () => {
    setFormData((previous) => ({
      ...previous,
      profilePicture: "",
    }));

    setMessage("Profile picture removed.");
    setError("");
  };

  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const updateProfile = async (userId, userData) => {
    const response = await fetch(
      `${API_URL}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Invalid response from server."
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Failed to update profile."
      );
    }

    return data.user;
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.email.trim()
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (
      formData.phone.trim() &&
      !/^[0-9]{10}$/.test(
        formData.phone.trim()
      )
    ) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (
      formData.pincode.trim() &&
      !/^[0-9]{6}$/.test(
        formData.pincode.trim()
      )
    ) {
      setError(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    if (!user?.id) {
      setError(
        "User ID not found. Please login again."
      );
      return;
    }

    try {
      setSaving(true);

      // =================================================
      // EXACT DATA SENT TO SPRING BOOT
      // =================================================

      const profileData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),

        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),

        profilePicture:
          formData.profilePicture || "",
      };

      console.log(
        "PROFILE DATA BEING SENT:",
        profileData
      );

      // =================================================
      // SAVE TO DATABASE
      // =================================================

      const savedUser = await updateProfile(
        user.id,
        profileData
      );

      console.log(
        "PROFILE DATA RECEIVED:",
        savedUser
      );

      // =================================================
      // UPDATE AUTH CONTEXT + LOCAL STORAGE
      // =================================================

      const updatedUser = {
        ...user,
        ...savedUser,

        name: savedUser?.name ?? profileData.name,
        email:
          savedUser?.email ?? profileData.email,
        phone:
          savedUser?.phone ?? profileData.phone,

        address:
          savedUser?.address ??
          profileData.address,

        city:
          savedUser?.city ??
          profileData.city,

        state:
          savedUser?.state ??
          profileData.state,

        pincode:
          savedUser?.pincode ??
          profileData.pincode,

        profilePicture:
          savedUser?.profilePicture ??
          profileData.profilePicture,

        role:
          savedUser?.role ||
          user.role ||
          "CUSTOMER",
      };

      login(updatedUser);

      // =================================================
      // SUCCESS
      // =================================================

      setMessage(
        "Profile updated successfully."
      );

      // =================================================
      // GO BACK TO PROFILE
      // =================================================

      setTimeout(() => {
        navigate("/profile");
      }, 800);

    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        err.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    navigate("/profile");
  };

  // =====================================================
  // USER CHECK
  // =====================================================

  if (!user) {
    return null;
  }

  // =====================================================
  // PROFILE LETTER
  // =====================================================

  const firstLetter =
    formData.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "U";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">

        {/* BREADCRUMB */}

        <div className="edit-profile-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/profile">
            My Account
          </Link>

          <span>/</span>

          <span>
            Edit Profile
          </span>

        </div>

        {/* CARD */}

        <div className="edit-profile-card">

          {/* HEADER */}

          <div className="edit-profile-header">

            <div className="edit-profile-avatar-wrapper">

              {formData.profilePicture ? (

                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="edit-profile-avatar-image"
                />

              ) : (

                <div className="edit-profile-avatar">
                  {firstLetter}
                </div>

              )}

              <label
                htmlFor="profilePicture"
                className="profile-picture-camera"
                title="Change profile picture"
              >
                <i className="bi bi-camera-fill"></i>
              </label>

              <input
                id="profilePicture"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleProfilePicture}
                hidden
              />

            </div>

            <div className="edit-profile-title">

              <h1>
                Edit Profile
              </h1>

              <p>
                Update your personal information
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            className="edit-profile-form"
            onSubmit={handleSubmit}
          >

            {/* SUCCESS */}

            {message && (
              <div className="edit-profile-success">
                <i className="bi bi-check-circle-fill"></i>

                <span>
                  {message}
                </span>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="edit-profile-error">
                <i className="bi bi-exclamation-circle-fill"></i>

                <span>
                  {error}
                </span>
              </div>
            )}

            {/* PROFILE PICTURE */}

            <div className="profile-picture-controls">

              <div>
                <strong>
                  Profile Picture
                </strong>

                <p>
                  JPG, PNG, WEBP or GIF.
                  Maximum size 2 MB.
                </p>
              </div>

              {formData.profilePicture && (
                <button
                  type="button"
                  className="remove-profile-picture"
                  onClick={removeProfilePicture}
                >
                  <i className="bi bi-trash"></i>
                  Remove
                </button>
              )}

            </div>

            {/* FORM GRID */}

            <div className="edit-profile-grid">

              {/* NAME */}

              <div className="edit-profile-field">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

              </div>

              {/* EMAIL */}

              <div className="edit-profile-field">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />

              </div>

              {/* PHONE */}

              <div className="edit-profile-field">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  autoComplete="tel"
                />

              </div>

              {/* CITY */}

              <div className="edit-profile-field">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />

              </div>

              {/* STATE */}

              <div className="edit-profile-field">

                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                />

              </div>

              {/* PINCODE */}

              <div className="edit-profile-field">

                <label htmlFor="pincode">
                  Pincode
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                />

              </div>

              {/* ADDRESS */}

              <div className="edit-profile-field full-width">

                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows="4"
                />

              </div>

            </div>

            {/* BUTTONS */}

            <div className="edit-profile-actions">

              <button
                type="button"
                className="edit-profile-cancel"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-profile-save"
                disabled={saving}
              >

                {saving ? (
                  <>
                    <i className="bi bi-hourglass-split"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg"></i>
                    Save Changes
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default EditProfile;