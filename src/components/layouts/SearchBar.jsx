import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "../../styles/searchbar.css";

function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Searching:", search);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button
          type="button"
          className="clear-btn"
          onClick={clearSearch}
        >
          <FaTimes />
        </button>
      )}

      <button type="submit" className="search-btn">
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBar;