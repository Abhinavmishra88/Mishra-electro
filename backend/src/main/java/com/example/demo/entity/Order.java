package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    // =====================================================
    // PRIMARY KEY
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // ORDER INFORMATION
    // =====================================================

    private String orderNumber;

    private LocalDateTime orderDate;


    // =====================================================
    // CUSTOMER INFORMATION
    // =====================================================

    private String customerName;

    private String customerEmail;

    private String customerPhone;


    // =====================================================
    // DELIVERY ADDRESS
    // =====================================================

    private String address;

    private String city;

    private String state;

    private String pincode;


    // =====================================================
    // SHIPPING
    // =====================================================

    private String shipping;

    private Double shippingCharge;


    // =====================================================
    // PAYMENT
    // =====================================================

    private String paymentMethod;

    private String paymentStatus;


    // =====================================================
    // RAZORPAY
    // =====================================================

    private String razorpayOrderId;

    private String razorpayPaymentId;


    // =====================================================
    // ORDER STATUS
    // =====================================================

    private String orderStatus;


    // =====================================================
    // ADMIN APPROVAL
    // =====================================================

    private String approvalStatus;

    private LocalDateTime approvalDate;

    private LocalDateTime approvedAt;

    private String rejectionReason;

    private String adminMessage;


    // =====================================================
    // DELIVERY STATUS
    // =====================================================

    private String deliveryStatus;

    private String currentLocation;


    // =====================================================
    // ESTIMATED DELIVERY
    // =====================================================

    private String estimatedDelivery;

    private String estimatedDeliveryDate;

    private String estimatedDeliveryTime;


    // =====================================================
    // DELIVERY PARTNER
    // =====================================================

    private String deliveryPartnerName;

    private String deliveryPartnerPhone;


    // =====================================================
    // PRICE
    // =====================================================

    private Double subtotal;

    private Double total;


    // =====================================================
    // SYSTEM
    // =====================================================

    private LocalDateTime updatedAt;


    // =====================================================
    // DEFAULT CONSTRUCTOR
    // =====================================================

    public Order() {
    }


    // =====================================================
    // ID
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // =====================================================
    // ORDER NUMBER
    // =====================================================

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }


    // =====================================================
    // ORDER DATE
    // =====================================================

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }


    // =====================================================
    // CUSTOMER NAME
    // =====================================================

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }


    // =====================================================
    // CUSTOMER EMAIL
    // =====================================================

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }


    // =====================================================
    // CUSTOMER PHONE
    // =====================================================

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }


    // =====================================================
    // ADDRESS
    // =====================================================

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    // =====================================================
    // CITY
    // =====================================================

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    // =====================================================
    // STATE
    // =====================================================

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    // =====================================================
    // PINCODE
    // =====================================================

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }


    // =====================================================
    // SHIPPING
    // =====================================================

    public String getShipping() {
        return shipping;
    }

    public void setShipping(String shipping) {
        this.shipping = shipping;
    }


    // =====================================================
    // SHIPPING CHARGE
    // =====================================================

    public Double getShippingCharge() {
        return shippingCharge;
    }

    public void setShippingCharge(Double shippingCharge) {
        this.shippingCharge = shippingCharge;
    }


    // =====================================================
    // PAYMENT METHOD
    // =====================================================

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    // =====================================================
    // PAYMENT MODE
    //
    // BACKWARD COMPATIBILITY
    //
    // Some existing backend code may use:
    // order.getPaymentMode()
    // order.setPaymentMode(...)
    //
    // We keep these methods so that code does not break.
    // The actual field remains paymentMethod.
    // =====================================================

    public String getPaymentMode() {
        return paymentMethod;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMethod = paymentMode;
    }


    // =====================================================
    // PAYMENT STATUS
    // =====================================================

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }


    // =====================================================
    // RAZORPAY ORDER ID
    // =====================================================

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }

    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }


    // =====================================================
    // RAZORPAY PAYMENT ID
    // =====================================================

    public String getRazorpayPaymentId() {
        return razorpayPaymentId;
    }

    public void setRazorpayPaymentId(String razorpayPaymentId) {
        this.razorpayPaymentId = razorpayPaymentId;
    }


    // =====================================================
    // ORDER STATUS
    // =====================================================

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }


    // =====================================================
    // APPROVAL STATUS
    // =====================================================

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }


    // =====================================================
    // APPROVAL DATE
    // =====================================================

    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }


    // =====================================================
    // APPROVED AT
    // =====================================================

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }


    // =====================================================
    // REJECTION REASON
    // =====================================================

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }


    // =====================================================
    // ADMIN MESSAGE
    // =====================================================

    public String getAdminMessage() {
        return adminMessage;
    }

    public void setAdminMessage(String adminMessage) {
        this.adminMessage = adminMessage;
    }


    // =====================================================
    // DELIVERY STATUS
    // =====================================================

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(String deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }


    // =====================================================
    // CURRENT LOCATION
    // =====================================================

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }


    // =====================================================
    // ESTIMATED DELIVERY
    // =====================================================

    public String getEstimatedDelivery() {
        return estimatedDelivery;
    }

    public void setEstimatedDelivery(String estimatedDelivery) {
        this.estimatedDelivery = estimatedDelivery;
    }


    // =====================================================
    // ESTIMATED DELIVERY DATE
    // =====================================================

    public String getEstimatedDeliveryDate() {
        return estimatedDeliveryDate;
    }

    public void setEstimatedDeliveryDate(String estimatedDeliveryDate) {
        this.estimatedDeliveryDate = estimatedDeliveryDate;
    }


    // =====================================================
    // ESTIMATED DELIVERY TIME
    // =====================================================

    public String getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(String estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }


    // =====================================================
    // DELIVERY PARTNER NAME
    // =====================================================

    public String getDeliveryPartnerName() {
        return deliveryPartnerName;
    }

    public void setDeliveryPartnerName(String deliveryPartnerName) {
        this.deliveryPartnerName = deliveryPartnerName;
    }


    // =====================================================
    // DELIVERY PARTNER PHONE
    // =====================================================

    public String getDeliveryPartnerPhone() {
        return deliveryPartnerPhone;
    }

    public void setDeliveryPartnerPhone(String deliveryPartnerPhone) {
        this.deliveryPartnerPhone = deliveryPartnerPhone;
    }


    // =====================================================
    // SUBTOTAL
    // =====================================================

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }


    // =====================================================
    // TOTAL
    // =====================================================

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }


    // =====================================================
    // UPDATED AT
    // =====================================================

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}