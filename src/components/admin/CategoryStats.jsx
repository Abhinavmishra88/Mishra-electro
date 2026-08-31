function CategoryStats({ categories }) {
  const featured = categories.filter(
    (item) => item.featured
  ).length;

  return (
    <div className="row mb-4">

      <div className="col-md-4">
        <div className="card text-center p-3">
          <h6>Total Categories</h6>
          <h2>{categories.length}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center p-3">
          <h6>Featured</h6>
          <h2>{featured}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center p-3">
          <h6>Normal</h6>
          <h2>{categories.length - featured}</h2>
        </div>
      </div>

    </div>
  );
}

export default CategoryStats;