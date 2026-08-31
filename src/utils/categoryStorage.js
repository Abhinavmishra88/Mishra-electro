const STORAGE_KEY = "mishra_categories";

/**
 * Get all categories from localStorage
 */
export function getCategories() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading categories:", error);
    return null;
  }
}

/**
 * Save categories to localStorage
 */
export function saveCategories(categories) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(categories)
    );
  } catch (error) {
    console.error("Error saving categories:", error);
  }
}

/**
 * Remove all categories
 */
export function clearCategories() {
  localStorage.removeItem(STORAGE_KEY);
}