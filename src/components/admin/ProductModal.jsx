import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";

const initialForm = {
  name: "",
  category: "",
  brand: "",
  price: "",
  stock: true,
  image: "",
  description: "",
};

function ProductModal({ show, onClose, product }) {
  const { addProduct, updateProduct } = useProducts();

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (product) {
      setForm(product);
    } else {
      setForm(initialForm);
    }
  }, [product, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.brand ||
      !form.category ||
      !form.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (product) {
      updateProduct(form);
    } else {
      addProduct({
        ...form,
        id: Date.now(),
        rating: 5,
        badge: "New",
      });
    }

    setForm(initialForm);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5>
              {product ? "Edit Product" : "Add Product"}
            </h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-md-6">
                <input
                  className="form-control mb-3"
                  placeholder="Product Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control mb-3"
                  placeholder="Brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-select mb-3"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="MCB">MCB</option>
                  <option value="Wire">Wire</option>
                  <option value="LED">LED</option>
                  <option value="Fan">Fan</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">

                <input
                  type="file"
                  className="form-control mb-3"
                  accept="image/*"
                  onChange={handleImageChange}
                />

              </div>

              {form.image && (
                <div className="col-md-12 text-center mb-3">

                  <img
                    src={form.image}
                    alt="Preview"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "contain",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                    }}
                  />

                  <br />

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm mt-3"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        image: "",
                      }))
                    }
                  >
                    Remove Image
                  </button>

                </div>
              )}

              <div className="col-md-12">
                <textarea
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">
                <label className="form-check">

                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="stock"
                    checked={form.stock}
                    onChange={handleChange}
                  />

                  <span className="form-check-label">
                    In Stock
                  </span>

                </label>
              </div>

            </div>

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
              {product ? "Update Product" : "Save Product"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductModal;