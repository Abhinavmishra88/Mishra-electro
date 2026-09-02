package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

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

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // =====================================================
    // GET ALL PRODUCTS
    // GET /api/products
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }

    // =====================================================
    // GET PRODUCT BY ID
    // GET /api/products/{id}
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @PathVariable Long id) {

        Optional<Product> product =
                productService.getProductById(id);

        if (product.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product not found"
                            )
                    );
        }

        return ResponseEntity.ok(
                product.get()
        );
    }

    // =====================================================
    // SEARCH PRODUCTS
    // GET /api/products/search?keyword=wire
    // =====================================================

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                productService.searchProducts(keyword)
        );
    }

    // =====================================================
    // GET PRODUCTS BY CATEGORY
    // GET /api/products/category/{category}
    // =====================================================

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                productService.getProductsByCategory(
                        category
                )
        );
    }

    // =====================================================
    // GET PRODUCTS IN STOCK
    // GET /api/products/in-stock
    // =====================================================

    @GetMapping("/in-stock")
    public ResponseEntity<List<Product>> getProductsInStock() {

        return ResponseEntity.ok(
                productService.getProductsInStock()
        );
    }

    // =====================================================
    // GET OUT OF STOCK PRODUCTS
    // GET /api/products/out-of-stock
    // =====================================================

    @GetMapping("/out-of-stock")
    public ResponseEntity<List<Product>>
            getOutOfStockProducts() {

        return ResponseEntity.ok(
                productService.getOutOfStockProducts()
        );
    }

    // =====================================================
    // CREATE PRODUCT
    // POST /api/products
    // =====================================================

    @PostMapping(
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<?> createProduct(
            @RequestBody Product product) {

        // -------------------------------------------------
        // BASIC VALIDATION
        // -------------------------------------------------

        if (product == null) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product data is required"
                            )
                    );
        }

        if (product.getName() == null ||
                product.getName().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product name is required"
                            )
                    );
        }

        if (product.getCategory() == null ||
                product.getCategory().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product category is required"
                            )
                    );
        }

        if (product.getPrice() == null ||
                product.getPrice() < 0) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Valid product price is required"
                            )
                    );
        }

        if (product.getStock() == null ||
                product.getStock() < 0) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Valid stock quantity is required"
                            )
                    );
        }

        // -------------------------------------------------
        // CLEAN VALUES
        // -------------------------------------------------

        product.setName(
                product.getName().trim()
        );

        product.setCategory(
                product.getCategory().trim()
        );

        // -------------------------------------------------
        // CREATE
        // -------------------------------------------------

        Product savedProduct =
                productService.createProduct(product);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProduct);
    }

    // =====================================================
    // UPDATE PRODUCT
    // PUT /api/products/{id}
    // =====================================================

    @PutMapping(
            value = "/{id}",
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        // -------------------------------------------------
        // BASIC VALIDATION
        // -------------------------------------------------

        if (product == null) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product data is required"
                            )
                    );
        }

        if (product.getName() == null ||
                product.getName().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product name is required"
                            )
                    );
        }

        if (product.getCategory() == null ||
                product.getCategory().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product category is required"
                            )
                    );
        }

        if (product.getPrice() == null ||
                product.getPrice() < 0) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Valid product price is required"
                            )
                    );
        }

        if (product.getStock() == null ||
                product.getStock() < 0) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Valid stock quantity is required"
                            )
                    );
        }

        // -------------------------------------------------
        // CLEAN VALUES
        // -------------------------------------------------

        product.setName(
                product.getName().trim()
        );

        product.setCategory(
                product.getCategory().trim()
        );

        // -------------------------------------------------
        // UPDATE
        // -------------------------------------------------

        Optional<Product> updatedProduct =
                productService.updateProduct(
                        id,
                        product
                );

        if (updatedProduct.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product not found"
                            )
                    );
        }

        return ResponseEntity.ok(
                updatedProduct.get()
        );
    }

    // =====================================================
    // DELETE PRODUCT
    // DELETE /api/products/{id}
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long id) {

        boolean deleted =
                productService.deleteProduct(id);

        if (!deleted) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Product not found"
                            )
                    );
        }

        return ResponseEntity.ok(
                java.util.Map.of(
                        "message",
                        "Product deleted successfully"
                )
        );
    }
}