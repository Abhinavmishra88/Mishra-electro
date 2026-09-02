import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
  FaTimes,
  FaSave,
  FaSyncAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/AdminProducts.css";

const API_URL = "https://mishra-electro.onrender.com/api/products";

const emptyProduct = {
  name: "",
  category: "",
  price: "",
  oldPrice: "",
  image: "",
  stock: "",
  description: "",
  specifications: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState(emptyProduct);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text: "Unable to load products. Make sure Spring Boot is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingId(null);
    setProduct(emptyProduct);
    setShowModal(true);
    setMessage({ type: "", text: "" });
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (item) => {
    setEditingId(item.id);

    setProduct({
      name: item.name || "",
      category: item.category || "",
      price: item.price ?? "",
      oldPrice: item.oldPrice ?? "",
      image: item.image || "",
      stock: item.stock ?? "",
      description: item.description || "",
      specifications: item.specifications || "",
    });

    setShowModal(true);
    setMessage({ type: "", text: "" });
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingId(null);
    setProduct(emptyProduct);
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateProduct = () => {
    if (!product.name.trim()) {
      return "Product name is required.";
    }

    if (!product.category.trim()) {
      return "Category is required.";
    }

    if (
      product.price === "" ||
      product.price === null ||
      Number.isNaN(Number(product.price))
    ) {
      return "Valid product price is required.";
    }

    if (
      product.stock === "" ||
      product.stock === null ||
      Number.isNaN(Number(product.stock))
    ) {
      return "Valid stock quantity is required.";
    }

    return null;
  };

  // =====================================================
  // SAVE PRODUCT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateProduct();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });

      return;
    }

    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const payload = {
        name: product.name.trim(),
        category: product.category.trim(),
        price: Number(product.price),
        oldPrice:
          product.oldPrice === ""
            ? 0
            : Number(product.oldPrice),
        image: product.image.trim(),
        stock: Number(product.stock),
        description: product.description.trim(),
        specifications: product.specifications.trim(),
      };

      const isEditing = editingId !== null;

      const url = isEditing
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Server error:", errorText);

        throw new Error(
          `Unable to ${isEditing ? "update" : "create"} product`
        );
      }

      const savedProduct = await response.json();

      if (isEditing) {
        setProducts((previous) =>
          previous.map((item) =>
            item.id === editingId
              ? savedProduct
              : item
          )
        );

        setMessage({
          type: "success",
          text: "Product updated successfully.",
        });
      } else {
        setProducts((previous) => [
          savedProduct,
          ...previous,
        ]);

        setMessage({
          type: "success",
          text: "Product added successfully.",
        });
      }

      setShowModal(false);
      setEditingId(null);
      setProduct(emptyProduct);
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setMessage({ type: "", text: "" });

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete product");
      }

      setProducts((previous) =>
        previous.filter((item) => item.id !== id)
      );

      setMessage({
        type: "success",
        text: "Product deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text: "Unable to delete product.",
      });
    }
  };

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const categories = [
    ...new Set(
      products
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter((item) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      String(item.name || "")
        .toLowerCase()
        .includes(searchText) ||
      String(item.category || "")
        .toLowerCase()
        .includes(searchText);

    const matchesCategory =
      categoryFilter === "ALL" ||
      item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="admin-products-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="admin-products-header">

        <div>
          <Link
            to="/admin"
            className="admin-products-back"
          >
            <FaArrowLeft />
            Back to Admin
          </Link>

          <div className="admin-products-heading">
            <div className="admin-products-icon">
              <FaBoxOpen />
            </div>

            <div>
              <span>ADMIN PANEL</span>

              <h1>Products</h1>

              <p>
                Manage your store products and inventory.
              </p>
            </div>
          </div>
        </div>

        <button
          className="admin-products-add"
          onClick={openAddModal}
        >
          <FaPlus />
          Add Product
        </button>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="admin-products-container">

        {/* MESSAGE */}

        {message.text && (
          <div
            className={`admin-products-message ${message.type}`}
          >
            <span>{message.text}</span>

            <button
              onClick={() =>
                setMessage({
                  type: "",
                  text: "",
                })
              }
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <div className="admin-products-stats">

          <div className="admin-products-stat">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className="admin-products-stat">
            <span>Categories</span>
            <strong>{categories.length}</strong>
          </div>

          <div className="admin-products-stat">
            <span>In Stock</span>
            <strong>
              {
                products.filter(
                  (item) => Number(item.stock) > 0
                ).length
              }
            </strong>
          </div>

          <div className="admin-products-stat">
            <span>Out of Stock</span>
            <strong>
              {
                products.filter(
                  (item) => Number(item.stock) <= 0
                ).length
              }
            </strong>
          </div>

        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="admin-products-toolbar">

          <div className="admin-products-search">
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

          <select
            className="admin-products-filter"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option value="ALL">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <button
            className="admin-products-refresh"
            onClick={fetchProducts}
            disabled={loading}
          >
            <FaSyncAlt
              className={
                loading
                  ? "admin-products-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <span className="admin-products-count">
            {filteredProducts.length} products
          </span>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        {loading ? (
          <div className="admin-products-loading">
            <FaSyncAlt className="admin-products-spin" />
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="admin-products-empty">

            <FaBoxOpen />

            <h2>No products found</h2>

            <p>
              Add a product or change your search.
            </p>

            <button
              onClick={openAddModal}
              className="admin-products-empty-button"
            >
              <FaPlus />
              Add Product
            </button>

          </div>
        ) : (
          <div className="admin-products-table-wrapper">

            <table className="admin-products-table">

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Old Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <div className="admin-product-info">

                        <div className="admin-product-image">

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <FaBoxOpen />
                          )}

                        </div>

                        <div>
                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            ID: #{item.id}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="admin-product-category">
                        {item.category || "—"}
                      </span>
                    </td>

                    <td>
                      <strong>
                        ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </strong>
                    </td>

                    <td>
                      {Number(item.oldPrice || 0) > 0
                        ? `₹${Number(
                            item.oldPrice
                          ).toLocaleString("en-IN")}`
                        : "—"}
                    </td>

                    <td>
                      <strong>
                        {item.stock ?? 0}
                      </strong>
                    </td>

                    <td>

                      {Number(item.stock) > 0 ? (
                        <span className="admin-product-stock in-stock">
                          In Stock
                        </span>
                      ) : (
                        <span className="admin-product-stock out-stock">
                          Out of Stock
                        </span>
                      )}

                    </td>

                    <td>

                      <div className="admin-product-actions">

                        <button
                          className="admin-product-edit"
                          onClick={() =>
                            openEditModal(item)
                          }
                          title="Edit product"
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="admin-product-delete"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          title="Delete product"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </main>

      {/* =================================================
          PRODUCT MODAL
      ================================================= */}

      {showModal && (
        <div
          className="admin-product-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget &&
              !saving
            ) {
              closeModal();
            }
          }}
        >

          <div className="admin-product-modal">

            {/* MODAL HEADER */}

            <div className="admin-product-modal-header">

              <div>
                <span>
                  {editingId
                    ? "EDIT PRODUCT"
                    : "NEW PRODUCT"}
                </span>

                <h2>
                  {editingId
                    ? "Edit Product"
                    : "Add Product"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="admin-product-form"
            >

              <div className="admin-product-form-grid">

                {/* NAME */}

                <div className="admin-product-field full">
                  <label>
                    Product Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                </div>

                {/* CATEGORY */}

                <div className="admin-product-field">
                  <label>
                    Category *
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="e.g. MCB"
                  />
                </div>

                {/* STOCK */}

                <div className="admin-product-field">
                  <label>
                    Stock *
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                {/* PRICE */}

                <div className="admin-product-field">
                  <label>
                    Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                {/* OLD PRICE */}

                <div className="admin-product-field">
                  <label>
                    Old Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="oldPrice"
                    value={product.oldPrice}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                {/* IMAGE */}

                <div className="admin-product-field full">
                  <label>
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="/images/product.png"
                  />

                  {product.image && (
                    <div className="admin-product-preview">
                      <img
                        src={product.image}
                        alt="Preview"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div className="admin-product-field full">
                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter product description"
                  />
                </div>

                {/* SPECIFICATIONS */}

                <div className="admin-product-field full">
                  <label>
                    Specifications
                  </label>

                  <textarea
                    name="specifications"
                    value={product.specifications}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter product specifications"
                  />
                </div>

              </div>

              {/* FORM FOOTER */}

              <div className="admin-product-modal-footer">

                <button
                  type="button"
                  className="admin-product-cancel"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-product-save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FaSyncAlt className="admin-products-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {editingId
                        ? "Update Product"
                        : "Save Product"}
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminProducts;