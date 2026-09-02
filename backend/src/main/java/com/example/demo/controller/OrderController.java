package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // =========================================================
    // GET ALL ORDERS
    // =========================================================

    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        try {

            List<Order> orders =
                    orderRepository.findAllByOrderByOrderDateDesc();

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load orders",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDER BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(
            @PathVariable Long id) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message", "Order not found"
                        ));
            }

            return ResponseEntity.ok(
                    optionalOrder.get()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load order",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDER BY ORDER NUMBER
    // =========================================================

    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<?> getOrderByNumber(
            @PathVariable String orderNumber) {

        try {

            if (!hasText(orderNumber)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order number is required"
                        ));
            }

            Order order =
                    orderRepository.findByOrderNumber(
                            orderNumber.trim()
                    );

            if (order == null) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            return ResponseEntity.ok(order);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to find order",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDERS BY CUSTOMER EMAIL
    // =========================================================

    @GetMapping("/customer/{email}")
    public ResponseEntity<?> getOrdersByCustomerEmail(
            @PathVariable String email) {

        try {

            if (!hasText(email)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Customer email is required"
                        ));
            }

            List<Order> orders =
                    orderRepository
                            .findByCustomerEmailIgnoreCaseOrderByOrderDateDesc(
                                    email.trim()
                            );

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load customer orders",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDERS BY CUSTOMER PHONE
    // =========================================================

    @GetMapping("/phone/{phone}")
    public ResponseEntity<?> getOrdersByCustomerPhone(
            @PathVariable String phone) {

        try {

            if (!hasText(phone)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Customer phone is required"
                        ));
            }

            List<Order> orders =
                    orderRepository
                            .findByCustomerPhoneOrderByOrderDateDesc(
                                    phone.trim()
                            );

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load customer orders",
                            e
                    ));
        }
    }

    // =========================================================
    // SEARCH CUSTOMERS
    // =========================================================

    @GetMapping("/customers/search")
    public ResponseEntity<?> searchCustomers(
            @RequestParam(required = false) String query) {

        try {

            if (!hasText(query)) {

                return ResponseEntity.ok(
                        Map.of(
                                "success", true,
                                "customers", List.of()
                        )
                );
            }

            String search =
                    query.trim().toLowerCase();

            List<Order> allOrders =
                    orderRepository
                            .findAllByOrderByOrderDateDesc();

            Map<String, Map<String, Object>> customers =
                    new LinkedHashMap<>();

            for (Order order : allOrders) {

                if (order == null) {
                    continue;
                }

                boolean matches =
                        contains(
                                order.getCustomerName(),
                                search
                        )
                        ||
                        contains(
                                order.getCustomerEmail(),
                                search
                        )
                        ||
                        contains(
                                order.getCustomerPhone(),
                                search
                        )
                        ||
                        contains(
                                order.getAddress(),
                                search
                        )
                        ||
                        contains(
                                order.getCity(),
                                search
                        )
                        ||
                        contains(
                                order.getState(),
                                search
                        )
                        ||
                        contains(
                                order.getPincode(),
                                search
                        );

                if (!matches) {
                    continue;
                }

                String email =
                        order.getCustomerEmail();

                String key =
                        hasText(email)
                                ? email.trim().toLowerCase()
                                : "unknown-" + order.hashCode();

                Map<String, Object> customer =
                        customers.get(key);

                if (customer == null) {

                    customer =
                            new LinkedHashMap<>();

                    customer.put(
                            "name",
                            order.getCustomerName()
                    );

                    customer.put(
                            "email",
                            order.getCustomerEmail()
                    );

                    customer.put(
                            "phone",
                            order.getCustomerPhone()
                    );

                    customer.put(
                            "address",
                            order.getAddress()
                    );

                    customer.put(
                            "city",
                            order.getCity()
                    );

                    customer.put(
                            "state",
                            order.getState()
                    );

                    customer.put(
                            "pincode",
                            order.getPincode()
                    );

                    customer.put(
                            "totalOrders",
                            0
                    );

                    customer.put(
                            "totalSpent",
                            0.0
                    );

                    customer.put(
                            "orders",
                            new ArrayList<Order>()
                    );

                    customers.put(
                            key,
                            customer
                    );
                }

                int totalOrders =
                        ((Number) customer.get(
                                "totalOrders"
                        )).intValue();

                customer.put(
                        "totalOrders",
                        totalOrders + 1
                );

                double totalSpent =
                        ((Number) customer.get(
                                "totalSpent"
                        )).doubleValue();

                if (order.getTotal() != null) {

                    totalSpent +=
                            order.getTotal();
                }

                customer.put(
                        "totalSpent",
                        totalSpent
                );

                @SuppressWarnings("unchecked")
                List<Order> customerOrders =
                        (List<Order>) customer.get(
                                "orders"
                        );

                customerOrders.add(order);
            }

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "customers", customers.values()
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to search customers",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDERS BY ORDER STATUS
    // =========================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getOrdersByStatus(
            @PathVariable String status) {

        try {

            if (!hasText(status)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order status is required"
                        ));
            }

            List<Order> orders =
                    orderRepository
                            .findByOrderStatusOrderByOrderDateDesc(
                                    status.trim().toUpperCase()
                            );

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load orders by status",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDERS BY PAYMENT STATUS
    // =========================================================

    @GetMapping("/payment-status/{status}")
    public ResponseEntity<?> getOrdersByPaymentStatus(
            @PathVariable String status) {

        try {

            if (!hasText(status)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Payment status is required"
                        ));
            }

            List<Order> orders =
                    orderRepository
                            .findByPaymentStatusOrderByOrderDateDesc(
                                    status.trim().toUpperCase()
                            );

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load payment orders",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDERS BY APPROVAL STATUS
    // =========================================================

    @GetMapping("/approval-status/{status}")
    public ResponseEntity<?> getOrdersByApprovalStatus(
            @PathVariable String status) {

        try {

            if (!hasText(status)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Approval status is required"
                        ));
            }

            List<Order> orders =
                    orderRepository
                            .findByApprovalStatusOrderByOrderDateDesc(
                                    status.trim().toUpperCase()
                            );

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load approval orders",
                            e
                    ));
        }
    }

    // =========================================================
    // GET ORDERS BY DELIVERY STATUS
    // =========================================================

    @GetMapping("/delivery-status/{status}")
    public ResponseEntity<?> getOrdersByDeliveryStatus(
            @PathVariable String status) {

        try {

            if (!hasText(status)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Delivery status is required"
                        ));
            }

            List<Order> orders =
                    orderRepository
                            .findByDeliveryStatusOrderByOrderDateDesc(
                                    status.trim().toUpperCase()
                            );

            return ResponseEntity.ok(orders);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to load delivery orders",
                            e
                    ));
        }
    }

    // =========================================================
    // CREATE ORDER
    // =========================================================

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestBody Order order) {

        try {

            if (order == null) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order data is required"
                        ));
            }

            if (!hasText(
                    order.getCustomerEmail()
            )) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Customer email is required"
                        ));
            }

            // -------------------------------------------------
            // ORDER NUMBER
            // -------------------------------------------------

            if (!hasText(
                    order.getOrderNumber()
            )) {

                order.setOrderNumber(
                        generateOrderNumber()
                );
            }

            // -------------------------------------------------
            // ORDER DATE
            // -------------------------------------------------

            if (order.getOrderDate() == null) {

                order.setOrderDate(
                        LocalDateTime.now()
                );
            }

            // -------------------------------------------------
            // ORDER STATUS
            // -------------------------------------------------

            if (!hasText(
                    order.getOrderStatus()
            )) {

                order.setOrderStatus(
                        "PLACED"
                );
            }

            // -------------------------------------------------
            // PAYMENT STATUS
            // -------------------------------------------------

            if (!hasText(
                    order.getPaymentStatus()
            )) {

                order.setPaymentStatus(
                        "PENDING"
                );
            }

            // -------------------------------------------------
            // APPROVAL STATUS
            // -------------------------------------------------

            if (!hasText(
                    order.getApprovalStatus()
            )) {

                order.setApprovalStatus(
                        "PENDING"
                );
            }

            // -------------------------------------------------
            // DELIVERY STATUS
            // -------------------------------------------------

            if (!hasText(
                    order.getDeliveryStatus()
            )) {

                order.setDeliveryStatus(
                        "PENDING"
                );
            }

            // -------------------------------------------------
            // SUBTOTAL
            // -------------------------------------------------

            if (order.getSubtotal() == null) {

                order.setSubtotal(0.0);
            }

            // -------------------------------------------------
            // SHIPPING CHARGE
            // -------------------------------------------------

            if (order.getShippingCharge() == null) {

                order.setShippingCharge(0.0);
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
            // UPDATED TIME
            // -------------------------------------------------

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            // -------------------------------------------------
            // SAVE
            // -------------------------------------------------

            Order savedOrder =
                    orderRepository.save(order);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedOrder);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to create order",
                            e
                    ));
        }
    }

    // =========================================================
    // UPDATE COMPLETE ORDER
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(
            @PathVariable Long id,
            @RequestBody Order updatedOrder) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            if (updatedOrder == null) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order data is required"
                        ));
            }

            Order existingOrder =
                    optionalOrder.get();

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

            if (updatedOrder.getShippingCharge() != null) {

                existingOrder.setShippingCharge(
                        updatedOrder.getShippingCharge()
                );

            } else {

                existingOrder.setShippingCharge(0.0);
            }

            // -------------------------------------------------
            // PAYMENT
            // -------------------------------------------------

            existingOrder.setPaymentMethod(
                    updatedOrder.getPaymentMethod()
            );

            if (hasText(
                    updatedOrder.getPaymentStatus()
            )) {

                existingOrder.setPaymentStatus(
                        updatedOrder
                                .getPaymentStatus()
                                .trim()
                                .toUpperCase()
                );
            }

            // -------------------------------------------------
            // ORDER STATUS
            // -------------------------------------------------

            if (hasText(
                    updatedOrder.getOrderStatus()
            )) {

                existingOrder.setOrderStatus(
                        updatedOrder
                                .getOrderStatus()
                                .trim()
                                .toUpperCase()
                );
            }

            // -------------------------------------------------
            // APPROVAL
            // -------------------------------------------------

            if (hasText(
                    updatedOrder.getApprovalStatus()
            )) {

                existingOrder.setApprovalStatus(
                        updatedOrder
                                .getApprovalStatus()
                                .trim()
                                .toUpperCase()
                );
            }

            // -------------------------------------------------
            // DELIVERY
            // -------------------------------------------------

            if (hasText(
                    updatedOrder.getDeliveryStatus()
            )) {

                existingOrder.setDeliveryStatus(
                        updatedOrder
                                .getDeliveryStatus()
                                .trim()
                                .toUpperCase()
                );
            }

            // -------------------------------------------------
            // SUBTOTAL
            // -------------------------------------------------

            if (updatedOrder.getSubtotal() != null) {

                existingOrder.setSubtotal(
                        updatedOrder.getSubtotal()
                );

            } else if (
                    existingOrder.getSubtotal() == null
            ) {

                existingOrder.setSubtotal(0.0);
            }

            // -------------------------------------------------
            // TOTAL
            // -------------------------------------------------

            if (updatedOrder.getTotal() != null) {

                existingOrder.setTotal(
                        updatedOrder.getTotal()
                );

            } else {

                double subtotal =
                        existingOrder.getSubtotal() != null
                                ? existingOrder.getSubtotal()
                                : 0.0;

                double shippingCharge =
                        existingOrder.getShippingCharge() != null
                                ? existingOrder.getShippingCharge()
                                : 0.0;

                existingOrder.setTotal(
                        subtotal + shippingCharge
                );
            }

            // -------------------------------------------------
            // RAZORPAY
            // -------------------------------------------------

            existingOrder.setRazorpayOrderId(
                    updatedOrder.getRazorpayOrderId()
            );

            existingOrder.setRazorpayPaymentId(
                    updatedOrder.getRazorpayPaymentId()
            );

            // -------------------------------------------------
            // ADMIN MESSAGE
            // -------------------------------------------------

            existingOrder.setAdminMessage(
                    updatedOrder.getAdminMessage()
            );

            // -------------------------------------------------
            // DELIVERY INFORMATION
            // -------------------------------------------------

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

            existingOrder.setDeliveryPartnerName(
                    updatedOrder.getDeliveryPartnerName()
            );

            existingOrder.setDeliveryPartnerPhone(
                    updatedOrder.getDeliveryPartnerPhone()
            );

            // -------------------------------------------------
            // UPDATED AT
            // -------------------------------------------------

            existingOrder.setUpdatedAt(
                    LocalDateTime.now()
            );

            // -------------------------------------------------
            // SAVE
            // -------------------------------------------------

            Order savedOrder =
                    orderRepository.save(
                            existingOrder
                    );

            return ResponseEntity.ok(
                    savedOrder
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to update order",
                            e
                    ));
        }
    }

    // =========================================================
    // UPDATE ORDER STATUS
    // =========================================================

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            if (request == null ||
                    !hasText(request.get("status"))) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order status is required"
                        ));
            }

            String status =
                    request.get("status")
                            .trim()
                            .toUpperCase();

            List<String> validStatuses =
                    List.of(
                            "PLACED",
                            "PENDING",
                            "CONFIRMED",
                            "PROCESSING",
                            "SHIPPED",
                            "OUT_FOR_DELIVERY",
                            "DELIVERED",
                            "CANCELLED"
                    );

            if (!validStatuses.contains(status)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Invalid order status: "
                                        + status
                        ));
            }

            Order order =
                    optionalOrder.get();

            order.setOrderStatus(status);

            switch (status) {

                case "PLACED":
                case "PENDING":
                    order.setDeliveryStatus("PENDING");
                    break;

                case "CONFIRMED":
                    order.setDeliveryStatus("CONFIRMED");
                    break;

                case "PROCESSING":
                    order.setDeliveryStatus("PROCESSING");
                    break;

                case "SHIPPED":
                    order.setDeliveryStatus("SHIPPED");
                    break;

                case "OUT_FOR_DELIVERY":
                    order.setDeliveryStatus(
                            "OUT_FOR_DELIVERY"
                    );
                    break;

                case "DELIVERED":
                    order.setDeliveryStatus("DELIVERED");
                    break;

                case "CANCELLED":
                    order.setDeliveryStatus("CANCELLED");
                    break;

                default:
                    break;
            }

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            Order updatedOrder =
                    orderRepository.save(order);

            return ResponseEntity.ok(
                    updatedOrder
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to update order status",
                            e
                    ));
        }
    }

    // =========================================================
    // UPDATE PAYMENT STATUS
    // =========================================================

    @PutMapping("/{id}/payment-status")
    public ResponseEntity<?> updatePaymentStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            if (request == null ||
                    !hasText(request.get("status"))) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Payment status is required"
                        ));
            }

            String status =
                    request.get("status")
                            .trim()
                            .toUpperCase();

            List<String> validStatuses =
                    List.of(
                            "PENDING",
                            "PAID",
                            "FAILED",
                            "REFUNDED",
                            "CANCELLED"
                    );

            if (!validStatuses.contains(status)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Invalid payment status: "
                                        + status
                        ));
            }

            Order order =
                    optionalOrder.get();

            order.setPaymentStatus(status);

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            Order updatedOrder =
                    orderRepository.save(order);

            return ResponseEntity.ok(
                    updatedOrder
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to update payment status",
                            e
                    ));
        }
    }

    // =========================================================
    // UPDATE APPROVAL STATUS
    // =========================================================

    @PutMapping("/{id}/approval-status")
    public ResponseEntity<?> updateApprovalStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            if (request == null ||
                    !hasText(request.get("status"))) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Approval status is required"
                        ));
            }

            String status =
                    request.get("status")
                            .trim()
                            .toUpperCase();

            List<String> validStatuses =
                    List.of(
                            "PENDING",
                            "APPROVED",
                            "REJECTED"
                    );

            if (!validStatuses.contains(status)) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Invalid approval status: "
                                        + status
                        ));
            }

            Order order =
                    optionalOrder.get();

            order.setApprovalStatus(status);

            order.setApprovalDate(
                    LocalDateTime.now()
            );

            if ("APPROVED".equals(status)) {

                order.setApprovedAt(
                        LocalDateTime.now()
                );

                order.setRejectionReason(null);

                order.setOrderStatus(
                        "CONFIRMED"
                );
            }

            if ("REJECTED".equals(status)) {

                String reason =
                        request.get(
                                "rejectionReason"
                        );

                if (reason != null) {

                    order.setRejectionReason(
                            reason.trim()
                    );
                }

                order.setOrderStatus(
                        "CANCELLED"
                );
            }

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            Order updatedOrder =
                    orderRepository.save(order);

            return ResponseEntity.ok(
                    updatedOrder
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to update approval status",
                            e
                    ));
        }
    }

    // =========================================================
    // UPDATE DELIVERY
    // =========================================================

    @PutMapping("/{id}/delivery")
    public ResponseEntity<?> updateDelivery(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            Order order =
                    optionalOrder.get();

            if (request != null) {

                if (request.containsKey(
                        "deliveryStatus")) {

                    order.setDeliveryStatus(
                            request.get(
                                    "deliveryStatus"
                            )
                    );
                }

                if (request.containsKey(
                        "currentLocation")) {

                    order.setCurrentLocation(
                            request.get(
                                    "currentLocation"
                            )
                    );
                }

                if (request.containsKey(
                        "estimatedDelivery")) {

                    order.setEstimatedDelivery(
                            request.get(
                                    "estimatedDelivery"
                            )
                    );
                }

                if (request.containsKey(
                        "estimatedDeliveryDate")) {

                    order.setEstimatedDeliveryDate(
                            request.get(
                                    "estimatedDeliveryDate"
                            )
                    );
                }

                if (request.containsKey(
                        "estimatedDeliveryTime")) {

                    order.setEstimatedDeliveryTime(
                            request.get(
                                    "estimatedDeliveryTime"
                            )
                    );
                }

                if (request.containsKey(
                        "deliveryPartnerName")) {

                    order.setDeliveryPartnerName(
                            request.get(
                                    "deliveryPartnerName"
                            )
                    );
                }

                if (request.containsKey(
                        "deliveryPartnerPhone")) {

                    order.setDeliveryPartnerPhone(
                            request.get(
                                    "deliveryPartnerPhone"
                            )
                    );
                }
            }

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            Order updatedOrder =
                    orderRepository.save(order);

            return ResponseEntity.ok(
                    updatedOrder
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to update delivery information",
                            e
                    ));
        }
    }

    // =========================================================
    // UPDATE ADMIN MESSAGE
    // =========================================================

    @PutMapping("/{id}/admin-message")
    public ResponseEntity<?> updateAdminMessage(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            if (request == null ||
                    !hasText(request.get("message"))) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Admin message is required"
                        ));
            }

            Order order =
                    optionalOrder.get();

            order.setAdminMessage(
                    request.get("message").trim()
            );

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            Order updatedOrder =
                    orderRepository.save(order);

            return ResponseEntity.ok(
                    updatedOrder
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to update admin message",
                            e
                    ));
        }
    }

    // =========================================================
    // APPROVE ORDER
    // =========================================================

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveOrder(
            @PathVariable Long id) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            Order order =
                    optionalOrder.get();

            order.setApprovalStatus(
                    "APPROVED"
            );

            order.setOrderStatus(
                    "CONFIRMED"
            );

            order.setApprovalDate(
                    LocalDateTime.now()
            );

            order.setApprovedAt(
                    LocalDateTime.now()
            );

            order.setRejectionReason(null);

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            return ResponseEntity.ok(
                    orderRepository.save(order)
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to approve order",
                            e
                    ));
        }
    }

    // =========================================================
    // REJECT ORDER
    // =========================================================

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectOrder(
            @PathVariable Long id) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            Order order =
                    optionalOrder.get();

            order.setApprovalStatus(
                    "REJECTED"
            );

            order.setOrderStatus(
                    "CANCELLED"
            );

            order.setDeliveryStatus(
                    "CANCELLED"
            );

            order.setApprovalDate(
                    LocalDateTime.now()
            );

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            return ResponseEntity.ok(
                    orderRepository.save(order)
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to reject order",
                            e
                    ));
        }
    }

    // =========================================================
    // CANCEL ORDER
    // =========================================================

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Long id) {

        try {

            Optional<Order> optionalOrder =
                    orderRepository.findById(id);

            if (optionalOrder.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            Order order =
                    optionalOrder.get();

            order.setOrderStatus(
                    "CANCELLED"
            );

            order.setDeliveryStatus(
                    "CANCELLED"
            );

            order.setUpdatedAt(
                    LocalDateTime.now()
            );

            return ResponseEntity.ok(
                    orderRepository.save(order)
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to cancel order",
                            e
                    ));
        }
    }

    // =========================================================
    // DELETE ORDER
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(
            @PathVariable Long id) {

        try {

            if (!orderRepository.existsById(id)) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Order not found"
                        ));
            }

            orderRepository.deleteById(id);

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message",
                            "Order deleted successfully"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(
                            "Failed to delete order",
                            e
                    ));
        }
    }

    // =========================================================
    // GENERATE UNIQUE ORDER NUMBER
    // =========================================================

    private String generateOrderNumber() {

        String orderNumber;

        do {

            orderNumber =
                    "ME-" +
                    UUID.randomUUID()
                            .toString()
                            .substring(0, 8)
                            .toUpperCase();

        } while (
                orderRepository.existsByOrderNumber(
                        orderNumber
                )
        );

        return orderNumber;
    }

    // =========================================================
    // CHECK TEXT
    // =========================================================

    private boolean hasText(
            String value) {

        return value != null &&
                !value.trim().isEmpty();
    }

    // =========================================================
    // SEARCH TEXT
    // =========================================================

    private boolean contains(
            String value,
            String search) {

        if (value == null ||
                search == null) {

            return false;
        }

        return value
                .toLowerCase()
                .contains(search);
    }

    // =========================================================
    // ERROR RESPONSE
    // =========================================================

    private Map<String, Object> errorResponse(
            String message,
            Exception e) {

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "success",
                false
        );

        response.put(
                "message",
                message
        );

        response.put(
                "error",
                getErrorMessage(e)
        );

        return response;
    }

    // =========================================================
    // ERROR MESSAGE
    // =========================================================

    private String getErrorMessage(
            Exception e) {

        if (e == null) {
            return "";
        }

        return e.getMessage() != null
                ? e.getMessage()
                : "Unknown error";
    }
}