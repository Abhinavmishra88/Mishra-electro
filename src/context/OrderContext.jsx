import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders =
        localStorage.getItem("mishra_orders");

      return savedOrders
        ? JSON.parse(savedOrders)
        : [];
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      return [];
    }
  });

  // Save orders whenever they change
  useEffect(() => {
    localStorage.setItem(
      "mishra_orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // Add new order
  const addOrder = (order) => {
    if (!order) return;

    const newOrder = {
      ...order,

      id:
        order.id ||
        `ORD-${Date.now()}`,

      status:
        order.status || "Pending",

      date:
        order.date ||
        new Date().toISOString(),
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);
  };

  // Update order status
  const updateOrderStatus = (
    orderId,
    status
  ) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  };

  // Delete order
  const removeOrder = (orderId) => {
    setOrders((currentOrders) =>
      currentOrders.filter(
        (order) => order.id !== orderId
      )
    );
  };

  // Get single order
  const getOrderById = (orderId) => {
    return orders.find(
      (order) => order.id === orderId
    );
  };

  // Get customer's orders
  const getUserOrders = (email) => {
    if (!email) return [];

    return orders.filter(
      (order) =>
        order.customer?.email === email
    );
  };

  // Clear all orders
  const clearOrders = () => {
    setOrders([]);
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    removeOrder,
    getOrderById,
    getUserOrders,
    clearOrders,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context =
    useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder must be used inside OrderProvider"
    );
  }

  return context;
}

export default OrderContext;