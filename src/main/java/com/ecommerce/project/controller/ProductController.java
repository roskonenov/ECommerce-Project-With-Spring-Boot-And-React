package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> createProduct(@PathVariable Long categoryId,
                                                    @Valid @RequestBody ProductDTO productDTO) {
        return new ResponseEntity<>(
                productService.createProduct(categoryId, productDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse> getProducts(
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {
        return new ResponseEntity<>(
                productService.getAllProducts(pageNumber, pageSize, sortBy, sortOrder),
                HttpStatus.OK
        );
    }

    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {
        return new ResponseEntity<>(
                productService.getAllProductsByCategory(categoryId, pageNumber, pageSize, sortBy, sortOrder),
                HttpStatus.OK
        );
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getProductsByKeyword(
            @PathVariable String keyword,
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {
        return new ResponseEntity<>(
                productService.getAllProductsByKeyword(keyword, pageNumber, pageSize, sortBy, sortOrder),
                HttpStatus.OK
        );
    }

    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long productId,
                                                    @Valid @RequestBody ProductDTO productDTO) {
        return new ResponseEntity<>(
                productService.updateProduct(productId, productDTO),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> removeProduct(@PathVariable Long productId) {
        return new ResponseEntity<>(
                productService.deleteProduct(productId),
                HttpStatus.OK
        );
    }

    @PutMapping("/products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImage(@PathVariable Long productId,
                                                         @RequestParam MultipartFile image) throws IOException {
        return new ResponseEntity<>(
                productService.updateProductImage(productId, image),
                HttpStatus.OK
        );
    }
}
