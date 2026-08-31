function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="feature-card">
      <div className="feature-icon">
        <Icon />
      </div>

      <h4>{feature.title}</h4>

      <p>{feature.description}</p>
    </div>
  );
}

export default FeatureCard;