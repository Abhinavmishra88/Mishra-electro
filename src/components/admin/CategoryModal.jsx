import { useEffect, useState } from "react";
import { useCategories } from "../../context/CategoryContext";

const initialForm = {
  name: "",
  description: "",
  featured: false,
};

function CategoryModal({
  show,
  onClose,
  category,
}) {
  const {
    addCategory,
    updateCategory,
  } = useCategories();

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (category) {
      setForm(category);
    } else {
      setForm(initialForm);
    }
  }, [category, show]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!form.name) {
      alert("Category name required");
      return;
    }

    if (category) {
      updateCategory(form);
    } else {
      addCategory(form);
    }

    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{
        background: "rgba(0,0,0,.5)",
      }}
    >
      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>
              {category
                ? "Edit Category"
                : "Add Category"}
            </h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>

          </div>

          <div className="modal-body">

            <input
              className="form-control mb-3"
              placeholder="Category Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <label className="form-check">

              <input
                type="checkbox"
                className="form-check-input"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured: e.target.checked,
                  })
                }
              />

              <span className="form-check-label">
                Featured Category
              </span>

            </label>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CategoryModal;