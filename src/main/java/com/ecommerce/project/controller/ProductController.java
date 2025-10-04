package com.ecommerce.project.controller;

import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> createProduct(
            @PathVariable Long categoryId,
            @RequestBody ProductDTO productDTO
    ) {
        return new ResponseEntity<>(
                productService.createProduct(categoryId, productDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse> getProducts() {
        return new ResponseEntity<>(
                productService.getAllProducts(),
                HttpStatus.OK
        );
    }

    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductsByCategory(
            @PathVariable Long categoryId
    ) {
        return new ResponseEntity<>(
                productService.getAllProductsByCategory(categoryId),
                HttpStatus.OK
        );
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getProductsByKeyword(
            @PathVariable String keyword
    ) {
        return new ResponseEntity<>(
                productService.getAllProductsByKeyword(keyword),
                HttpStatus.OK
        );
    }
}
