import "./Dashboard.css";

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="stats-card">
      <div
        className="stats-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div>
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

export default StatsCard;