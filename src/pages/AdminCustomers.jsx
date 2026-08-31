import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaUsers,
  FaSearch,
  FaSyncAlt,
  FaEye,
  FaTimes,
  FaShoppingBag,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  getCustomers,
  searchCustomers,
  getCustomerById,
} from "../services/customerService";

import "../styles/adminCustomers.css";


// =====================================================
// ADMIN CUSTOMERS
// =====================================================

const AdminCustomers = () => {

  // =====================================================
  // CUSTOMER LIST
  // =====================================================

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // SEARCH
  // =====================================================

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");


  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] = useState(0);

  const [pageSize] = useState(20);

  const [totalElements, setTotalElements] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [hasNext, setHasNext] =
    useState(false);

  const [hasPrevious, setHasPrevious] =
    useState(false);


  // =====================================================
  // CUSTOMER DETAILS
  // =====================================================

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [customerOrders, setCustomerOrders] =
    useState([]);

  const [customerLoading, setCustomerLoading] =
    useState(false);


  // =====================================================
  // LOAD CUSTOMERS
  // =====================================================

  const loadCustomers = async (
    requestedPage = 0,
    customSearch = search,
    customFromDate = fromDate,
    customToDate = toDate
  ) => {

    try {

      setLoading(true);

      setError("");


      // =================================================
      // CHECK FILTERS
      // =================================================

      const hasFilters =
        Boolean(
          customSearch?.trim() ||
          customFromDate ||
          customToDate
        );


      let data;


      // =================================================
      // SEARCH
      // =================================================

      if (hasFilters) {

        data = await searchCustomers({

          query:
            customSearch?.trim() || "",

          fromDate:
            customFromDate || "",

          toDate:
            customToDate || "",

          page:
            requestedPage,

          size:
            pageSize,
        });


      } else {

        // ===============================================
        // GET ALL
        // ===============================================

        data = await getCustomers(
          requestedPage,
          pageSize
        );
      }


      // =================================================
      // VALIDATE RESPONSE
      // =================================================

      if (!data?.success) {

        throw new Error(
          data?.message ||
          "Failed to load customers"
        );
      }


      // =================================================
      // CUSTOMER DATA
      // =================================================

      const customerList =
        Array.isArray(data.customers)
          ? data.customers
          : [];


      setCustomers(
        customerList
      );


      // =================================================
      // PAGINATION DATA
      // =================================================

      setPage(
        Number.isInteger(data.page)
          ? data.page
          : requestedPage
      );


      setTotalElements(
        Number(
          data.totalElements || 0
        )
      );


      setTotalPages(
        Number(
          data.totalPages || 0
        )
      );


      setHasNext(
        Boolean(
          data.hasNext
        )
      );


      setHasPrevious(
        Boolean(
          data.hasPrevious
        )
      );


    } catch (err) {

      console.error(
        "Admin Customers Error:",
        err
      );


      setCustomers([]);

      setTotalElements(0);

      setTotalPages(0);

      setHasNext(false);

      setHasPrevious(false);


      setError(
        err?.message ||
        "Unable to load customers"
      );


    } finally {

      setLoading(false);
    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadCustomers(
      0,
      "",
      "",
      ""
    );

  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {

    // -----------------------------------------------
    // DATE VALIDATION
    // -----------------------------------------------

    if (
      fromDate &&
      toDate &&
      fromDate > toDate
    ) {

      setError(
        "From date cannot be after To date."
      );

      return;
    }


    setPage(0);


    loadCustomers(
      0,
      search,
      fromDate,
      toDate
    );
  };


  // =====================================================
  // ENTER KEY SEARCH
  // =====================================================

  const handleSearchKeyDown = (
    event
  ) => {

    if (
      event.key === "Enter"
    ) {

      handleSearch();
    }
  };


  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  const handleClearSearch = () => {

    setSearch("");

    setFromDate("");

    setToDate("");

    setPage(0);

    setError("");


    loadCustomers(
      0,
      "",
      "",
      ""
    );
  };


  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {

    loadCustomers(
      page,
      search,
      fromDate,
      toDate
    );
  };


  // =====================================================
  // PREVIOUS PAGE
  // =====================================================

  const handlePreviousPage = () => {

    if (
      !hasPrevious ||
      page <= 0 ||
      loading
    ) {

      return;
    }


    const previousPage =
      page - 1;


    loadCustomers(
      previousPage,
      search,
      fromDate,
      toDate
    );
  };


  // =====================================================
  // NEXT PAGE
  // =====================================================

  const handleNextPage = () => {

    if (
      !hasNext ||
      loading
    ) {

      return;
    }


    const nextPage =
      page + 1;


    loadCustomers(
      nextPage,
      search,
      fromDate,
      toDate
    );
  };


  // =====================================================
  // VIEW CUSTOMER
  // =====================================================

  const handleViewCustomer = async (
    customerId
  ) => {

    if (
      customerId === null ||
      customerId === undefined ||
      customerId === ""
    ) {

      setError(
        "Customer ID is missing."
      );

      return;
    }


    try {

      setCustomerLoading(true);

      setError("");

      setSelectedCustomer(null);

      setCustomerOrders([]);


      // =================================================
      // GET CUSTOMER
      // =================================================

      const data =
        await getCustomerById(
          customerId
        );


      if (!data?.success) {

        throw new Error(
          data?.message ||
          "Failed to load customer details"
        );
      }


      // =================================================
      // CUSTOMER
      // =================================================

      const customer =
        data.customer || null;


      if (!customer) {

        throw new Error(
          "Customer information was not returned."
        );
      }


      // =================================================
      // ORDERS
      // =================================================

      const orders =
        Array.isArray(data.orders)
          ? data.orders
          : [];


      setSelectedCustomer(
        customer
      );


      setCustomerOrders(
        orders
      );


    } catch (err) {

      console.error(
        "Customer Details Error:",
        err
      );


      setError(
        err?.message ||
        "Unable to load customer details"
      );


    } finally {

      setCustomerLoading(false);
    }
  };


  // =====================================================
  // CLOSE CUSTOMER DETAILS
  // =====================================================

  const closeCustomerDetails = () => {

    setSelectedCustomer(null);

    setCustomerOrders([]);

    setCustomerLoading(false);
  };


  // =====================================================
  // CUSTOMER TOTAL SPENT
  // =====================================================

  const customerTotalSpent =
    customerOrders.reduce(
      (sum, order) => {

        return (
          sum +
          Number(
            order?.total || 0
          )
        );

      },
      0
    );


  // =====================================================
  // CUSTOMER TOTAL ORDERS
  // =====================================================

  const customerTotalOrders =
    customerOrders.length;


  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (
    amount
  ) => {

    return `₹${Number(
      amount || 0
    ).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    )}`;
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "—";
    }


    try {

      const parsedDate =
        new Date(date);


      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {

        return "—";
      }


      return parsedDate.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );


    } catch {

      return "—";
    }
  };


  // =====================================================
  // CUSTOMER ORDER COUNT
  // =====================================================

  const getCustomerOrderCount = (
    customer
  ) => {

    if (
      customer?.totalOrders !==
      undefined &&
      customer?.totalOrders !== null
    ) {

      return customer.totalOrders;
    }


    if (
      Array.isArray(
        customer?.orders
      )
    ) {

      return customer.orders.length;
    }


    return "—";
  };


  // =====================================================
  // CUSTOMER TOTAL SPENT
  // =====================================================

  const getCustomerTotalSpent = (
    customer
  ) => {

    if (
      customer?.totalSpent !==
      undefined &&
      customer?.totalSpent !== null
    ) {

      return formatCurrency(
        customer.totalSpent
      );
    }


    return "—";
  };


  // =====================================================
  // PAGE RANGE
  // =====================================================

  const firstCustomerNumber =
    totalElements === 0
      ? 0
      : page * pageSize + 1;


  const lastCustomerNumber =
    Math.min(
      (page + 1) * pageSize,
      totalElements
    );


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="admin-customers-page">

      {/* =================================================
          HEADER
         ================================================= */}

      <header className="admin-customers-header">

        <div>

          <Link
            to="/admin"
            className="admin-customers-back"
          >

            <FaArrowLeft />

            Back to Dashboard

          </Link>


          <div className="admin-customers-title">

            <div className="admin-customers-icon">

              <FaUsers />

            </div>


            <div>

              <span>
                CUSTOMER MANAGEMENT
              </span>

              <h1>
                Customers
              </h1>

              <p>
                View and manage your customers
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            REFRESH
           ================================================= */}

        <button
          type="button"
          className="admin-customers-refresh"
          onClick={handleRefresh}
          disabled={loading}
        >

          <FaSyncAlt
            className={
              loading
                ? "admin-customers-spin"
                : ""
            }
          />

          Refresh

        </button>

      </header>


      {/* =================================================
          MAIN
         ================================================= */}

      <main className="admin-customers-container">


        {/* =================================================
            ERROR
           ================================================= */}

        {error && (

          <div className="admin-customers-error">

            <span>
              {error}
            </span>


            <button
              type="button"
              onClick={() => {

                setError("");

                loadCustomers(
                  page,
                  search,
                  fromDate,
                  toDate
                );

              }}
            >

              Try Again

            </button>

          </div>

        )}


        {/* =================================================
            STATS
           ================================================= */}

        <section className="admin-customers-stats">


          {/* TOTAL CUSTOMERS */}

          <div className="admin-customer-stat">

            <div>

              <span>
                Total Customers
              </span>

              <strong>
                {totalElements}
              </strong>

            </div>

            <FaUsers />

          </div>


          {/* CURRENT PAGE */}

          <div className="admin-customer-stat">

            <div>

              <span>
                Customers on Page
              </span>

              <strong>
                {customers.length}
              </strong>

            </div>

            <FaUsers />

          </div>


          {/* ORDERS */}

          <div className="admin-customer-stat">

            <div>

              <span>
                Orders Available
              </span>

              <strong>

                {customers.reduce(
                  (
                    sum,
                    customer
                  ) =>
                    sum +
                    Number(
                      customer?.totalOrders ||
                      0
                    ),
                  0
                ) || "—"}

              </strong>

            </div>

            <FaShoppingBag />

          </div>


          {/* PAGE */}

          <div className="admin-customer-stat">

            <div>

              <span>
                Page
              </span>

              <strong>

                {totalPages > 0
                  ? `${page + 1} / ${totalPages}`
                  : "0"}

              </strong>

            </div>

            <FaSearch />

          </div>

        </section>


        {/* =================================================
            SEARCH TOOLBAR
           ================================================= */}

        <section className="admin-customers-toolbar">


          {/* SEARCH */}

          <div className="admin-customers-search">

            <FaSearch />


            <input
              type="text"
              placeholder="Search by name, email, phone, city, state or pincode..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              onKeyDown={
                handleSearchKeyDown
              }
            />


            {search && (

              <button
                type="button"
                className="admin-customers-clear"
                onClick={() =>
                  setSearch("")
                }
              >

                <FaTimes />

              </button>

            )}

          </div>


          {/* FROM DATE */}

          <div className="admin-customers-date">

            <FaCalendarAlt />

            <input
              type="date"
              value={fromDate}
              onChange={(event) =>
                setFromDate(
                  event.target.value
                )
              }
              title="From date"
            />

          </div>


          {/* TO DATE */}

          <div className="admin-customers-date">

            <FaCalendarAlt />

            <input
              type="date"
              value={toDate}
              onChange={(event) =>
                setToDate(
                  event.target.value
                )
              }
              title="To date"
            />

          </div>


          {/* SEARCH BUTTON */}

          <button
            type="button"
            className="admin-customers-search-button"
            onClick={handleSearch}
            disabled={loading}
          >

            <FaSearch />

            Search

          </button>


          {/* CLEAR BUTTON */}

          {(search ||
            fromDate ||
            toDate) && (

            <button
              type="button"
              className="admin-customers-clear-button"
              onClick={handleClearSearch}
              disabled={loading}
            >

              <FaTimes />

              Clear

            </button>

          )}


          {/* COUNT */}

          <div className="admin-customers-count">

            Showing{" "}

            <strong>
              {firstCustomerNumber}
            </strong>

            {" "}to{" "}

            <strong>
              {lastCustomerNumber}
            </strong>

            {" "}of{" "}

            <strong>
              {totalElements}
            </strong>

            {" "}customers

          </div>

        </section>


        {/* =================================================
            ACTIVE FILTERS
           ================================================= */}

        {(search ||
          fromDate ||
          toDate) && (

          <div className="admin-customers-filter-info">

            <span>

              <strong>
                Active filters:
              </strong>

              {" "}

              {search && (
                <>
                  Search = "{search}"
                </>
              )}

              {search &&
                (fromDate || toDate) &&
                " | "}

              {fromDate && (
                <>
                  From = {fromDate}
                </>
              )}

              {fromDate &&
                toDate &&
                " | "}

              {toDate && (
                <>
                  To = {toDate}
                </>
              )}

            </span>

          </div>

        )}


        {/* =================================================
            LOADING
           ================================================= */}

        {loading ? (

          <div className="admin-customers-loading">

            <FaSyncAlt
              className="admin-customers-spin"
            />

            <p>
              Loading customers...
            </p>

          </div>


        ) : customers.length === 0 ? (

          /* =================================================
             EMPTY
             ================================================= */

          <div className="admin-customers-empty">

            <FaUsers />

            <h2>

              {search ||
              fromDate ||
              toDate
                ? "No customers found"
                : "No customers yet"}

            </h2>

            <p>

              {search ||
              fromDate ||
              toDate
                ? "Try a different search or date range."
                : "Customers will appear here after they are registered."}

            </p>

          </div>


        ) : (

          /* =================================================
             CUSTOMER TABLE
             ================================================= */

          <>

            <div className="admin-customers-table-wrapper">

              <table className="admin-customers-table">

                <thead>

                  <tr>

                    <th>
                      Customer
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Location
                    </th>

                    <th>
                      Orders
                    </th>

                    <th>
                      Total Spent
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {customers.map(
                    (customer) => (

                    <tr
                      key={
                        customer.id ||
                        customer.email
                      }
                    >

                      {/* CUSTOMER */}

                      <td>

                        <div className="admin-customer-name">

                          <div className="admin-customer-avatar">

                            {customer.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "C"}

                          </div>


                          <div>

                            <strong>

                              {customer.name ||
                                "Customer"}

                            </strong>


                            <small>

                              {customer.email ||
                                "No email"}

                            </small>

                          </div>

                        </div>

                      </td>


                      {/* CONTACT */}

                      <td>

                        <div className="admin-customer-contact">

                          {customer.email && (

                            <span>

                              <FaEnvelope />

                              {customer.email}

                            </span>

                          )}


                          {customer.phone && (

                            <span>

                              <FaPhone />

                              {customer.phone}

                            </span>

                          )}

                        </div>

                      </td>


                      {/* LOCATION */}

                      <td>

                        <div className="admin-customer-location">

                          {customer.city ||
                          customer.state ? (

                            <>

                              <span>

                                <FaMapMarkerAlt />

                                {[
                                  customer.city,
                                  customer.state,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}

                              </span>


                              {customer.pincode && (

                                <small>

                                  {customer.pincode}

                                </small>

                              )}

                            </>

                          ) : (

                            "—"

                          )}

                        </div>

                      </td>


                      {/* ORDERS */}

                      <td>

                        <span className="admin-customer-orders-badge">

                          {getCustomerOrderCount(
                            customer
                          )}

                        </span>

                      </td>


                      {/* TOTAL */}

                      <td>

                        <strong>

                          {getCustomerTotalSpent(
                            customer
                          )}

                        </strong>

                      </td>


                      {/* ACTION */}

                      <td>

                        <button
                          type="button"
                          className="admin-customer-view"
                          onClick={() =>
                            handleViewCustomer(
                              customer.id
                            )
                          }
                          title="View customer details"
                          disabled={
                            customer.id ===
                            undefined ||
                            customer.id ===
                            null
                          }
                        >

                          <FaEye />

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* =================================================
                PAGINATION
               ================================================= */}

            <div className="admin-customers-pagination">

              <button
                type="button"
                onClick={
                  handlePreviousPage
                }
                disabled={
                  !hasPrevious ||
                  loading
                }
              >

                <FaChevronLeft />

                Previous

              </button>


              <div className="admin-customers-page-info">

                Page{" "}

                <strong>

                  {totalPages > 0
                    ? page + 1
                    : 0}

                </strong>

                {" "}of{" "}

                <strong>
                  {totalPages}
                </strong>

              </div>


              <button
                type="button"
                onClick={
                  handleNextPage
                }
                disabled={
                  !hasNext ||
                  loading
                }
              >

                Next

                <FaChevronRight />

              </button>

            </div>

          </>

        )}

      </main>


      {/* =====================================================
          CUSTOMER DETAILS MODAL
         ===================================================== */}

      {(selectedCustomer ||
        customerLoading) && (

        <div
          className="admin-customer-modal-overlay"
          onClick={
            customerLoading
              ? undefined
              : closeCustomerDetails
          }
        >

          <div
            className="admin-customer-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* =================================================
                MODAL HEADER
               ================================================= */}

            <div className="admin-customer-modal-header">

              <div className="admin-customer-modal-user">

                <div className="admin-customer-modal-avatar">

                  {selectedCustomer?.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "C"}

                </div>


                <div>

                  <span>
                    CUSTOMER
                  </span>

                  <h2>

                    {selectedCustomer?.name ||
                      "Loading..."}

                  </h2>

                </div>

              </div>


              <button
                type="button"
                onClick={
                  closeCustomerDetails
                }
                disabled={
                  customerLoading
                }
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                MODAL LOADING
               ================================================= */}

            {customerLoading ? (

              <div className="admin-customers-loading">

                <FaSyncAlt
                  className="admin-customers-spin"
                />

                <p>
                  Loading customer details...
                </p>

              </div>


            ) : selectedCustomer ? (

              /* =================================================
                 MODAL BODY
                 ================================================= */

              <div className="admin-customer-modal-body">


                {/* CUSTOMER INFORMATION */}

                <section className="admin-customer-detail-section">

                  <h3>
                    Customer Information
                  </h3>


                  <div className="admin-customer-detail-grid">


                    <div>

                      <span>
                        Customer ID
                      </span>

                      <strong>
                        {selectedCustomer.id}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Email
                      </span>

                      <strong>

                        {selectedCustomer.email ||
                          "Not provided"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Phone
                      </span>

                      <strong>

                        {selectedCustomer.phone ||
                          "Not provided"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Address
                      </span>

                      <strong>

                        {selectedCustomer.address ||
                          "Not provided"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        City
                      </span>

                      <strong>

                        {selectedCustomer.city ||
                          "Not provided"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        State
                      </span>

                      <strong>

                        {selectedCustomer.state ||
                          "Not provided"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Pincode
                      </span>

                      <strong>

                        {selectedCustomer.pincode ||
                          "Not provided"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Customer Since
                      </span>

                      <strong>

                        {formatDate(
                          selectedCustomer.createdAt
                        )}

                      </strong>

                    </div>

                  </div>

                </section>


                {/* CUSTOMER SUMMARY */}

                <section className="admin-customer-detail-section">

                  <h3>
                    Customer Summary
                  </h3>


                  <div className="admin-customer-summary">


                    <div>

                      <span>
                        Total Orders
                      </span>

                      <strong>
                        {customerTotalOrders}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Total Spent
                      </span>

                      <strong>

                        {formatCurrency(
                          customerTotalSpent
                        )}

                      </strong>

                    </div>

                  </div>

                </section>


                {/* ORDER HISTORY */}

                <section className="admin-customer-detail-section">

                  <h3>
                    Order History
                  </h3>


                  {customerOrders.length === 0 ? (

                    <div className="admin-customers-empty">

                      <FaShoppingBag />

                      <h2>
                        No orders found
                      </h2>

                      <p>
                        This customer has no orders yet.
                      </p>

                    </div>


                  ) : (

                    <div className="admin-customer-order-list">

                      {customerOrders.map(
                        (order) => (

                        <div
                          className="admin-customer-order"
                          key={
                            order.id ||
                            order.orderNumber
                          }
                        >


                          {/* ORDER */}

                          <div>

                            <strong>

                              {order.orderNumber ||
                                `Order #${order.id}`}

                            </strong>


                            <small>

                              {formatDate(
                                order.orderDate
                              )}

                            </small>

                          </div>


                          {/* STATUS */}

                          <div>

                            <span
                              className={`admin-customer-order-status status-${(
                                order.orderStatus ||
                                "pending"
                              )
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                            >

                              {order.orderStatus ||
                                "PENDING"}

                            </span>

                          </div>


                          {/* PAYMENT */}

                          <div>

                            <small>

                              Payment:{" "}

                              {order.paymentStatus ||
                                "—"}

                            </small>

                          </div>


                          {/* TOTAL */}

                          <strong>

                            {formatCurrency(
                              order.total
                            )}

                          </strong>

                        </div>

                      ))}

                    </div>

                  )}

                </section>

              </div>

            ) : null}


            {/* =================================================
                FOOTER
               ================================================= */}

            {!customerLoading && (

              <div className="admin-customer-modal-footer">

                <button
                  type="button"
                  onClick={
                    closeCustomerDetails
                  }
                >

                  Close

                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
};


export default AdminCustomers;