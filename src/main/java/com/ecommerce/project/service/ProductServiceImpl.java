package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

        checkIfProductExist(productDTO.getName());

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
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sorting = getSorting(sortBy, sortOrder);

        Page<Product> categoryPage = Optional.of(
                        productRepository
                                .findAll(PageRequest.of(pageNumber, pageSize, sorting))
                )
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException("No products found!", HttpStatus.OK));

        return new ProductResponse()
                .setContent(categoryPage
                        .stream()
                        .map(product -> modelMapper.map(product, ProductDTO.class))
                        .toList()
                ).setPageNumber(categoryPage.getNumber())
                .setPageSize(categoryPage.getSize())
                .setTotalElements(categoryPage.getTotalElements())
                .setTotalPages(categoryPage.getTotalPages())
                .setLastPage(categoryPage.isLast());
    }

    @Override
    public ProductResponse getAllProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sorting = getSorting(sortBy, sortOrder);

        Page<Product> productPage = Optional.of(
                        productRepository.findByCategoryOrderByPriceAsc(
                                categoryRepository.findById(categoryId)
                                        .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId)),
                                PageRequest.of(pageNumber, pageSize, sorting)
                        ))
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException("No products found!", HttpStatus.OK));

        return new ProductResponse()
                .setContent(productPage
                        .stream()
                        .map(product -> modelMapper.map(product, ProductDTO.class))
                        .toList()
                ).setPageNumber(productPage.getNumber())
                .setPageSize(productPage.getSize())
                .setTotalElements(productPage.getTotalElements())
                .setTotalPages(productPage.getTotalPages())
                .setLastPage(productPage.isLast());
    }

    @Override
    public ProductResponse getAllProductsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sorting = getSorting(sortBy, sortOrder);

        Page<Product> productPage = Optional.of(
                        productRepository.findByNameContainingIgnoreCase(
                                keyword,
                                PageRequest.of(pageNumber, pageSize, sorting)
                        )
                )
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException("No products found!", HttpStatus.OK));

        return new ProductResponse()
                .setContent(productPage
                        .stream()
                        .map(product -> modelMapper.map(product, ProductDTO.class))
                        .toList()
                ).setPageNumber(productPage.getNumber())
                .setPageSize(productPage.getSize())
                .setTotalElements(productPage.getTotalElements())
                .setTotalPages(productPage.getTotalPages())
                .setLastPage(productPage.isLast());
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        checkIfProductExist(productDTO.getName());
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

    private void checkIfProductExist(String name) {
        productRepository.findByName(name)
                .ifPresent(existingProduct -> {
                    throw new APIException("Product with name " + existingProduct.getName() + " already exists");
                });
    }

    private static Sort getSorting(String sortBy, String sortOrder) {
        return sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
    }
}
