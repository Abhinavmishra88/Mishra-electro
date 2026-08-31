import { Outlet } from "react-router-dom";

import TopHeader from "../components/Layout/TopHeader";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

function MainLayout() {
  return (
    <>
      <TopHeader />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;