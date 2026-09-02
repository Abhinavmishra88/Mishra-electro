package com.example.demo.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Order;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.OrderRepository;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    public CustomerController(
            CustomerRepository customerRepository,
            OrderRepository orderRepository) {

        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    // =====================================================
    // GET ALL CUSTOMERS
    //
    // GET:
    // /api/customers?page=0&size=20
    // =====================================================

    @GetMapping
    public ResponseEntity<?> getAllCustomers(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "20"
            )
            int size) {

        try {

            // PAGE VALIDATION

            if (page < 0) {
                page = 0;
            }

            if (size <= 0) {
                size = 20;
            }

            if (size > 100) {
                size = 100;
            }

            Pageable pageable =
                    PageRequest.of(page, size);

            // GET CUSTOMERS

            Page<Customer> result =
                    customerRepository
                            .findAllByOrderByCreatedAtDesc(
                                    pageable
                            );

            // RESPONSE

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,

                            "customers",
                            result.getContent(),

                            "page",
                            result.getNumber(),

                            "size",
                            result.getSize(),

                            "totalElements",
                            result.getTotalElements(),

                            "totalPages",
                            result.getTotalPages(),

                            "hasNext",
                            result.hasNext(),

                            "hasPrevious",
                            result.hasPrevious()
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            Map.of(
                                    "success", false,

                                    "message",
                                    "Failed to load customers",

                                    "error",
                                    e.getMessage() != null
                                            ? e.getMessage()
                                            : "Unknown error"
                            )
                    );
        }
    }

    // =====================================================
    // SEARCH CUSTOMERS
    //
    // Searches:
    // - Name
    // - Email
    // - Phone
    // - City
    // - State
    // - Pincode
    //
    // Optional:
    // - From date
    // - To date
    //
    // GET:
    // /api/customers/search
    //
    // Example:
    // /api/customers/search?query=rahul
    //
    // With dates:
    // /api/customers/search
    //      ?query=rahul
    //      &fromDate=2026-08-01
    //      &toDate=2026-08-27
    //      &page=0
    //      &size=20
    // =====================================================

    @GetMapping("/search")
    public ResponseEntity<?> searchCustomers(

            @RequestParam(
                    required = false,
                    defaultValue = ""
            )
            String query,

            @RequestParam(
                    required = false
            )
            String fromDate,

            @RequestParam(
                    required = false
            )
            String toDate,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "20"
            )
            int size) {

        try {

            // PAGE VALIDATION

            if (page < 0) {
                page = 0;
            }

            if (size <= 0) {
                size = 20;
            }

            if (size > 100) {
                size = 100;
            }

            // SEARCH TEXT

            String search =
                    query == null
                            ? ""
                            : query.trim();

            // DATE VARIABLES

            LocalDateTime fromDateTime = null;
            LocalDateTime toDateTime = null;

            // FROM DATE

            if (
                    fromDate != null &&
                    !fromDate.trim().isEmpty()
            ) {

                LocalDate parsedFromDate =
                        LocalDate.parse(
                                fromDate.trim()
                        );

                fromDateTime =
                        parsedFromDate.atStartOfDay();
            }

            // TO DATE
            //
            // Add one day so the selected To date
            // remains inclusive.

            if (
                    toDate != null &&
                    !toDate.trim().isEmpty()
            ) {

                LocalDate parsedToDate =
                        LocalDate.parse(
                                toDate.trim()
                        );

                toDateTime =
                        parsedToDate
                                .plusDays(1)
                                .atStartOfDay();
            }

            // DATE VALIDATION

            if (
                    fromDateTime != null &&
                    toDateTime != null &&
                    fromDateTime.isAfter(
                            toDateTime
                    )
            ) {

                return ResponseEntity
                        .status(
                                HttpStatus.BAD_REQUEST
                        )
                        .body(
                                Map.of(
                                        "success",
                                        false,

                                        "message",
                                        "From date cannot be after To date"
                                )
                        );
            }

            // PAGEABLE

            Pageable pageable =
                    PageRequest.of(
                            page,
                            size
                    );

            // SEARCH

            Page<Customer> result =
                    customerRepository
                            .searchCustomers(
                                    search,
                                    fromDateTime,
                                    toDateTime,
                                    pageable
                            );

            // RESPONSE

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,

                            "customers",
                            result.getContent(),

                            "page",
                            result.getNumber(),

                            "size",
                            result.getSize(),

                            "totalElements",
                            result.getTotalElements(),

                            "totalPages",
                            result.getTotalPages(),

                            "hasNext",
                            result.hasNext(),

                            "hasPrevious",
                            result.hasPrevious()
                    )
            );

        } catch (
                java.time.format.DateTimeParseException e
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.BAD_REQUEST
                    )
                    .body(
                            Map.of(
                                    "success",
                                    false,

                                    "message",
                                    "Invalid date format. Use YYYY-MM-DD",

                                    "error",
                                    e.getMessage() != null
                                            ? e.getMessage()
                                            : "Invalid date"
                            )
                    );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            Map.of(
                                    "success",
                                    false,

                                    "message",
                                    "Failed to search customers",

                                    "error",
                                    e.getMessage() != null
                                            ? e.getMessage()
                                            : "Unknown error"
                            )
                    );
        }
    }

    // =====================================================
    // GET CUSTOMER BY ID
    //
    // GET:
    // /api/customers/1
    //
    // Returns:
    // - customer
    // - orders
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(
            @PathVariable("id") Long id) {

        try {

            // VALIDATE ID

            if (id == null) {

                return ResponseEntity
                        .status(
                                HttpStatus.BAD_REQUEST
                        )
                        .body(
                                Map.of(
                                        "success",
                                        false,

                                        "message",
                                        "Customer ID is required"
                                )
                        );
            }

            // FIND CUSTOMER

            Customer customer =
                    customerRepository
                            .findById(id)
                            .orElse(null);

            // CUSTOMER NOT FOUND

            if (customer == null) {

                return ResponseEntity
                        .status(
                                HttpStatus.NOT_FOUND
                        )
                        .body(
                                Map.of(
                                        "success",
                                        false,

                                        "message",
                                        "Customer not found"
                                )
                        );
            }

            // FIND CUSTOMER ORDERS
            //
            // Orders are connected using customer email.

            List<Order> orders = List.of();

            if (
                    customer.getEmail() != null &&
                    !customer.getEmail()
                            .trim()
                            .isEmpty()
            ) {

                orders =
                        orderRepository
                                .findByCustomerEmailIgnoreCaseOrderByOrderDateDesc(
                                        customer.getEmail()
                                );
            }

            // RESPONSE

            return ResponseEntity.ok(
                    Map.of(
                            "success",
                            true,

                            "customer",
                            customer,

                            "orders",
                            orders
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            Map.of(
                                    "success",
                                    false,

                                    "message",
                                    "Failed to load customer details",

                                    "error",
                                    e.getMessage() != null
                                            ? e.getMessage()
                                            : "Unknown error"
                            )
                    );
        }
    }
}