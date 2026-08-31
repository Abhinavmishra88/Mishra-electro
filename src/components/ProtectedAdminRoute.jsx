import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";


function ProtectedAdminRoute({ children }) {

  const location =
    useLocation();


  const {
    user,
    loading,
    isAuthenticated,
    isAdmin,
  } = useAuth();


  // =====================================================
  // WAIT FOR AUTHENTICATION TO LOAD
  // =====================================================

  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );

  }


  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isAuthenticated || !user) {

    return (
      <Navigate
        to="/login/admin"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );

  }


  // =====================================================
  // CHECK ADMIN ROLE
  // =====================================================

  if (!isAdmin) {

    console.error(
      "Admin access denied. Current user:",
      user
    );


    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // =====================================================
  // ADMIN AUTHORIZED
  // =====================================================

  return children;

}


export default ProtectedAdminRoute;