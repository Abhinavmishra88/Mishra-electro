package com.example.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;

@Service
public class CustomerSearchService {

    private final CustomerRepository customerRepository;

    public CustomerSearchService(
            CustomerRepository customerRepository) {

        this.customerRepository =
                customerRepository;
    }


    // =====================================================
    // SEARCH CUSTOMERS
    //
    // Supports:
    //
    // 1. Name
    // 2. Email
    // 3. Phone
    // 4. City
    // 5. State
    // 6. Pincode
    // 7. From date
    // 8. To date
    // 9. Pagination
    // =====================================================

    public Map<String, Object> searchCustomers(
            String query,
            String fromDate,
            String toDate,
            int page,
            int size) {

        try {

            // -------------------------------------------------
            // PAGE VALIDATION
            // -------------------------------------------------

            if (page < 0) {
                page = 0;
            }

            if (size <= 0) {
                size = 20;
            }

            if (size > 100) {
                size = 100;
            }


            // -------------------------------------------------
            // SEARCH TEXT
            // -------------------------------------------------

            String search =
                    query == null
                            ? ""
                            : query.trim();


            // -------------------------------------------------
            // DATE VARIABLES
            // -------------------------------------------------

            LocalDateTime startDate = null;

            LocalDateTime endDate = null;


            // -------------------------------------------------
            // FROM DATE
            // -------------------------------------------------

            if (fromDate != null &&
                    !fromDate.trim().isEmpty()) {

                LocalDate parsedFromDate =
                        LocalDate.parse(
                                fromDate.trim()
                        );

                startDate =
                        parsedFromDate.atStartOfDay();
            }


            // -------------------------------------------------
            // TO DATE
            //
            // Example:
            //
            // 27-08-2026
            //
            // means the complete day.
            // -------------------------------------------------

            if (toDate != null &&
                    !toDate.trim().isEmpty()) {

                LocalDate parsedToDate =
                        LocalDate.parse(
                                toDate.trim()
                        );

                endDate =
                        parsedToDate
                                .plusDays(1)
                                .atStartOfDay()
                                .minusNanos(1);
            }


            // -------------------------------------------------
            // DATE VALIDATION
            // -------------------------------------------------

            if (startDate != null &&
                    endDate != null &&
                    startDate.isAfter(endDate)) {

                throw new IllegalArgumentException(
                        "From date cannot be after To date"
                );
            }


            // -------------------------------------------------
            // PAGINATION
            // -------------------------------------------------

            Pageable pageable =
                    PageRequest.of(
                            page,
                            size
                    );


            // -------------------------------------------------
            // DATABASE SEARCH
            // -------------------------------------------------

            Page<Customer> customerPage;


            // -------------------------------------------------
            // DATE SEARCH
            //
            // If a date is provided, search customers
            // whose orders fall within that date range.
            // -------------------------------------------------

            if (startDate != null) {

                customerPage =
                        customerRepository
                                .searchCustomers(
                                        search,
                                        startDate,
                                        endDate,
                                        pageable
                                );

            } else {

                // -------------------------------------------------
                // NORMAL CUSTOMER SEARCH
                // -------------------------------------------------

                customerPage =
                        customerRepository
                                .searchCustomers(
                                        search,
                                        null,
                                        null,
                                        pageable
                                );
            }


            // -------------------------------------------------
            // CONVERT CUSTOMERS TO RESPONSE
            // -------------------------------------------------

            List<Map<String, Object>>
                    customers =
                    new ArrayList<>();


            for (Customer customer :
                    customerPage.getContent()) {

                Map<String, Object>
                        customerData =
                        new LinkedHashMap<>();


                customerData.put(
                        "id",
                        customer.getId()
                );

                customerData.put(
                        "name",
                        customer.getName()
                );

                customerData.put(
                        "email",
                        customer.getEmail()
                );

                customerData.put(
                        "phone",
                        customer.getPhone()
                );

                customerData.put(
                        "address",
                        customer.getAddress()
                );

                customerData.put(
                        "city",
                        customer.getCity()
                );

                customerData.put(
                        "state",
                        customer.getState()
                );

                customerData.put(
                        "pincode",
                        customer.getPincode()
                );


                customers.add(
                        customerData
                );
            }


            // -------------------------------------------------
            // RESPONSE
            // -------------------------------------------------

            Map<String, Object> response =
                    new LinkedHashMap<>();


            response.put(
                    "success",
                    true
            );

            response.put(
                    "customers",
                    customers
            );

            response.put(
                    "page",
                    customerPage.getNumber()
            );

            response.put(
                    "size",
                    customerPage.getSize()
            );

            response.put(
                    "totalElements",
                    customerPage.getTotalElements()
            );

            response.put(
                    "totalPages",
                    customerPage.getTotalPages()
            );

            response.put(
                    "hasNext",
                    customerPage.hasNext()
            );

            response.put(
                    "hasPrevious",
                    customerPage.hasPrevious()
            );


            return response;

        } catch (Exception e) {

            e.printStackTrace();

            Map<String, Object> error =
                    new LinkedHashMap<>();

            error.put(
                    "success",
                    false
            );

            error.put(
                    "message",
                    e.getMessage() != null
                            ? e.getMessage()
                            : "Customer search failed"
            );

            return error;
        }
    }
}