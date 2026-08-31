import { Link } from "react-router-dom";
import categories from "../../data/categories";

import "../../styles/categories.css";

function Categories() {
  return (
    <section className="categories-section">

      <div className="container">

        {/* =========================================
            SECTION HEADER
        ========================================= */}

        <div className="categories-title">

          <span className="categories-label">
            SHOP BY CATEGORY
          </span>

          <h2>
            Explore Our Categories
          </h2>

          <p>
            Find the right electrical products for
            your home, office and industrial needs.
          </p>

        </div>


        {/* =========================================
            CATEGORY GRID
        ========================================= */}

        <div className="row g-4">

          {categories.map((category, index) => (

            <div
              className="col-6 col-md-6 col-lg-4 col-xl-3"
              key={category.id}
            >

              <div className="category-card">

                {/* Category Number */}

                <span className="category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>


                {/* Image */}

                <div className="category-image">

                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />

                </div>


                {/* Category Content */}

                <div className="category-content">

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description}
                  </p>


                  {/* Button */}

                  <Link
                    to={`/products?category=${encodeURIComponent(
                      category.name
                    )}`}
                    className="category-button"
                  >
                    <span>
                      View Products
                    </span>

                    <span className="category-button-arrow">
                      →
                    </span>
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* =========================================
            VIEW ALL PRODUCTS
        ========================================= */}

        <div className="categories-footer">

          <Link
            to="/products"
            className="all-categories-button"
          >
            <span>
              Explore All Products
            </span>

            <span>
              →
            </span>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Categories;