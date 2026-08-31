import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaShieldAlt,
    FaUserCircle,
  } from "react-icons/fa";
  
  import { useAuth } from "../../context/AuthContext";
  
  import "./ProfileCard.css";
  
  
  function ProfileCard() {
  
    const {
      user,
      isAdmin,
      isUser,
    } = useAuth();
  
  
    /* =========================================
       NO USER
    ========================================= */
  
    if (!user) {
  
      return (
        <div className="profile-card profile-empty">
  
          <FaUserCircle
            className="profile-empty-icon"
          />
  
          <h3>
            Not Logged In
          </h3>
  
          <p>
            Please login to view your profile.
          </p>
  
        </div>
      );
    }
  
  
    /* =========================================
       USER INFORMATION
    ========================================= */
  
    const name =
      user.name ||
      user.fullName ||
      "User";
  
    const email =
      user.email ||
      "No email available";
  
    const phone =
      user.phone ||
      "No phone number";
  
    const role =
      isAdmin
        ? "Administrator"
        : "Customer";
  
  
    /* =========================================
       AVATAR LETTER
    ========================================= */
  
    const avatarLetter =
      name.charAt(0).toUpperCase();
  
  
    return (
      <div
        className={`profile-card ${
          isAdmin
            ? "profile-admin"
            : "profile-user"
        }`}
      >
  
        {/* =======================================
            PROFILE HEADER
        ======================================= */}
  
        <div className="profile-card-header">
  
          <div className="profile-avatar">
  
            {user.profileImage ? (
  
              <img
                src={user.profileImage}
                alt={name}
              />
  
            ) : (
  
              <span>
                {avatarLetter}
              </span>
  
            )}
  
          </div>
  
  
          <div className="profile-header-info">
  
            <h2>
              {name}
            </h2>
  
            <p>
              {email}
            </p>
  
          </div>
  
        </div>
  
  
        {/* =======================================
            ROLE
        ======================================= */}
  
        <div className="profile-role">
  
          <div className="profile-role-icon">
  
            <FaShieldAlt />
  
          </div>
  
  
          <div>
  
            <span>
              Account Type
            </span>
  
            <strong>
              {role}
            </strong>
  
          </div>
  
        </div>
  
  
        {/* =======================================
            INFORMATION
        ======================================= */}
  
        <div className="profile-information">
  
          {/* Name */}
  
          <div className="profile-info-item">
  
            <div className="profile-info-icon">
              <FaUser />
            </div>
  
            <div>
              <span>
                Full Name
              </span>
  
              <strong>
                {name}
              </strong>
            </div>
  
          </div>
  
  
          {/* Email */}
  
          <div className="profile-info-item">
  
            <div className="profile-info-icon">
              <FaEnvelope />
            </div>
  
            <div>
              <span>
                Email Address
              </span>
  
              <strong>
                {email}
              </strong>
            </div>
  
          </div>
  
  
          {/* Phone */}
  
          <div className="profile-info-item">
  
            <div className="profile-info-icon">
              <FaPhone />
            </div>
  
            <div>
              <span>
                Phone Number
              </span>
  
              <strong>
                {phone}
              </strong>
            </div>
  
          </div>
  
  
          {/* Role */}
  
          <div className="profile-info-item">
  
            <div className="profile-info-icon">
              <FaShieldAlt />
            </div>
  
            <div>
  
              <span>
                Role
              </span>
  
              <strong
                className={
                  isAdmin
                    ? "admin-role-text"
                    : "user-role-text"
                }
              >
                {isAdmin
                  ? "Admin"
                  : "User"}
              </strong>
  
            </div>
  
          </div>
  
        </div>
  
  
        {/* =======================================
            STATUS
        ======================================= */}
  
        <div className="profile-status">
  
          <span className="status-dot"></span>
  
          <span>
            Account Active
          </span>
  
        </div>
  
      </div>
    );
  }
  
  
  export default ProfileCard;