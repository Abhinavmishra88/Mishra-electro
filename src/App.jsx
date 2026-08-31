import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================================================
// LAYOUT
// =========================================================
import Navbar from "./components/layouts/Navbar";

// =========================================================
// CUSTOMER PAGES
// =========================================================
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import MyOrders from "./pages/MyOrders";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Addresses from "./pages/Addresses";
import OrderDetails from "./pages/OrderDetails";
// =========================================================
// AUTHENTICATION
// =========================================================
import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminProducts from "./pages/AdminProducts";
import Register from "./pages/Register";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// =========================================================
// DASHBOARDS
// =========================================================
import UserDashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminCategories from "./pages/AdminCategories";
// =========================================================
// PROFILE / PASSWORD
// =========================================================
import AdminProfile from "./pages/AdminProfile";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";

// =========================================================
// CUSTOMER LAYOUT
// =========================================================
function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>
    </>
  );
}

// =========================================================
// 404 PAGE
// =========================================================
function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          fontWeight: "800",
          marginBottom: "10px",
        }}
      >
        404
      </h1>

      <h2>
        Page Not Found
      </h2>

      <p
        style={{
          color: "#666",
          marginBottom: "25px",
        }}
      >
        The page you are looking for does not exist.
      </p>

      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "#94e7d9",
          color: "#111",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "600",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}

// =========================================================
// APP
// =========================================================
function App() {
  return (
    <Routes>

      {/* =====================================================
          HOME
      ===================================================== */}
      <Route
        path="/"
        element={
          <CustomerLayout>
            <Home />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          PRODUCTS
      ===================================================== */}
      <Route
        path="/products"
        element={
          <CustomerLayout>
            <Products />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}
      <Route
        path="/products/:id"
        element={
          <CustomerLayout>
            <ProductDetails />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          WISHLIST
      ===================================================== */}
      <Route
        path="/wishlist"
        element={
          <CustomerLayout>
            <Wishlist />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          CART
      ===================================================== */}
      <Route
        path="/cart"
        element={
          <CustomerLayout>
            <Cart />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          CHECKOUT
      ===================================================== */}
      <Route
        path="/checkout"
        element={
          <CustomerLayout>
            <Checkout />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          CUSTOMER ORDERS
      ===================================================== */}
      <Route
        path="/orders"
        element={
          <CustomerLayout>
            <Orders />
          </CustomerLayout>
        }
      />
      <Route
        path="/my-orders"
        element={<MyOrders />}
      />
      {/* =====================================================
          ORDER SUCCESS
      ===================================================== */}
     <Route
  path="/order-success/:id"
  element={
    <CustomerLayout>
      <OrderSuccess />
    </CustomerLayout>
  }
/>
<Route
    path="/orders/:id"
    element={<OrderDetails />}
/>

      {/* =====================================================
          CONTACT
      ===================================================== */}
      <Route
        path="/contact"
        element={
          <CustomerLayout>
            <Contact />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          CUSTOMER PROFILE
      ===================================================== */}
      <Route
        path="/profile"
        element={
          <CustomerLayout>
            <Profile />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          EDIT PROFILE
      ===================================================== */}
      <Route
        path="/profile/edit"
        element={
          <CustomerLayout>
            <EditProfile />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          ADDRESSES
      ===================================================== */}
      <Route
        path="/profile/addresses"
        element={
          <CustomerLayout>
            <Addresses />
          </CustomerLayout>
        }
      />

      {/* =====================================================
          LOGIN SELECTION
      ===================================================== */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* =====================================================
          CUSTOMER LOGIN
      ===================================================== */}
      <Route
        path="/login/user"
        element={<UserLogin />}
      />

      {/* =====================================================
          CUSTOMER DASHBOARD
      ===================================================== */}
      <Route
        path="/user/dashboard"
        element={<UserDashboard />}
      />

      {/* =====================================================
          REGISTER
      ===================================================== */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* =====================================================
          ADMIN LOGIN
      ===================================================== */}
      <Route
        path="/login/admin"
        element={<AdminLogin />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      {/* =====================================================
          OLD ADMIN LOGIN URL
      ===================================================== */}
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      {/* =====================================================
          ADMIN DASHBOARD
      ===================================================== */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      {/* =====================================================
          ADMIN ORDERS
      ===================================================== */}
      <Route
        path="/admin/orders"
        element={
          <ProtectedAdminRoute>
            <AdminOrders />
          </ProtectedAdminRoute>
        }
      />
      <Route
    path="/orders/:id"
    element={<OrderDetails />}
/>
      <Route
        path="/admin/products"
        element={<AdminProducts />}
      />
      <Route
        path="/admin/customers"
        element={<AdminCustomers />}
      />
      <Route
        path="/admin/categories"
        element={<AdminCategories />}
      />
      {/* =====================================================
          ADMIN PROFILE
      ===================================================== */}
      <Route
        path="/admin/profile"
        element={
          <ProtectedAdminRoute>
            <AdminProfile />
          </ProtectedAdminRoute>
        }
      />

      {/* =====================================================
          CHANGE PASSWORD
          Works for logged-in customer/admin
      ===================================================== */}
      <Route
        path="/change-password"
        element={
          <ChangePassword />
        }
      />

      {/* =====================================================
          ADMIN ROOT
          /admin → /admin/dashboard
      ===================================================== */}
      <Route
        path="/admin"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
      />

      {/* =====================================================
          404
      ===================================================== */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;