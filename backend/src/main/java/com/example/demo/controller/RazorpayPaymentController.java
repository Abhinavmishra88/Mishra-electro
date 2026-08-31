package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.RazorpayPaymentService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173"
})
public class RazorpayPaymentController {

    private final RazorpayPaymentService razorpayPaymentService;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public RazorpayPaymentController(
            RazorpayPaymentService razorpayPaymentService) {

        this.razorpayPaymentService =
                razorpayPaymentService;
    }


    // =====================================================
    // CREATE RAZORPAY ORDER
    //
    // POST /api/payment/create-order
    // =====================================================

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestBody Map<String, Object> request) {

        try {

            // -------------------------------------------------
            // GET AMOUNT
            // -------------------------------------------------

            Object amountObject =
                    request.get("amount");

            if (amountObject == null) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Amount is required"
                        ));
            }


            // -------------------------------------------------
            // CONVERT AMOUNT
            // -------------------------------------------------

            double amount;

            try {

                amount =
                        Double.parseDouble(
                                amountObject.toString()
                        );

            } catch (NumberFormatException e) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Invalid amount"
                        ));
            }


            // -------------------------------------------------
            // VALIDATE AMOUNT
            // -------------------------------------------------

            if (amount <= 0) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "success", false,
                                "message",
                                "Amount must be greater than 0"
                        ));
            }


            // -------------------------------------------------
            // CREATE RAZORPAY ORDER
            // -------------------------------------------------

            Map<String, Object> razorpayOrder =
                    razorpayPaymentService
                            .createRazorpayOrder(amount);


            // -------------------------------------------------
            // RESPONSE
            // -------------------------------------------------

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message",
                            "Razorpay order created successfully",
                            "order",
                            razorpayOrder
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
                                    "Unable to create Razorpay order",
                                    "error",
                                    e.getMessage() == null
                                            ? "Unknown error"
                                            : e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // VERIFY RAZORPAY PAYMENT
    //
    // POST /api/payment/verify
    // =====================================================

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestBody Map<String, String> request) {

        try {

            // -------------------------------------------------
            // GET RAZORPAY DETAILS
            // -------------------------------------------------

            String razorpayOrderId =
                    request.get("razorpayOrderId");

            String razorpayPaymentId =
                    request.get("razorpayPaymentId");

            String razorpaySignature =
                    request.get("razorpaySignature");


            // -------------------------------------------------
            // VALIDATE
            // -------------------------------------------------

            if (razorpayOrderId == null ||
                    razorpayOrderId.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "success", false,
                                        "message",
                                        "Razorpay order ID is required"
                                )
                        );
            }


            if (razorpayPaymentId == null ||
                    razorpayPaymentId.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "success", false,
                                        "message",
                                        "Razorpay payment ID is required"
                                )
                        );
            }


            if (razorpaySignature == null ||
                    razorpaySignature.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "success", false,
                                        "message",
                                        "Razorpay signature is required"
                                )
                        );
            }


            // -------------------------------------------------
            // VERIFY SIGNATURE
            // -------------------------------------------------

            boolean verified =
                    razorpayPaymentService
                            .verifyPayment(
                                    razorpayOrderId,
                                    razorpayPaymentId,
                                    razorpaySignature
                            );


            // -------------------------------------------------
            // PAYMENT VERIFIED
            // -------------------------------------------------

            if (verified) {

                return ResponseEntity.ok(
                        Map.of(
                                "success", true,
                                "verified", true,
                                "message",
                                "Payment verified successfully",
                                "razorpayOrderId",
                                razorpayOrderId,
                                "razorpayPaymentId",
                                razorpayPaymentId
                        )
                );
            }


            // -------------------------------------------------
            // PAYMENT NOT VERIFIED
            // -------------------------------------------------

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            Map.of(
                                    "success", false,
                                    "verified", false,
                                    "message",
                                    "Payment verification failed"
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
                                    "verified", false,
                                    "message",
                                    "Payment verification failed",
                                    "error",
                                    e.getMessage() == null
                                            ? "Unknown error"
                                            : e.getMessage()
                            )
                    );
        }
    }
}