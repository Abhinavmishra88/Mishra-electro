function NotificationSettings() {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h4>Notification Settings</h4>

        <label className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            defaultChecked
          />
          <span className="form-check-label">
            Email Notifications
          </span>
        </label>

        <label className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
          />
          <span className="form-check-label">
            SMS Notifications
          </span>
        </label>

      </div>

    </div>
  );
}

export default NotificationSettings;