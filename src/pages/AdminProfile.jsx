import { Link } from "react-router-dom";

import {
  FaUserShield,
  FaLock,
  FaArrowLeft,
  FaKey,
  FaTachometerAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "../styles/adminProfile.css";


function AdminProfile() {

  const { user } = useAuth();


  return (
    <main className="admin-profile-page">

      <div className="admin-profile-container">


        {/* =================================================
            BACK TO DASHBOARD
        ================================================= */}

        <Link
          to="/admin/dashboard"
          className="admin-profile-back"
        >

          <FaArrowLeft />

          Back to Dashboard

        </Link>


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="admin-profile-header">

          <div className="admin-profile-avatar">

            <FaUserShield />

          </div>


          <div>

            <span className="admin-profile-label">
              ADMINISTRATOR
            </span>

            <h1>
              Admin Profile
            </h1>

            <p>
              Manage your administrator account
            </p>

          </div>

        </div>


        {/* =================================================
            ACCOUNT INFORMATION
        ================================================= */}

        <section className="admin-profile-card">

          <div className="admin-profile-card-header">

            <div className="admin-profile-card-icon">
              <FaUserShield />
            </div>

            <div>

              <h2>
                Account Information
              </h2>

              <p>
                Your administrator account details
              </p>

            </div>

          </div>


          <div className="admin-profile-info">


            {/* NAME */}

            <div className="admin-profile-info-row">

              <span>
                Name
              </span>

              <strong>
                {user?.name || "Administrator"}
              </strong>

            </div>


            {/* EMAIL */}

            <div className="admin-profile-info-row">

              <span>
                Email
              </span>

              <strong>
                {user?.email || "Not available"}
              </strong>

            </div>


            {/* ROLE */}

            <div className="admin-profile-info-row">

              <span>
                Account Type
              </span>

              <strong className="admin-role">
                ADMIN
              </strong>

            </div>


          </div>

        </section>


        {/* =================================================
            SECURITY
        ================================================= */}

        <section className="admin-profile-card">

          <div className="admin-profile-card-header">

            <div className="admin-profile-card-icon">
              <FaLock />
            </div>

            <div>

              <h2>
                Security
              </h2>

              <p>
                Manage your administrator password
              </p>

            </div>

          </div>


          {/* CHANGE PASSWORD */}

          <Link
            to="/change-password"
            className="admin-change-password"
          >

            <FaKey />

            <span>
              Change Password
            </span>

          </Link>


          {/* FORGOT PASSWORD */}

          <Link
            to="/forgot-password"
            className="admin-forgot-password"
          >

            Forgot Password?

          </Link>

        </section>


        {/* =================================================
            DASHBOARD
        ================================================= */}

        <section className="admin-profile-card">

          <div className="admin-profile-card-header">

            <div className="admin-profile-card-icon">
              <FaTachometerAlt />
            </div>

            <div>

              <h2>
                Administration
              </h2>

              <p>
                Return to your store dashboard
              </p>

            </div>

          </div>


          <Link
            to="/admin/dashboard"
            className="admin-dashboard-button"
          >

            <FaTachometerAlt />

            Go to Admin Dashboard

          </Link>

        </section>


      </div>

    </main>
  );
}


export default AdminProfile;