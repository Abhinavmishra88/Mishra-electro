package com.example.demo.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Order;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.OrderRepository;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerMigrationController {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    public CustomerMigrationController(
            CustomerRepository customerRepository,
            OrderRepository orderRepository) {

        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    // =====================================================
    // MIGRATE OLD ORDERS → CUSTOMERS
    //
    // POST:
    // /api/customers/migrate
    //
    // This creates customers from existing orders.
    //
    // Customer matching is done using email.
    // =====================================================

    @PostMapping("/migrate")
    public ResponseEntity<?> migrateCustomers() {

        try {

            // =================================================
            // GET ALL ORDERS
            // =================================================

            List<Order> orders =
                    orderRepository.findAll();


            int created = 0;
            int updated = 0;
            int skipped = 0;


            // =================================================
            // PREVENT PROCESSING SAME EMAIL MULTIPLE TIMES
            // =================================================

            Set<String> processedEmails =
                    new HashSet<>();


            // =================================================
            // PROCESS ORDERS
            // =================================================

            for (Order order : orders) {

                if (order == null) {
                    skipped++;
                    continue;
                }


                // ---------------------------------------------
                // GET EMAIL
                // ---------------------------------------------

                String email =
                        order.getCustomerEmail();


                // ---------------------------------------------
                // EMAIL REQUIRED
                // ---------------------------------------------

                if (
                        email == null ||
                        email.trim().isEmpty()
                ) {

                    skipped++;
                    continue;
                }


                email =
                        email.trim()
                                .toLowerCase();


                // ---------------------------------------------
                // DON'T PROCESS SAME EMAIL TWICE
                // ---------------------------------------------

                if (
                        processedEmails
                                .contains(email)
                ) {

                    continue;
                }


                processedEmails.add(
                        email
                );


                // =================================================
                // FIND EXISTING CUSTOMER
                // =================================================

                Customer customer =
                        customerRepository
                                .findByEmailIgnoreCase(
                                        email
                                )
                                .orElse(null);


                // =================================================
                // CREATE CUSTOMER
                // =================================================

                if (customer == null) {

                    customer =
                            new Customer();

                    customer.setEmail(
                            email
                    );

                    created++;

                } else {

                    updated++;
                }


                // =================================================
                // NAME
                // =================================================

                if (
                        order.getCustomerName() != null &&
                        !order.getCustomerName()
                                .trim()
                                .isEmpty()
                ) {

                    customer.setName(
                            order.getCustomerName()
                                    .trim()
                    );
                }


                // =================================================
                // PHONE
                // =================================================

                if (
                        order.getCustomerPhone() != null &&
                        !order.getCustomerPhone()
                                .trim()
                                .isEmpty()
                ) {

                    customer.setPhone(
                            order.getCustomerPhone()
                                    .trim()
                    );
                }


                // =================================================
                // ADDRESS
                // =================================================

                if (
                        order.getAddress() != null &&
                        !order.getAddress()
                                .trim()
                                .isEmpty()
                ) {

                    customer.setAddress(
                            order.getAddress()
                                    .trim()
                    );
                }


                // =================================================
                // CITY
                // =================================================

                if (
                        order.getCity() != null &&
                        !order.getCity()
                                .trim()
                                .isEmpty()
                ) {

                    customer.setCity(
                            order.getCity()
                                    .trim()
                    );
                }


                // =================================================
                // STATE
                // =================================================

                if (
                        order.getState() != null &&
                        !order.getState()
                                .trim()
                                .isEmpty()
                ) {

                    customer.setState(
                            order.getState()
                                    .trim()
                    );
                }


                // =================================================
                // PINCODE
                // =================================================

                if (
                        order.getPincode() != null &&
                        !order.getPincode()
                                .trim()
                                .isEmpty()
                ) {

                    customer.setPincode(
                            order.getPincode()
                                    .trim()
                    );
                }


                // =================================================
                // SAVE CUSTOMER
                // =================================================

                customerRepository.save(
                        customer
                );
            }


            // =================================================
            // SUCCESS RESPONSE
            // =================================================

            return ResponseEntity.ok(

                    java.util.Map.of(

                            "success",
                            true,

                            "message",
                            "Customer migration completed",

                            "created",
                            created,

                            "updated",
                            updated,

                            "skipped",
                            skipped
                    )
            );


        } catch (Exception e) {

            e.printStackTrace();


            // =================================================
            // ERROR RESPONSE
            // =================================================

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            java.util.Map.of(

                                    "success",
                                    false,

                                    "message",
                                    "Customer migration failed",

                                    "error",
                                    e.getMessage() != null
                                            ? e.getMessage()
                                            : "Unknown error"
                            )
                    );
        }
    }
}