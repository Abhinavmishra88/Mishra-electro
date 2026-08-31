import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialCustomers from "../data/customers";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("customers");

    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      setCustomers(initialCustomers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "customers",
      JSON.stringify(customers)
    );
  }, [customers]);

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status:
                customer.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : customer
      )
    );
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        toggleStatus,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomers = () =>
  useContext(CustomerContext);