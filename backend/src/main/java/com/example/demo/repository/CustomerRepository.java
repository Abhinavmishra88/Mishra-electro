package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Customer;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {

    // =====================================================
    // FIND CUSTOMER BY EMAIL
    // =====================================================

    Optional<Customer> findByEmailIgnoreCase(
            String email
    );


    // =====================================================
    // GET ALL CUSTOMERS
    // NEWEST CUSTOMER FIRST
    // =====================================================

    Page<Customer> findAllByOrderByCreatedAtDesc(
            Pageable pageable
    );


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
    // Optional order-date filter:
    // - From date
    // - To date
    //
    // A customer is returned only once.
    // =====================================================

    @Query("""
        SELECT c
        FROM Customer c
        WHERE

            (
                :query = ''

                OR LOWER(COALESCE(c.name, ''))
                    LIKE LOWER(CONCAT('%', :query, '%'))

                OR LOWER(COALESCE(c.email, ''))
                    LIKE LOWER(CONCAT('%', :query, '%'))

                OR LOWER(COALESCE(c.phone, ''))
                    LIKE LOWER(CONCAT('%', :query, '%'))

                OR LOWER(COALESCE(c.city, ''))
                    LIKE LOWER(CONCAT('%', :query, '%'))

                OR LOWER(COALESCE(c.state, ''))
                    LIKE LOWER(CONCAT('%', :query, '%'))

                OR LOWER(COALESCE(c.pincode, ''))
                    LIKE LOWER(CONCAT('%', :query, '%'))
            )

            AND

            (
                :fromDate IS NULL

                OR EXISTS (
                    SELECT o.id
                    FROM Order o
                    WHERE

                        LOWER(
                            COALESCE(
                                o.customerEmail,
                                ''
                            )
                        )
                        =
                        LOWER(
                            COALESCE(
                                c.email,
                                ''
                            )
                        )

                        AND o.orderDate >= :fromDate

                        AND
                        (
                            :toDate IS NULL

                            OR o.orderDate < :toDate
                        )
                )
            )

        ORDER BY c.name ASC
    """)
    Page<Customer> searchCustomers(

            @Param("query")
            String query,

            @Param("fromDate")
            LocalDateTime fromDate,

            @Param("toDate")
            LocalDateTime toDate,

            Pageable pageable
    );
}