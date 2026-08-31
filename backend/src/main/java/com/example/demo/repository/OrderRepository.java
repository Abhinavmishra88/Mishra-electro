package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // =====================================================
    // FIND ORDER BY ORDER NUMBER
    // =====================================================

    Order findByOrderNumber(String orderNumber);


    // =====================================================
    // CHECK ORDER NUMBER EXISTS
    // =====================================================

    boolean existsByOrderNumber(String orderNumber);


    // =====================================================
    // FIND ORDERS BY CUSTOMER EMAIL
    // =====================================================

    List<Order> findByCustomerEmailIgnoreCaseOrderByOrderDateDesc(
            String customerEmail
    );


    // =====================================================
    // FIND ORDERS BY CUSTOMER PHONE
    // =====================================================

    List<Order> findByCustomerPhoneOrderByOrderDateDesc(
            String customerPhone
    );


    // =====================================================
    // FIND ALL ORDERS - NEWEST FIRST
    // =====================================================

    List<Order> findAllByOrderByOrderDateDesc();


    // =====================================================
    // FIND ORDERS BY ORDER STATUS
    // =====================================================

    List<Order> findByOrderStatusOrderByOrderDateDesc(
            String orderStatus
    );


    // =====================================================
    // FIND ORDERS BY PAYMENT STATUS
    // =====================================================

    List<Order> findByPaymentStatusOrderByOrderDateDesc(
            String paymentStatus
    );


    // =====================================================
    // FIND ORDERS BY APPROVAL STATUS
    // =====================================================

    List<Order> findByApprovalStatusOrderByOrderDateDesc(
            String approvalStatus
    );


    // =====================================================
    // FIND ORDERS BY DELIVERY STATUS
    // =====================================================

    List<Order> findByDeliveryStatusOrderByOrderDateDesc(
            String deliveryStatus
    );


    // =====================================================
    // FIND ORDER BY RAZORPAY ORDER ID
    // =====================================================

    Order findByRazorpayOrderId(
            String razorpayOrderId
    );


    // =====================================================
    // FIND ORDER BY RAZORPAY PAYMENT ID
    // =====================================================

    Order findByRazorpayPaymentId(
            String razorpayPaymentId
    );
}