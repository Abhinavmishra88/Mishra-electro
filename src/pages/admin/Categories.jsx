import { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import { useCategory } from "../../context/CategoryContext";

import "../../styles/admin.css";

function Categories() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const filteredCategories = categories.filter((category) =>
    category.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingCategory(null);

    setForm({
      name: "",
      image: "",
    });

    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);

    setForm({
      name: category.name || "",
      image: category.image || "",
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

    const categoryData = {
      name: form.name.trim(),
      image: form.image.trim(),
    };

    if (!categoryData.name) {
      return;
    }

    if (editingCategory) {
      updateCategory(
        editingCategory.id,
        categoryData
      );
    } else {
      addCategory(categoryData);
    }

    setForm({
      name: "",
      image: "",
    });

    setEditingCategory(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    deleteCategory(id);
  };

  return (
    <div className="admin-box">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <div>
          <h4 className="fw-bold mb-1">
            Categories
          </h4>

          <p className="text-muted mb-0">
            Total Categories: {categories.length}
          </p>
        </div>

        <div className="d-flex gap-3">

          {/* Search */}
          <div className="search-box-admin">

            <FaSearch />

            <input
              type="text"
              placeholder="Search Category..."
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
            Add Category
          </button>

        </div>

      </div>

      {/* Categories */}
      <div className="row g-4">

        {filteredCategories.length === 0 ? (

          <div className="col-12 text-center py-5">

            <h5>
              No categories found.
            </h5>

            <p className="text-muted">
              Add your first category.
            </p>

          </div>

        ) : (

          filteredCategories.map((category) => (

            <div
              className="col-xl-3 col-lg-4 col-md-6"
              key={category.id}
            >

              <div className="card border-0 shadow-sm h-100">

                {/* Image */}
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: "180px",
                    background: "#f8f9fa",
                    padding: "20px",
                  }}
                >

                  {category.image ? (

                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "140px",
                        objectFit: "contain",
                      }}
                    />

                  ) : (

                    <span className="text-muted">
                      No Image
                    </span>

                  )}

                </div>

                {/* Body */}
                <div className="card-body">

                  <h5 className="fw-bold mb-3">
                    {category.name}
                  </h5>

                  <div className="d-flex gap-2">

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        openEditModal(category)
                      }
                    >
                      <FaEdit className="me-1" />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(category.id)
                      }
                    >
                      <FaTrash className="me-1" />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Add/Edit Modal */}
      {showModal && (

        <div
          className="modal fade show d-block"
          style={{
            backgroundColor:
              "rgba(0, 0, 0, 0.5)",
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <form onSubmit={handleSubmit}>

                {/* Modal Header */}
                <div className="modal-header">

                  <h5 className="modal-title">
                    {editingCategory
                      ? "Edit Category"
                      : "Add Category"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      setShowModal(false)
                    }
                  />

                </div>

                {/* Modal Body */}
                <div className="modal-body">

                  <div className="mb-3">

                    <label className="form-label">
                      Category Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="/assets/category.png"
                    />

                  </div>

                  {/* Preview */}
                  {form.image && (

                    <div className="text-center">

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

                {/* Modal Footer */}
                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCategory(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-danger"
                  >
                    {editingCategory
                      ? "Update Category"
                      : "Add Category"}
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

export default Categories;