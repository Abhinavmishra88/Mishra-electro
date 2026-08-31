import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialProducts from "../data/products";

const ProductContext = createContext(null);

const API_URL = "http://localhost:8080/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =====================================================
  // LOAD PRODUCTS FROM SPRING BOOT
  // =====================================================

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Failed to load products: ${response.status}`
        );
      }

      const backendProducts = await response.json();

      /*
       * Backend products are the main source.
       *
       * If database is empty, show products.js
       * so your existing frontend still displays products.
       */

      if (
        Array.isArray(backendProducts) &&
        backendProducts.length > 0
      ) {
        setProducts(backendProducts);
      } else {
        setProducts(initialProducts);
      }
    } catch (err) {
      console.error("Product loading error:", err);

      setError(err.message);

      /*
       * Fallback to existing frontend products
       */
      setProducts(initialProducts);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // ADD PRODUCT
  // =====================================================

  const addProduct = async (product) => {
    try {
      setError(null);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to add product"
        );
      }

      const savedProduct = await response.json();

      setProducts((currentProducts) => [
        ...currentProducts,
        savedProduct,
      ]);

      return savedProduct;
    } catch (err) {
      console.error("Add product error:", err);

      setError(err.message);

      throw err;
    }
  };

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

  const updateProduct = async (
    productId,
    updatedProduct
  ) => {
    try {
      setError(null);

      const response = await fetch(
        `${API_URL}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to update product"
        );
      }

      const savedProduct = await response.json();

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          String(product.id) === String(productId)
            ? savedProduct
            : product
        )
      );

      return savedProduct;
    } catch (err) {
      console.error("Update product error:", err);

      setError(err.message);

      throw err;
    }
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const deleteProduct = async (productId) => {
    try {
      setError(null);

      const response = await fetch(
        `${API_URL}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to delete product"
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            String(product.id) !==
            String(productId)
        )
      );
    } catch (err) {
      console.error("Delete product error:", err);

      setError(err.message);

      throw err;
    }
  };

  // =====================================================
  // GET PRODUCT BY ID
  // =====================================================

  const getProductById = (productId) => {
    return products.find(
      (product) =>
        String(product.id) ===
        String(productId)
    );
  };

  // =====================================================
  // REFRESH PRODUCTS
  // =====================================================

  const refreshProducts = async () => {
    await loadProducts();
  };

  // =====================================================
  // RESET PRODUCTS
  // =====================================================

  const resetProducts = () => {
    setProducts(initialProducts);
  };

  // =====================================================
  // RESET ALL PRODUCTS
  // =====================================================

  const resetAllProducts = () => {
    setProducts([]);
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {
    products,
    loading,
    error,

    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,

    refreshProducts,
    resetProducts,
    resetAllProducts,
  };

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// =========================================================
// useProduct HOOK
// =========================================================

export function useProduct() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProduct must be used inside ProductProvider"
    );
  }

  return context;
}

// =========================================================
// DEFAULT EXPORT
// =========================================================

export default ProductContext;