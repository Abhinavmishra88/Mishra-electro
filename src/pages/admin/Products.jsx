import { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import { useProduct } from "../../context/ProductContext";

function Products() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProduct();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
  });

  const filteredProducts = products.filter(
    (product) => {
      const searchText =
        search.toLowerCase();

      return (
        product.name
          ?.toLowerCase()
          .includes(searchText) ||
        product.category
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  const openAddModal = () => {
    setEditingProduct(null);

    setForm({
      name: "",
      category: "",
      price: "",
      oldPrice: "",
      image: "",
      description: "",
    });

    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      image: product.image || "",
      description: product.description || "",
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      oldPrice: form.oldPrice
        ? Number(form.oldPrice)
        : "",
      image: form.image.trim(),
      description:
        form.description.trim(),
    };

    if (!productData.name) {
      return;
    }

    if (!productData.category) {
      return;
    }

    if (!productData.price) {
      return;
    }

    if (editingProduct) {
      updateProduct(
        editingProduct.id,
        productData
      );
    } else {
      addProduct(productData);
    }

    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      deleteProduct(id);
    }
  };

  return (
    <div className="admin-box">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <div>
          <h4 className="fw-bold mb-1">
            Products
          </h4>

          <p className="text-muted mb-0">
            Total Products:{" "}
            {products.length}
          </p>
        </div>

        <div className="d-flex gap-3 flex-wrap">

          {/* Search */}
          <div className="search-box-admin">

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

          {/* Add */}
          <button
            type="button"
            className="btn btn-danger"
            onClick={openAddModal}
          >
            <FaPlus className="me-2" />
            Add Product
          </button>

        </div>

      </div>

      {/* Product Grid */}
      <div className="row g-4">

        {filteredProducts.length === 0 ? (

          <div className="col-12 text-center py-5">

            <h5>
              No products found.
            </h5>

          </div>

        ) : (

          filteredProducts.map(
            (product) => (

              <div
                className="col-xl-3 col-lg-4 col-md-6"
                key={product.id}
              >

                <div className="card border-0 shadow-sm h-100">

                  {/* Image */}
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      height: "200px",
                      padding: "20px",
                      background: "#f8f9fa",
                    }}
                  >

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "160px",
                          objectFit: "contain",
                        }}
                      />

                    ) : (

                      <span className="text-muted">
                        No Image
                      </span>

                    )}

                  </div>

                  {/* Details */}
                  <div className="card-body">

                    <small className="text-muted">
                      {product.category}
                    </small>

                    <h5 className="fw-bold mt-1">
                      {product.name}
                    </h5>

                    <div className="mb-3">

                      <strong className="text-danger">
                        ₹{product.price}
                      </strong>

                      {product.oldPrice && (
                        <del className="text-muted ms-2">
                          ₹{product.oldPrice}
                        </del>
                      )}

                    </div>

                    <div className="d-flex gap-2">

                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          openEditModal(product)
                        }
                      >
                        <FaEdit className="me-1" />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        <FaTrash className="me-1" />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )
          )

        )}

      </div>

      {/* Add/Edit Modal */}
      {showModal && (

        <div
          className="modal fade show d-block"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered">

            <div className="modal-content">

              <form onSubmit={handleSubmit}>

                <div className="modal-header">

                  <h5 className="modal-title">
                    {editingProduct
                      ? "Edit Product"
                      : "Add Product"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      setShowModal(false)
                    }
                  />

                </div>

                <div className="modal-body">

                  <div className="row g-3">

                    {/* Name */}
                    <div className="col-md-6">

                      <label className="form-label">
                        Product Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    {/* Category */}
                    <div className="col-md-6">

                      <label className="form-label">
                        Category
                      </label>

                      <input
                        type="text"
                        name="category"
                        className="form-control"
                        value={form.category}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    {/* Price */}
                    <div className="col-md-6">

                      <label className="form-label">
                        Price
                      </label>

                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={form.price}
                        onChange={handleChange}
                        min="0"
                        required
                      />

                    </div>

                    {/* Old Price */}
                    <div className="col-md-6">

                      <label className="form-label">
                        Old Price
                      </label>

                      <input
                        type="number"
                        name="oldPrice"
                        className="form-control"
                        value={form.oldPrice}
                        onChange={handleChange}
                        min="0"
                      />

                    </div>

                    {/* Image */}
                    <div className="col-12">

                      <label className="form-label">
                        Image URL / Path
                      </label>

                      <input
                        type="text"
                        name="image"
                        className="form-control"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="/images/products/product.png"
                      />

                    </div>

                    {/* Description */}
                    <div className="col-12">

                      <label className="form-label">
                        Description
                      </label>

                      <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                      />

                    </div>

                    {/* Preview */}
                    {form.image && (

                      <div className="col-12 text-center">

                        <img
                          src={form.image}
                          alt="Preview"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "contain",
                          }}
                        />

                      </div>

                    )}

                  </div>

                </div>

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setShowModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-danger"
                  >
                    {editingProduct
                      ? "Update Product"
                      : "Add Product"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;