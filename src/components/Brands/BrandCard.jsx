function BrandCard({ brand }) {
  return (
    <div className="brand-card">
      <img src={brand.image} alt={brand.name} />
    </div>
  );
}

export default BrandCard;