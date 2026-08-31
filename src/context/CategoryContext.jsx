import { createContext, useContext, useState } from "react";
import defaultCategories from "../data/categories";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");

    return saved
      ? JSON.parse(saved)
      : defaultCategories;
  });

  const saveCategories = (updated) => {
    setCategories(updated);

    localStorage.setItem(
      "categories",
      JSON.stringify(updated)
    );
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now(),
    };

    saveCategories([
      ...categories,
      newCategory,
    ]);
  };

  const updateCategory = (id, category) => {
    const updated = categories.map((item) =>
      item.id === id
        ? { ...item, ...category }
        : item
    );

    saveCategories(updated);
  };

  const deleteCategory = (id) => {
    const updated = categories.filter(
      (item) => item.id !== id
    );

    saveCategories(updated);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategory must be used inside CategoryProvider"
    );
  }

  return context;
}