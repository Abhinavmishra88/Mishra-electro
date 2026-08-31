import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaStar,
  FaEye,
  FaBolt,
} from "react-icons/fa";

import { useProduct } from "../context/ProductContext";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/product.css";

function Products() {
  const { products = [] } = useProduct();

  const { addToCart, isInCart } = useCart();

  const {
    wishlist = [],
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  /* =========================================
     CATEGORIES
  ========================================= */

  const categories = useMemo(() => {
    const categoryList = products
      .map((product) => product.category)
      .filter(Boolean);

    return [
      "All",
      ...new Set(categoryList),
    ];
  }, [products]);


  /* =========================================
     FILTER + SEARCH + SORT
  ========================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* Search */

    if (search.trim()) {
      const keyword =
        search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name
            ?.toLowerCase()
            .includes(keyword) ||

          product.category
            ?.toLowerCase()
            .includes(keyword) ||

          product.brand
            ?.toLowerCase()
            .includes(keyword) ||

          product.description
            ?.toLowerCase()
            .includes(keyword)
        );
      });
    }


    /* Category */

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
    }


    /* Sorting */

    if (sortBy === "low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sortBy === "high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || "")
        )
      );
    }

    return result;
  }, [
    products,
    search,
    selectedCategory,
    sortBy,
  ]);


  /* =========================================
     WISHLIST
  ========================================= */

  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) =>
        String(item.id) ===
        String(productId)
    );
  };


  const handleWishlist = (product) => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };


  /* =========================================
     CART
  ========================================= */

  const handleAddToCart = (product) => {
    addToCart(product);
  };


  /* =========================================
     IMAGE FALLBACK
  ========================================= */

  const getImage = (product) => {
    return (
      product.image ||
      product.imageUrl ||
      product.productImage ||
      ""
    );
  };


  /* =========================================
     EMPTY PRODUCTS
  ========================================= */

  if (!products.length) {
    return (
      <section className="products-page">

        <div className="products-container">

          <div className="products-empty">

            <div className="products-empty-icon">
              <FaBolt />
            </div>

            <h2>
              No Products Available
            </h2>

            <p>
              Products will appear here
              once they are added to the
              catalog.
            </p>

          </div>

        </div>

      </section>
    );
  }


  return (
    <section className="products-page">

      <div className="products-container">

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="products-header">

          <div className="products-header-content">

            <span className="products-eyebrow">
              MISHRA ELECTRO
            </span>

            <h1>
              Electrical Products
            </h1>

            <p>
              Quality electrical products
              for your home, office and
              commercial needs.
            </p>

          </div>

          <div className="products-count">

            <strong>
              {filteredProducts.length}
            </strong>

            <span>
              Products
            </span>

          </div>

        </div>


        {/* =====================================
            FILTER BAR
        ===================================== */}

        <div className="products-toolbar">

          {/* Search */}

          <div className="products-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Category */}

          <div className="products-filter">

            <label>
              Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>

          </div>


          {/* Sort */}

          <div className="products-filter">

            <label>
              Sort By
            </label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="default">
                Recommended
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="name">
                Name
              </option>
            </select>

          </div>

        </div>


        {/* =====================================
            ACTIVE FILTER
        ===================================== */}

        {(search ||
          selectedCategory !== "All") && (

          <div className="products-active-filter">

            <span>
              Showing{" "}
              <strong>
                {filteredProducts.length}
              </strong>{" "}
              products
            </span>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSortBy("default");
              }}
            >
              Clear Filters
            </button>

          </div>

        )}


        {/* =====================================
            PRODUCTS GRID
        ===================================== */}

        {filteredProducts.length === 0 ? (

          <div className="products-no-results">

            <div className="products-no-results-icon">
              <FaSearch />
            </div>

            <h2>
              No Products Found
            </h2>

            <p>
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              Show All Products
            </button>

          </div>

        ) : (

          <div className="products-grid">

            {filteredProducts.map(
              (product) => {

                const wishlisted =
                  isWishlisted(
                    product.id
                  );

                const added =
                  isInCart(product.id);

                const image =
                  getImage(product);

                return (

                  <article
                    className="product-card"
                    key={product.id}
                  >

                    {/* =========================
                        IMAGE
                    ========================== */}

                    <div className="product-card-image">

                      {/* Wishlist */}

                      <button
                        type="button"
                        className={
                          wishlisted
                            ? "product-wishlist active"
                            : "product-wishlist"
                        }
                        aria-label={
                          wishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        onClick={() =>
                          handleWishlist(
                            product
                          )
                        }
                      >
                        <FaHeart />
                      </button>


                      {/* Category */}

                      {product.category && (
                        <span className="product-card-category">
                          {product.category}
                        </span>
                      )}


                      {image ? (

                        <img
                          src={image}
                          alt={
                            product.name ||
                            "Product"
                          }
                          loading="lazy"
                        />

                      ) : (

                        <div className="product-image-placeholder">
                          <FaBolt />
                          <span>
                            Mishra Electro
                          </span>
                        </div>

                      )}

                    </div>


                    {/* =========================
                        CONTENT
                    ========================== */}

                    <div className="product-card-content">

                      {/* Rating */}

                      <div className="product-card-rating">

                        <span>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>

                        <small>
                          5.0
                        </small>

                      </div>


                      {/* Name */}

                      <h2>
                        {product.name}
                      </h2>


                      {/* Brand */}

                      {product.brand && (

                        <p className="product-card-brand">
                          {product.brand}
                        </p>

                      )}


                      {/* Description */}

                      <p className="product-card-description">

                        {product.description ||
                          "High-quality electrical product designed for reliable everyday use."}

                      </p>


                      {/* Price */}

                      <div className="product-card-price">

                        <strong>
                          ₹
                          {Number(
                            product.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        {product.oldPrice && (

                          <del>
                            ₹
                            {Number(
                              product.oldPrice
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </del>

                        )}

                      </div>


                      {/* =====================
                          ACTIONS
                      ====================== */}

                      <div className="product-card-actions">

                        {/* View */}

                        <Link
                          to={`/products/${product.id}`}
                          className="product-view-button"
                        >
                          <FaEye />
                          View Product
                        </Link>


                        {/* Cart */}

                        <button
                          type="button"
                          className={
                            added
                              ? "product-cart-button added"
                              : "product-cart-button"
                          }
                          onClick={() =>
                            handleAddToCart(
                              product
                            )
                          }
                        >

                          <FaShoppingCart />

                          {added
                            ? "Added"
                            : "Add to Cart"}

                        </button>

                      </div>

                    </div>

                  </article>

                );
              }
            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default Products;