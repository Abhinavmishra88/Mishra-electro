import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaTags,
  FaSearch,
  FaSyncAlt,
  FaBoxOpen,
  FaTimes,
  FaEye,
} from "react-icons/fa";

import { useProduct } from "../context/ProductContext";

import "../styles/adminCategories.css";

function AdminCategories() {
  // =====================================================
  // PRODUCTS
  // =====================================================

  const {
    products = [],
    loading = false,
  } = useProduct();

  // =====================================================
  // STATE
  // =====================================================

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  // =====================================================
  // CREATE CATEGORIES FROM PRODUCTS
  // =====================================================

  const categories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      const categoryName = String(
        product?.category || ""
      ).trim();

      if (!categoryName) {
        return;
      }

      const categoryKey =
        categoryName.toLowerCase();

      if (!categoryMap.has(categoryKey)) {
        categoryMap.set(categoryKey, {
          name: categoryName,
          products: [],
        });
      }

      categoryMap
        .get(categoryKey)
        .products
        .push(product);
    });

    return Array.from(
      categoryMap.values()
    ).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [products]);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredCategories = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    /*
     * IMPORTANT:
     *
     * Do NOT show categories when there
     * is no search text.
     */

    if (!keyword) {
      return [];
    }

    return categories.filter(
      (category) => {

        // -----------------------------------------------
        // CATEGORY NAME
        // -----------------------------------------------

        const categoryName =
          String(
            category.name || ""
          ).toLowerCase();

        if (
          categoryName.includes(keyword)
        ) {
          return true;
        }

        // -----------------------------------------------
        // PRODUCT SEARCH
        // -----------------------------------------------

        return category.products.some(
          (product) => {

            const productName =
              String(
                product?.name || ""
              ).toLowerCase();

            const productCategory =
              String(
                product?.category || ""
              ).toLowerCase();

            const productBrand =
              String(
                product?.brand || ""
              ).toLowerCase();

            const productDescription =
              String(
                product?.description || ""
              ).toLowerCase();

            const productSlug =
              String(
                product?.slug || ""
              ).toLowerCase();

            return (
              productName.includes(
                keyword
              ) ||

              productCategory.includes(
                keyword
              ) ||

              productBrand.includes(
                keyword
              ) ||

              productDescription.includes(
                keyword
              ) ||

              productSlug.includes(
                keyword
              )
            );
          }
        );
      }
    );
  }, [categories, search]);

  // =====================================================
  // TOTAL PRODUCTS
  // =====================================================

  const totalProducts =
    products.length;

  // =====================================================
  // AVERAGE PRODUCTS PER CATEGORY
  // =====================================================

  const averageProducts =
    categories.length > 0
      ? (
          totalProducts /
          categories.length
        ).toFixed(1)
      : "0";

  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  const clearSearch = () => {
    setSearch("");
    setSelectedCategory(null);
  };

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {
    window.location.reload();
  };

  // =====================================================
  // PRICE
  // =====================================================

  const formatPrice = (price) => {
    return `₹${Number(
      price || 0
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const getImage = (product) => {
    return (
      product?.image ||
      product?.imageUrl ||
      product?.thumbnail ||
      ""
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="admin-categories-page">

        {/* HEADER */}

        <header className="admin-categories-header">

          <div>

            <Link
              to="/admin"
              className="admin-categories-back"
            >
              <FaArrowLeft />

              <span>
                Back to Dashboard
              </span>
            </Link>

            <div className="admin-categories-title">

              <div className="admin-categories-icon">
                <FaTags />
              </div>

              <div>

                <span>
                  PRODUCT MANAGEMENT
                </span>

                <h1>
                  Categories
                </h1>

                <p>
                  Search product categories
                  and their products
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* LOADING */}

        <main className="admin-categories-container">

          <div className="admin-categories-loading">

            <FaSyncAlt className="admin-categories-spin" />

            <p>
              Loading products...
            </p>

          </div>

        </main>

      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="admin-categories-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="admin-categories-header">

        <div>

          {/* BACK */}

          <Link
            to="/admin"
            className="admin-categories-back"
          >

            <FaArrowLeft />

            <span>
              Back to Dashboard
            </span>

          </Link>

          {/* TITLE */}

          <div className="admin-categories-title">

            <div className="admin-categories-icon">
              <FaTags />
            </div>

            <div>

              <span>
                PRODUCT MANAGEMENT
              </span>

              <h1>
                Categories
              </h1>

              <p>
                Search product categories
                and their products
              </p>

            </div>

          </div>

        </div>

        {/* REFRESH */}

        <button
          type="button"
          className="admin-categories-refresh"
          onClick={handleRefresh}
        >

          <FaSyncAlt />

          Refresh

        </button>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="admin-categories-container">

        {/* =================================================
            STATS
        ================================================= */}

        <section className="admin-categories-stats">

          {/* CATEGORY COUNT */}

          <div className="admin-category-stat">

            <div>

              <span>
                Total Categories
              </span>

              <strong>
                {categories.length}
              </strong>

            </div>

            <FaTags />

          </div>

          {/* PRODUCT COUNT */}

          <div className="admin-category-stat">

            <div>

              <span>
                Total Products
              </span>

              <strong>
                {totalProducts}
              </strong>

            </div>

            <FaBoxOpen />

          </div>

          {/* AVERAGE */}

          <div className="admin-category-stat">

            <div>

              <span>
                Average Products / Category
              </span>

              <strong>
                {averageProducts}
              </strong>

            </div>

            <FaTags />

          </div>

        </section>

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="admin-categories-toolbar">

          <div className="admin-categories-search">

            <FaSearch />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search category or product..."
              autoComplete="off"
            />

            {search && (
              <button
                type="button"
                className="admin-categories-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >

                <FaTimes />

              </button>
            )}

          </div>

          {/* COUNT */}

          <div className="admin-categories-count">

            {search.trim() ? (
              <>
                Showing{" "}

                <strong>
                  {filteredCategories.length}
                </strong>

                {" "}matching{" "}

                {filteredCategories.length === 1
                  ? "category"
                  : "categories"}
              </>
            ) : (
              <>
                Search to view categories
              </>
            )}

          </div>

        </section>

        {/* =================================================
            NO SEARCH YET
        ================================================= */}

        {!search.trim() ? (

          <div className="admin-categories-empty">

            <FaSearch />

            <h2>
              Search for a category or product
            </h2>

            <p>
              Enter a category or product name
              above to see matching categories.
            </p>

          </div>

        ) : filteredCategories.length === 0 ? (

          /* =================================================
             NO RESULTS
          ================================================= */

          <div className="admin-categories-empty">

            <FaTags />

            <h2>
              No matching categories
            </h2>

            <p>
              No category or product matches{" "}
              <strong>
                "{search}"
              </strong>
              .
            </p>

            <button
              type="button"
              onClick={clearSearch}
            >
              Clear Search
            </button>

          </div>

        ) : (

          /* =================================================
             SEARCH RESULTS
          ================================================= */

          <section className="admin-category-grid">

            {filteredCategories.map(
              (category) => (

                <article
                  className="admin-category-card"
                  key={category.name}
                >

                  {/* TOP */}

                  <div className="admin-category-card-top">

                    <div className="admin-category-card-icon">

                      <FaTags />

                    </div>

                    <span className="admin-category-product-count">

                      {category.products.length}

                      {" "}

                      {category.products.length ===
                      1
                        ? "Product"
                        : "Products"}

                    </span>

                  </div>

                  {/* CATEGORY */}

                  <h2>
                    {category.name}
                  </h2>

                  {/* PRODUCT COUNT */}

                  <p>

                    {category.products.length}

                    {" "}

                    {category.products.length ===
                    1
                      ? "product"
                      : "products"}

                    {" "}in this category

                  </p>

                  {/* VIEW */}

                  <button
                    type="button"
                    className="admin-category-view"
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                  >

                    <FaEye />

                    View Products

                  </button>

                </article>

              )
            )}

          </section>

        )}

      </main>

      {/* =================================================
          PRODUCT MODAL
      ================================================= */}

      {selectedCategory && (

        <div
          className="admin-category-modal-overlay"
          onClick={() =>
            setSelectedCategory(null)
          }
        >

          <div
            className="admin-category-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="admin-category-modal-header">

              <div>

                <span>
                  CATEGORY
                </span>

                <h2>
                  {selectedCategory.name}
                </h2>

                <p>

                  {
                    selectedCategory
                      .products
                      .length
                  }

                  {" "}

                  {selectedCategory.products
                    .length === 1
                    ? "product"
                    : "products"}

                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedCategory(null)
                }
                aria-label="Close"
              >

                <FaTimes />

              </button>

            </div>

            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="admin-category-modal-body">

              {selectedCategory.products.map(
                (product, index) => {

                  const image =
                    getImage(product);

                  return (
                    <div
                      className="admin-category-product"
                      key={
                        product.id ??
                        `${product.name}-${index}`
                      }
                    >

                      {/* IMAGE */}

                      <div className="admin-category-product-image">

                        {image ? (

                          <img
                            src={image}
                            alt={
                              product.name ||
                              "Product"
                            }
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <FaBoxOpen />

                        )}

                      </div>

                      {/* INFO */}

                      <div className="admin-category-product-info">

                        <strong>
                          {product.name ||
                            "Unnamed Product"}
                        </strong>

                        <small>

                          {product.description ||
                            "No description available"}

                        </small>

                        {product.brand && (
                          <small>
                            Brand:{" "}
                            {product.brand}
                          </small>
                        )}

                      </div>

                      {/* PRICE */}

                      <strong className="admin-category-product-price">

                        {formatPrice(
                          product.price
                        )}

                      </strong>

                    </div>
                  );
                }
              )}

            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="admin-category-modal-footer">

              <button
                type="button"
                onClick={() =>
                  setSelectedCategory(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminCategories;