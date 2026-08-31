function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="stat-card">

      <div
        className="stat-icon"
        style={{ background: item.color }}
      >
        <Icon />
      </div>

      <h2>{item.value}</h2>

      <p>{item.title}</p>

    </div>
  );
}

export default StatCard;