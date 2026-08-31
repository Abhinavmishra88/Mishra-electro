package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // =====================================================
    // CREATE ORDER
    // =====================================================

    public Order createOrder(Order order) {

        // -------------------------------------------------
        // ORDER NUMBER
        // -------------------------------------------------

        if (order.getOrderNumber() == null ||
                order.getOrderNumber().isBlank()) {

            order.setOrderNumber(
                    "ORD-" +
                    UUID.randomUUID()
                            .toString()
                            .substring(0, 8)
                            .toUpperCase()
            );
        }

        // -------------------------------------------------
        // ORDER DATE
        // -------------------------------------------------

        order.setOrderDate(LocalDateTime.now());

        // -------------------------------------------------
        // ORDER STATUS
        // -------------------------------------------------

        if (order.getOrderStatus() == null ||
                order.getOrderStatus().isBlank()) {

            order.setOrderStatus("PLACED");
        }

        // -------------------------------------------------
        // ADMIN APPROVAL
        // -------------------------------------------------

        if (order.getApprovalStatus() == null ||
                order.getApprovalStatus().isBlank()) {

            order.setApprovalStatus("PENDING");
        }

        // -------------------------------------------------
        // PAYMENT STATUS
        // -------------------------------------------------

        if (order.getPaymentStatus() == null ||
                order.getPaymentStatus().isBlank()) {

            order.setPaymentStatus("PENDING");
        }

        // -------------------------------------------------
        // SHIPPING
        // -------------------------------------------------

        if (order.getShipping() == null ||
                order.getShipping().isBlank()) {

            order.setShipping("Standard Shipping");
        }

        // -------------------------------------------------
        // SHIPPING CHARGE
        // -------------------------------------------------

        if (order.getShippingCharge() == null) {

            order.setShippingCharge(0.0);
        }

        // -------------------------------------------------
        // SUBTOTAL
        // -------------------------------------------------

        if (order.getSubtotal() == null) {

            order.setSubtotal(0.0);
        }

        // -------------------------------------------------
        // TOTAL
        // -------------------------------------------------

        if (order.getTotal() == null) {

            order.setTotal(
                    order.getSubtotal()
                            + order.getShippingCharge()
            );
        }

        // -------------------------------------------------
        // DELIVERY STATUS
        // -------------------------------------------------

        if (order.getDeliveryStatus() == null ||
                order.getDeliveryStatus().isBlank()) {

            order.setDeliveryStatus(
                    "ORDER PLACED"
            );
        }

        // -------------------------------------------------
        // CURRENT LOCATION
        // -------------------------------------------------

        if (order.getCurrentLocation() == null ||
                order.getCurrentLocation().isBlank()) {

            order.setCurrentLocation(
                    "Order received"
            );
        }

        // -------------------------------------------------
        // ESTIMATED DELIVERY
        // -------------------------------------------------

        if (order.getEstimatedDelivery() == null ||
                order.getEstimatedDelivery().isBlank()) {

            order.setEstimatedDelivery(
                    "Delivery date will be updated soon"
            );
        }

        // -------------------------------------------------
        // UPDATED TIME
        // -------------------------------------------------

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // GET ALL ORDERS
    // =====================================================

    public List<Order> getAllOrders() {

        return orderRepository
                .findAllByOrderByOrderDateDesc();
    }

    // =====================================================
    // GET ORDER BY ID
    // =====================================================

    public Order getOrderById(Long id) {

        return orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found with id: " + id
                        )
                );
    }

    // =====================================================
    // GET ORDER BY ORDER NUMBER
    // =====================================================

    public Order getOrderByOrderNumber(
            String orderNumber) {

        Order order =
                orderRepository.findByOrderNumber(
                        orderNumber
                );

        if (order == null) {

            throw new RuntimeException(
                    "Order not found: " + orderNumber
            );
        }

        return order;
    }

    // =====================================================
    // GET ORDERS BY CUSTOMER EMAIL
    // =====================================================

    public List<Order> getOrdersByCustomerEmail(
            String customerEmail) {

        return orderRepository
                .findByCustomerEmailIgnoreCaseOrderByOrderDateDesc(
                        customerEmail
                );
    }

    // =====================================================
    // GET ORDERS BY CUSTOMER PHONE
    // =====================================================

    public List<Order> getOrdersByCustomerPhone(
            String customerPhone) {

        return orderRepository
                .findByCustomerPhoneOrderByOrderDateDesc(
                        customerPhone
                );
    }

    // =====================================================
    // UPDATE COMPLETE ORDER
    // =====================================================

    public Order updateOrder(
            Long id,
            Order updatedOrder) {

        Order existingOrder =
                getOrderById(id);

        // -------------------------------------------------
        // CUSTOMER
        // -------------------------------------------------

        existingOrder.setCustomerName(
                updatedOrder.getCustomerName()
        );

        existingOrder.setCustomerEmail(
                updatedOrder.getCustomerEmail()
        );

        existingOrder.setCustomerPhone(
                updatedOrder.getCustomerPhone()
        );

        // -------------------------------------------------
        // ADDRESS
        // -------------------------------------------------

        existingOrder.setAddress(
                updatedOrder.getAddress()
        );

        existingOrder.setCity(
                updatedOrder.getCity()
        );

        existingOrder.setState(
                updatedOrder.getState()
        );

        existingOrder.setPincode(
                updatedOrder.getPincode()
        );

        // -------------------------------------------------
        // SHIPPING
        // -------------------------------------------------

        existingOrder.setShipping(
                updatedOrder.getShipping()
        );

        existingOrder.setShippingCharge(
                updatedOrder.getShippingCharge()
        );

        // -------------------------------------------------
        // PAYMENT
        // -------------------------------------------------

        existingOrder.setPaymentMethod(
                updatedOrder.getPaymentMethod()
        );

        existingOrder.setPaymentStatus(
                updatedOrder.getPaymentStatus()
        );

        existingOrder.setRazorpayOrderId(
                updatedOrder.getRazorpayOrderId()
        );

        existingOrder.setRazorpayPaymentId(
                updatedOrder.getRazorpayPaymentId()
        );

        // -------------------------------------------------
        // PRICE
        // -------------------------------------------------

        existingOrder.setSubtotal(
                updatedOrder.getSubtotal()
        );

        existingOrder.setTotal(
                updatedOrder.getTotal()
        );

        // -------------------------------------------------
        // ORDER STATUS
        // -------------------------------------------------

        if (updatedOrder.getOrderStatus() != null &&
                !updatedOrder.getOrderStatus().isBlank()) {

            existingOrder.setOrderStatus(
                    updatedOrder.getOrderStatus()
                            .trim()
                            .toUpperCase()
            );
        }

        // -------------------------------------------------
        // APPROVAL
        // -------------------------------------------------

        if (updatedOrder.getApprovalStatus() != null &&
                !updatedOrder.getApprovalStatus().isBlank()) {

            existingOrder.setApprovalStatus(
                    updatedOrder.getApprovalStatus()
                            .trim()
                            .toUpperCase()
            );
        }

        // -------------------------------------------------
        // DELIVERY
        // -------------------------------------------------

        if (updatedOrder.getDeliveryStatus() != null &&
                !updatedOrder.getDeliveryStatus().isBlank()) {

            existingOrder.setDeliveryStatus(
                    updatedOrder.getDeliveryStatus()
                            .trim()
                            .toUpperCase()
            );
        }

        existingOrder.setCurrentLocation(
                updatedOrder.getCurrentLocation()
        );

        existingOrder.setEstimatedDelivery(
                updatedOrder.getEstimatedDelivery()
        );

        existingOrder.setEstimatedDeliveryDate(
                updatedOrder.getEstimatedDeliveryDate()
        );

        existingOrder.setEstimatedDeliveryTime(
                updatedOrder.getEstimatedDeliveryTime()
        );

        // -------------------------------------------------
        // DELIVERY PARTNER
        // -------------------------------------------------

        existingOrder.setDeliveryPartnerName(
                updatedOrder.getDeliveryPartnerName()
        );

        existingOrder.setDeliveryPartnerPhone(
                updatedOrder.getDeliveryPartnerPhone()
        );

        // -------------------------------------------------
        // ADMIN MESSAGE
        // -------------------------------------------------

        existingOrder.setAdminMessage(
                updatedOrder.getAdminMessage()
        );

        // -------------------------------------------------
        // UPDATED TIME
        // -------------------------------------------------

        existingOrder.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(
                existingOrder
        );
    }

    // =====================================================
    // UPDATE ORDER STATUS
    // =====================================================

    public Order updateOrderStatus(
            Long id,
            String orderStatus) {

        if (orderStatus == null ||
                orderStatus.isBlank()) {

            throw new IllegalArgumentException(
                    "Order status is required"
            );
        }

        Order order =
                getOrderById(id);

        order.setOrderStatus(
                orderStatus
                        .trim()
                        .toUpperCase()
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // UPDATE PAYMENT STATUS
    // =====================================================

    public Order updatePaymentStatus(
            Long id,
            String paymentStatus) {

        if (paymentStatus == null ||
                paymentStatus.isBlank()) {

            throw new IllegalArgumentException(
                    "Payment status is required"
            );
        }

        Order order =
                getOrderById(id);

        order.setPaymentStatus(
                paymentStatus
                        .trim()
                        .toUpperCase()
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // APPROVE ORDER
    // =====================================================

    public Order approveOrder(Long id) {

        Order order =
                getOrderById(id);

        order.setApprovalStatus(
                "APPROVED"
        );

        order.setOrderStatus(
                "PROCESSING"
        );

        order.setDeliveryStatus(
                "ORDER CONFIRMED"
        );

        order.setCurrentLocation(
                "Order confirmed by admin"
        );

        order.setApprovedAt(
                LocalDateTime.now()
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // REJECT ORDER
    // =====================================================

    public Order rejectOrder(
            Long id,
            String message) {

        Order order =
                getOrderById(id);

        order.setApprovalStatus(
                "REJECTED"
        );

        order.setOrderStatus(
                "CANCELLED"
        );

        order.setDeliveryStatus(
                "ORDER CANCELLED"
        );

        order.setCurrentLocation(
                "Order cancelled by admin"
        );

        order.setAdminMessage(
                message
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // UPDATE DELIVERY STATUS
    // =====================================================

    public Order updateDeliveryStatus(
            Long id,
            String deliveryStatus) {

        if (deliveryStatus == null ||
                deliveryStatus.isBlank()) {

            throw new IllegalArgumentException(
                    "Delivery status is required"
            );
        }

        Order order =
                getOrderById(id);

        order.setDeliveryStatus(
                deliveryStatus
                        .trim()
                        .toUpperCase()
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // UPDATE CURRENT LOCATION
    // =====================================================

    public Order updateCurrentLocation(
            Long id,
            String currentLocation) {

        if (currentLocation == null ||
                currentLocation.isBlank()) {

            throw new IllegalArgumentException(
                    "Current location is required"
            );
        }

        Order order =
                getOrderById(id);

        order.setCurrentLocation(
                currentLocation.trim()
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // UPDATE DELIVERY PARTNER
    // =====================================================

    public Order updateDeliveryPartner(
            Long id,
            String name,
            String phone) {

        Order order =
                getOrderById(id);

        order.setDeliveryPartnerName(
                name
        );

        order.setDeliveryPartnerPhone(
                phone
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // UPDATE ESTIMATED DELIVERY
    // =====================================================

    public Order updateEstimatedDelivery(
            Long id,
            String estimatedDelivery,
            String estimatedDeliveryDate,
            String estimatedDeliveryTime) {

        Order order =
                getOrderById(id);

        order.setEstimatedDelivery(
                estimatedDelivery
        );

        order.setEstimatedDeliveryDate(
                estimatedDeliveryDate
        );

        order.setEstimatedDeliveryTime(
                estimatedDeliveryTime
        );

        order.setUpdatedAt(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // =====================================================
    // DELETE ORDER
    // =====================================================

    public void deleteOrder(Long id) {

        Order order =
                getOrderById(id);

        orderRepository.delete(order);
    }

    // =====================================================
    // CHECK ORDER NUMBER
    // =====================================================

    public boolean existsByOrderNumber(
            String orderNumber) {

        return orderRepository
                .existsByOrderNumber(
                        orderNumber
                );
    }
}