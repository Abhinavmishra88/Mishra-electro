const API_URL = "https://mishra-electro.onrender.com/api/customers";


// =====================================================
// SEARCH CUSTOMERS
// =====================================================

export async function searchCustomers({
  query = "",
  fromDate = "",
  toDate = "",
  page = 0,
  size = 20,
} = {}) {

  const params = new URLSearchParams();

  if (query.trim() !== "") {
    params.append("query", query.trim());
  }

  if (fromDate) {
    params.append("fromDate", fromDate);
  }

  if (toDate) {
    params.append("toDate", toDate);
  }

  params.append("page", page);
  params.append("size", size);

  const response = await fetch(
    `${API_URL}/search?${params.toString()}`
  );

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      "Server returned an invalid response."
    );
  }

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message ||
      "Failed to search customers."
    );
  }

  return data;
}


// =====================================================
// GET ALL CUSTOMERS
// =====================================================

export async function getCustomers(
  page = 0,
  size = 20
) {

  const params = new URLSearchParams();

  params.append("page", page);
  params.append("size", size);

  const response = await fetch(
    `${API_URL}?${params.toString()}`
  );

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      "Server returned an invalid response."
    );
  }

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message ||
      "Failed to load customers."
    );
  }

  return data;
}