package com.example.demo.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // =====================================================
    // GET ALL PRODUCTS
    // =====================================================

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // =====================================================
    // GET PRODUCT BY ID
    // =====================================================

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // =====================================================
    // CREATE PRODUCT
    // =====================================================

    public Product createProduct(Product product) {

        // Always create a new product
        product.setId(null);

        return productRepository.save(product);
    }

    // =====================================================
    // UPDATE PRODUCT
    // =====================================================

    public Optional<Product> updateProduct(
            Long id,
            Product updatedProduct) {

        return productRepository.findById(id)
                .map(existingProduct -> {

                    existingProduct.setName(
                            updatedProduct.getName()
                    );

                    existingProduct.setCategory(
                            updatedProduct.getCategory()
                    );

                    existingProduct.setPrice(
                            updatedProduct.getPrice()
                    );

                    existingProduct.setOldPrice(
                            updatedProduct.getOldPrice()
                    );

                    existingProduct.setImage(
                            updatedProduct.getImage()
                    );

                    existingProduct.setStock(
                            updatedProduct.getStock()
                    );

                    existingProduct.setDescription(
                            updatedProduct.getDescription()
                    );

                    existingProduct.setSpecifications(
                            updatedProduct.getSpecifications()
                    );

                    return productRepository.save(
                            existingProduct
                    );
                });
    }

    // =====================================================
    // DELETE PRODUCT
    // =====================================================

    public boolean deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            return false;
        }

        productRepository.deleteById(id);

        return true;
    }

    // =====================================================
    // SEARCH PRODUCTS
    // =====================================================

    public List<Product> searchProducts(String keyword) {

        if (keyword == null ||
                keyword.trim().isEmpty()) {

            return productRepository.findAll();
        }

        String search = keyword.trim();

        return productRepository
                .findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                        search,
                        search
                );
    }

    // =====================================================
    // GET PRODUCTS BY CATEGORY
    // =====================================================

    public List<Product> getProductsByCategory(
            String category) {

        return productRepository
                .findByCategoryIgnoreCase(category);
    }

    // =====================================================
    // GET PRODUCTS IN STOCK
    // =====================================================

    public List<Product> getProductsInStock() {

        return productRepository
                .findByStockGreaterThan(0);
    }

    // =====================================================
    // GET OUT OF STOCK PRODUCTS
    // =====================================================

    public List<Product> getOutOfStockProducts() {

        return productRepository
                .findByStockLessThanEqual(0);
    }
}