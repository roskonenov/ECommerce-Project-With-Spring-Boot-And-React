package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageService imageService;

    public ProductServiceImpl(ModelMapper modelMapper, ProductRepository productRepository, CategoryRepository categoryRepository, ImageService imageService) {
        this.modelMapper = modelMapper;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.imageService = imageService;
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

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        return modelMapper.map(
                productRepository.findById(productId)
                        .map(product -> {
                            product.setName(productDTO.getName())
                                    .setDescription(productDTO.getDescription())
                                    .setQuantity(productDTO.getQuantity())
                                    .setPrice(productDTO.getPrice())
                                    .setDiscount(productDTO.getDiscount())
                                    .setSpecialPrice(calculateSpecialPrice(productDTO.getPrice(), productDTO.getDiscount()));
                            return product;
                        })
                        .map(productRepository::save)
                        .orElseThrow(() -> new ResourceNotFoundException("Product", "product id", productId)),
                ProductDTO.class
        );
    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        return modelMapper.map(
                productRepository.findById(productId)
                        .map(productRepository::deleteByProduct)
                        .orElseThrow(() -> new ResourceNotFoundException("Product", "product id", productId)),
                ProductDTO.class
        );
    }

    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "product id", productId));

        String imagePath = imageService.uploadImage(image);

        return modelMapper.map(
                productRepository.save(product.setImage(imagePath)),
                ProductDTO.class);
    }

    private double calculateSpecialPrice(double price, double discount) {
        return price - (discount * 0.01) * price;
    }
}
