function Brands() {
  const brands = [
    "Anchor",
    "Polycab",
    "RR Kabel",
    "Finolex",
    "Syska",
  ];

  return (
    <section className="py-5">
      <div className="container">

        <div className="text-center mb-5">
          <span className="text-danger fw-bold">
            TRUSTED BRANDS
          </span>

          <h2 className="fw-bold mt-2">
            Our Top Brands
          </h2>

          <p className="text-muted">
            We provide products from trusted electrical brands.
          </p>
        </div>

        <div className="row g-4 justify-content-center">

          {brands.map((brand) => (
            <div
              className="col-6 col-md-4 col-lg-2"
              key={brand}
            >
              <div
                className="border rounded p-4 text-center h-100 bg-white"
              >
                <h5 className="mb-0">
                  {brand}
                </h5>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Brands;