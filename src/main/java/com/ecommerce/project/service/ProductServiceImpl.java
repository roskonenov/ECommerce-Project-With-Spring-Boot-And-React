package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ModelMapper modelMapper, ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.modelMapper = modelMapper;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductDTO createProduct(Long categoryId, ProductDTO productDTO) {
        return modelMapper.map(
                productRepository.save(
                        modelMapper.map(productDTO, Product.class)
                                .setImage("defaultImage")
                                .setSpecialPrice(calculateSpecialPrice(productDTO.getPrice(), productDTO.getDiscount()))
                                .setCategory(categoryRepository.findById(categoryId)
                                        .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId)))
                ),
                ProductDTO.class
        );
    }

    @Override
    public ProductResponse getAllProducts() {
        List<Product> products = productRepository.findAll();

        return new ProductResponse()
                .setContent(products
                        .stream()
                        .map(product -> modelMapper.map(product, ProductDTO.class))
                        .toList()
                );
    }

    @Override
    public ProductResponse getAllProductsByCategory(Long categoryId) {

        List<Product> products = productRepository.findByCategoryOrderByPriceAsc(
                categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId))
        );

        return new ProductResponse()
                .setContent(products
                        .stream()
                        .map(product -> modelMapper.map(product, ProductDTO.class))
                        .toList()
                );
    }

    @Override
    public ProductResponse getAllProductsByKeyword(String keyword) {

        List<Product> products = productRepository.findByNameContainingIgnoreCase(keyword);
        return new ProductResponse()
                .setContent(products
                        .stream()
                        .map(product -> modelMapper.map(product, ProductDTO.class))
                        .toList()
                );
    }

    private double calculateSpecialPrice(double price, double discount) {
        return price - (discount * 0.01) * price;
    }
}
