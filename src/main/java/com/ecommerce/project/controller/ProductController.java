package com.ecommerce.project.controller;

import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @RequestMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> createProduct(
        @PathVariable Long categoryId,
        @RequestBody ProductDTO productDTO
    ){
        return new ResponseEntity<>(
                productService.createProduct(categoryId, productDTO),
                HttpStatus.CREATED
        );
    }
}
