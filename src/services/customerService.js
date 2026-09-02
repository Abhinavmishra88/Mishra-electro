// =====================================================
// CUSTOMER SERVICE
// =====================================================

const API_BASE_URL =
    "https://mishra-electro.onrender.com/api/customers";


// =====================================================
// COMMON RESPONSE HANDLER
// =====================================================

const handleResponse = async (response) => {

    let data = null;

    try {

        data = await response.json();

    } catch (error) {

        data = null;
    }


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            `Request failed with status ${response.status}`
        );
    }


    return data;
};


// =====================================================
// GET ALL CUSTOMERS
//
// GET:
// /api/customers?page=0&size=20
// =====================================================

export const getCustomers = async (
    page = 0,
    size = 20
) => {

    const params =
        new URLSearchParams();

    params.append(
        "page",
        page
    );

    params.append(
        "size",
        size
    );


    const response =
        await fetch(
            `${API_BASE_URL}?${params.toString()}`,
            {
                method: "GET",

                headers: {
                    "Content-Type":
                        "application/json"
                }
            }
        );


    return handleResponse(
        response
    );
};


// =====================================================
// SEARCH CUSTOMERS
//
// OBJECT FORMAT:
//
// searchCustomers({
//     query: "rahul",
//     fromDate: "2026-08-01",
//     toDate: "2026-08-27",
//     page: 0,
//     size: 20
// })
//
// Searches:
//
// - Name
// - Email
// - Phone
// - City
// - State
// - Pincode
//
// Date filters:
//
// - From date
// - To date
// =====================================================

export const searchCustomers = async ({
    query = "",
    fromDate = "",
    toDate = "",
    page = 0,
    size = 20
} = {}) => {

    const params =
        new URLSearchParams();


    // =================================================
    // SEARCH QUERY
    // =================================================

    if (
        query !== null &&
        query !== undefined
    ) {

        const cleanQuery =
            String(query).trim();


        if (cleanQuery !== "") {

            params.append(
                "query",
                cleanQuery
            );
        }
    }


    // =================================================
    // FROM DATE
    // =================================================

    if (
        fromDate !== null &&
        fromDate !== undefined &&
        fromDate !== ""
    ) {

        params.append(
            "fromDate",
            fromDate
        );
    }


    // =================================================
    // TO DATE
    // =================================================

    if (
        toDate !== null &&
        toDate !== undefined &&
        toDate !== ""
    ) {

        params.append(
            "toDate",
            toDate
        );
    }


    // =================================================
    // PAGE
    // =================================================

    params.append(
        "page",
        page
    );


    // =================================================
    // SIZE
    // =================================================

    params.append(
        "size",
        size
    );


    const url =
        `${API_BASE_URL}/search?${params.toString()}`;


    console.log(
        "Customer Search URL:",
        url
    );


    const response =
        await fetch(
            url,
            {
                method: "GET",

                headers: {
                    "Content-Type":
                        "application/json"
                }
            }
        );


    return handleResponse(
        response
    );
};


// =====================================================
// GET CUSTOMER BY ID
//
// GET:
// /api/customers/{id}
//
// Response:
//
// {
//     success: true,
//     customer: {...},
//     orders: [...]
// }
// =====================================================

export const getCustomerById = async (
    customerId
) => {

    // =================================================
    // VALIDATE ID
    // =================================================

    if (
        customerId === null ||
        customerId === undefined ||
        customerId === ""
    ) {

        throw new Error(
            "Customer ID is required"
        );
    }


    const response =
        await fetch(
            `${API_BASE_URL}/${customerId}`,
            {
                method: "GET",

                headers: {
                    "Content-Type":
                        "application/json"
                }
            }
        );


    return handleResponse(
        response
    );
};


// =====================================================
// DEFAULT EXPORT
// =====================================================

const customerService = {

    getCustomers,

    searchCustomers,

    getCustomerById

};


export default customerService;