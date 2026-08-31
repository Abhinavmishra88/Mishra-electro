import { FaEdit, FaTrash } from "react-icons/fa";
import { useCategories } from "../../context/CategoryContext";

function CategoryTable({ search, onEdit }) {
  const { categories, deleteCategory } = useCategories();

  const filtered = categories.filter((category) =>
    category.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-card">

      <table className="table table-hover">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((category) => (

            <tr key={category.id}>

              <td>{category.id}</td>

              <td>{category.name}</td>

              <td>{category.description}</td>

              <td>
                {category.featured ? (
                  <span className="badge bg-success">
                    Yes
                  </span>
                ) : (
                  <span className="badge bg-secondary">
                    No
                  </span>
                )}
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(category)}
                >
                  <FaEdit />
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete category?"
                      )
                    ) {
                      deleteCategory(category.id);
                    }
                  }}
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CategoryTable;