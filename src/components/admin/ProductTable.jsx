import { FaEdit, FaTrash } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";

function ProductTable({ search, category, onEdit }) {
  const { products, deleteProduct } = useProducts();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-card">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No products found.
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>

                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    width="60"
                    height="60"
                    style={{ objectFit: "contain" }}
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>{product.brand}</td>

                <td>₹{product.price}</td>

                <td>
                  {product.stock ? (
                    <span className="badge bg-success">In Stock</span>
                  ) : (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(product)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("Delete this product?")) {
                        deleteProduct(product.id);
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
