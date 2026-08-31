const API_URL = "http://localhost:8080/api/orders";

// =====================================================
// GET ALL ORDERS
// =====================================================
export async function getAllOrders() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let message = "Failed to fetch orders";

    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Ignore empty/non-JSON response
    }

    throw new Error(message);
  }

  return await response.json();
}

// =====================================================
// GET CUSTOMER ORDERS
// =====================================================
export async function getCustomerOrders(email) {
  const response = await fetch(
    `${API_URL}/customer/${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch customer orders";

    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Ignore empty/non-JSON response
    }

    throw new Error(message);
  }

  return await response.json();
}

// =====================================================
// GET SINGLE ORDER
// =====================================================
export async function getOrderById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let message = "Failed to fetch order";

    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Ignore empty/non-JSON response
    }

    throw new Error(message);
  }

  return await response.json();
}

// =====================================================
// UPDATE ORDER STATUS
// =====================================================
export async function updateOrderStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      status: String(status).trim().toUpperCase(),
    }),
  });

  if (!response.ok) {
    let message = "Failed to update order status";

    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Ignore empty/non-JSON response
    }

    throw new Error(message);
  }

  return await response.json();
}

// =====================================================
// UPDATE PAYMENT STATUS
// =====================================================
export async function updatePaymentStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/payment-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      status: String(status).trim().toUpperCase(),
    }),
  });

  if (!response.ok) {
    let message = "Failed to update payment status";

    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Ignore empty/non-JSON response
    }

    throw new Error(message);
  }

  return await response.json();
}

// =====================================================
// DELETE ORDER
// =====================================================
export async function deleteOrder(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let message = "Failed to delete order";

    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Ignore empty/non-JSON response
    }

    throw new Error(message);
  }

  return await response.json();
}