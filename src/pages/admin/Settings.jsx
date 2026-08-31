import StoreSettings from "../../components/Admin/StoreSettings";
import AdminProfile from "../../components/Admin/AdminProfile";
import SecuritySettings from "../../components/Admin/SecuritySettings";
import PaymentSettings from "../../components/Admin/PaymentSettings";
import ShippingSettings from "../../components/Admin/ShippingSettings";
import NotificationSettings from "../../components/Admin/NotificationSettings";

function Settings() {
  return (
    <div>

      <h2 className="mb-4">
        Settings
      </h2>

      <AdminProfile />

      <StoreSettings />

      <PaymentSettings />

      <ShippingSettings />

      <NotificationSettings />

      <SecuritySettings />

    </div>
  );
}

export default Settings;