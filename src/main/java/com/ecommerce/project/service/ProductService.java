package com.ecommerce.project.service;

import com.ecommerce.project.payload.ProductDTO;

public interface ProductService {
    ProductDTO createProduct(Long categoryId, ProductDTO productDTO);
}
