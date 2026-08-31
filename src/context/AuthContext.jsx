import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "user";


// =========================================================
// NORMALIZE USER
// =========================================================

function normalizeUser(userData) {

  if (!userData || typeof userData !== "object") {
    return null;
  }

  if (!userData.email || !userData.role) {
    return null;
  }

  return {
    ...userData,

    email: String(userData.email)
      .trim()
      .toLowerCase(),

    role: String(userData.role)
      .trim()
      .toUpperCase(),
  };
}


// =========================================================
// AUTH PROVIDER
// =========================================================

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // =======================================================
  // LOAD SAVED USER
  // =======================================================

  useEffect(() => {

    try {

      let savedUser =
        localStorage.getItem(AUTH_STORAGE_KEY);


      // ---------------------------------------------------
      // OLD STORAGE SUPPORT
      // ---------------------------------------------------

      if (!savedUser) {

        savedUser =
          localStorage.getItem("mishra_user");

      }


      if (savedUser) {

        const parsedUser =
          JSON.parse(savedUser);

        const normalizedUser =
          normalizeUser(parsedUser);


        if (normalizedUser) {

          localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify(normalizedUser)
          );

          localStorage.removeItem(
            "mishra_user"
          );

          setUser(normalizedUser);

        } else {

          localStorage.removeItem(
            AUTH_STORAGE_KEY
          );

          localStorage.removeItem(
            "mishra_user"
          );

          setUser(null);

        }

      } else {

        setUser(null);

      }

    } catch (error) {

      console.error(
        "Failed to load saved user:",
        error
      );

      localStorage.removeItem(
        AUTH_STORAGE_KEY
      );

      localStorage.removeItem(
        "mishra_user"
      );

      setUser(null);

    } finally {

      setLoading(false);

    }

  }, []);


  // =======================================================
  // LOGIN
  // =======================================================

  const login = (userData) => {

    const normalizedUser =
      normalizeUser(userData);


    if (!normalizedUser) {

      console.error(
        "Invalid login data:",
        userData
      );

      return false;

    }


    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(normalizedUser)
    );


    localStorage.removeItem(
      "mishra_user"
    );


    setUser(normalizedUser);


    return true;

  };


  // =======================================================
  // REGISTER CUSTOMER
  // =======================================================

  const register = (userData) => {

    if (!userData) {

      return false;

    }


    const registeredUser = {

      ...userData,

      email: String(userData.email || "")
        .trim()
        .toLowerCase(),

      role: "CUSTOMER",

    };


    if (!registeredUser.email) {

      return false;

    }


    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(registeredUser)
    );


    localStorage.removeItem(
      "mishra_user"
    );


    setUser(registeredUser);


    return true;

  };


  // =======================================================
  // LOGOUT
  // =======================================================

  const logout = () => {

    localStorage.removeItem(
      AUTH_STORAGE_KEY
    );

    localStorage.removeItem(
      "mishra_user"
    );

    localStorage.removeItem(
      "mishra_admin"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "userRole"
    );


    setUser(null);

  };


  // =======================================================
  // AUTH STATUS
  // =======================================================

  const isAuthenticated =
    Boolean(user);


  // =======================================================
  // ROLE
  // =======================================================

  const isAdmin =
    user?.role === "ADMIN";


  const isCustomer =
    user?.role === "CUSTOMER";


  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const value = {

    user,

    login,

    register,

    logout,

    isAuthenticated,

    isAdmin,

    isCustomer,

    // Backward compatibility
    isUser: isCustomer,

  };


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return null;

  }


  // =======================================================
  // PROVIDER
  // =======================================================

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

}


// =========================================================
// CUSTOM HOOK
// =========================================================

export function useAuth() {

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;

}