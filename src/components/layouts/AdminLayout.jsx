import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "../admin/Topbar";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <Sidebar />

      <main className="admin-content">

        <Topbar title="Admin Panel" />

        <Outlet />

      </main>

    </div>
  );
}

export default AdminLayout;