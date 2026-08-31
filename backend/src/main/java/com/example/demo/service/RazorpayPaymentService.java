package com.example.demo.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RazorpayPaymentService {

    // =====================================================
    // RAZORPAY CONFIGURATION
    // =====================================================

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;


    // =====================================================
    // OBJECT MAPPER
    // =====================================================

    private final ObjectMapper objectMapper;

    private final HttpClient httpClient;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public RazorpayPaymentService(ObjectMapper objectMapper) {

        this.objectMapper = objectMapper;

        this.httpClient = HttpClient.newHttpClient();
    }


    // =====================================================
    // CREATE RAZORPAY ORDER
    // =====================================================

    public Map<String, Object> createRazorpayOrder(
            double amount) throws Exception {

        // -------------------------------------------------
        // VALIDATE AMOUNT
        // -------------------------------------------------

        if (amount <= 0) {

            throw new IllegalArgumentException(
                    "Amount must be greater than 0"
            );
        }


        // -------------------------------------------------
        // CONVERT RUPEES TO PAISE
        // -------------------------------------------------

        long amountInPaise =
                Math.round(amount * 100);


        // -------------------------------------------------
        // CREATE REQUEST BODY
        // -------------------------------------------------

        Map<String, Object> requestBody =
                new HashMap<>();

        requestBody.put(
                "amount",
                amountInPaise
        );

        requestBody.put(
                "currency",
                "INR"
        );

        requestBody.put(
                "receipt",
                "receipt_" +
                System.currentTimeMillis()
        );

        requestBody.put(
                "payment_capture",
                1
        );


        // -------------------------------------------------
        // CONVERT BODY TO JSON
        // -------------------------------------------------

        String jsonBody =
                objectMapper.writeValueAsString(
                        requestBody
                );


        // -------------------------------------------------
        // CREATE BASIC AUTH
        // -------------------------------------------------

        String credentials =
                keyId + ":" + keySecret;

        String encodedCredentials =
                Base64.getEncoder()
                        .encodeToString(
                                credentials.getBytes(
                                        StandardCharsets.UTF_8
                                )
                        );


        // -------------------------------------------------
        // CREATE HTTP REQUEST
        // -------------------------------------------------

        HttpRequest request =
                HttpRequest.newBuilder()

                        .uri(
                                URI.create(
                                        "https://api.razorpay.com/v1/orders"
                                )
                        )

                        .header(
                                "Authorization",
                                "Basic " +
                                encodedCredentials
                        )

                        .header(
                                "Content-Type",
                                "application/json"
                        )

                        .POST(
                                HttpRequest
                                        .BodyPublishers
                                        .ofString(
                                                jsonBody
                                        )
                        )

                        .build();


        // -------------------------------------------------
        // SEND REQUEST
        // -------------------------------------------------

        HttpResponse<String> response =
                httpClient.send(
                        request,
                        HttpResponse.BodyHandlers
                                .ofString()
                );


        // -------------------------------------------------
        // CHECK RESPONSE
        // -------------------------------------------------

        if (response.statusCode() < 200 ||
                response.statusCode() >= 300) {

            throw new RuntimeException(
                    "Razorpay order creation failed: "
                    + response.body()
            );
        }


        // -------------------------------------------------
        // PARSE RAZORPAY RESPONSE
        // -------------------------------------------------

        Map<String, Object> razorpayResponse =
                objectMapper.readValue(
                        response.body(),
                        new TypeReference<
                                Map<String, Object>>() {}
                );


        // -------------------------------------------------
        // RETURN RESPONSE TO FRONTEND
        // -------------------------------------------------

        Map<String, Object> result =
                new HashMap<>();

        result.put(
                "id",
                razorpayResponse.get("id")
        );

        result.put(
                "entity",
                razorpayResponse.get("entity")
        );

        result.put(
                "amount",
                razorpayResponse.get("amount")
        );

        result.put(
                "currency",
                razorpayResponse.get("currency")
        );

        result.put(
                "receipt",
                razorpayResponse.get("receipt")
        );

        result.put(
                "status",
                razorpayResponse.get("status")
        );

        // IMPORTANT:
        // Frontend needs the PUBLIC key ID
        result.put(
                "keyId",
                keyId
        );

        return result;
    }


    // =====================================================
    // VERIFY RAZORPAY PAYMENT
    // =====================================================

    public boolean verifyPayment(
            String razorpayOrderId,
            String razorpayPaymentId,
            String razorpaySignature)
            throws Exception {


        // -------------------------------------------------
        // VALIDATE INPUT
        // -------------------------------------------------

        if (razorpayOrderId == null ||
                razorpayOrderId.isBlank()) {

            throw new IllegalArgumentException(
                    "Razorpay order ID is required"
            );
        }


        if (razorpayPaymentId == null ||
                razorpayPaymentId.isBlank()) {

            throw new IllegalArgumentException(
                    "Razorpay payment ID is required"
            );
        }


        if (razorpaySignature == null ||
                razorpaySignature.isBlank()) {

            throw new IllegalArgumentException(
                    "Razorpay signature is required"
            );
        }


        // -------------------------------------------------
        // SIGNATURE DATA
        // -------------------------------------------------

        String data =
                razorpayOrderId +
                "|" +
                razorpayPaymentId;


        // -------------------------------------------------
        // HMAC SHA256
        // -------------------------------------------------

        Mac mac =
                Mac.getInstance("HmacSHA256");


        SecretKeySpec secretKey =
                new SecretKeySpec(
                        keySecret.getBytes(
                                StandardCharsets.UTF_8
                        ),
                        "HmacSHA256"
                );


        mac.init(secretKey);


        byte[] generatedHash =
                mac.doFinal(
                        data.getBytes(
                                StandardCharsets.UTF_8
                        )
                );


        // -------------------------------------------------
        // CONVERT HASH TO HEX
        // -------------------------------------------------

        String generatedSignature =
                bytesToHex(
                        generatedHash
                );


        // -------------------------------------------------
        // SECURE SIGNATURE COMPARISON
        // -------------------------------------------------

        return MessageDigest.isEqual(
                generatedSignature
                        .getBytes(
                                StandardCharsets.UTF_8
                        ),
                razorpaySignature
                        .getBytes(
                                StandardCharsets.UTF_8
                        )
        );
    }


    // =====================================================
    // BYTE ARRAY → HEX
    // =====================================================

    private String bytesToHex(
            byte[] bytes) {

        StringBuilder result =
                new StringBuilder(
                        bytes.length * 2
                );


        for (byte b : bytes) {

            result.append(
                    String.format(
                            "%02x",
                            b
                    )
            );
        }


        return result.toString();
    }
}