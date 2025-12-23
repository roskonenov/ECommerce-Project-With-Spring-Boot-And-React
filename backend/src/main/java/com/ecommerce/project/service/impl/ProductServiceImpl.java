package com.ecommerce.project.service.impl;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.dto.ProductDTO;
import com.ecommerce.project.payload.response.ProductResponse;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.repositories.ProductRepository;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.service.ImageService;
import com.ecommerce.project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import static com.ecommerce.project.util.AppUtil.getSorting;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageService imageService;
    private final CartService cartService;
    private final CartRepository cartRepository;

    @Override
    public ProductDTO createProduct(Long categoryId, ProductDTO productDTO) {

        checkIfProductExist(productDTO, null);

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
    public ProductResponse getAllProducts(String category, String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sorting = getSorting(sortBy, sortOrder);

        Specification<Product> spec = generateProductQuerySpecification(category, keyword);

        Page<Product> productPage = Optional.of(
                        productRepository
                                .findAll(spec, PageRequest.of(pageNumber, pageSize, sorting))
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
    public ProductResponse getAllProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sorting = getSorting(sortBy, sortOrder);
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId));

        Page<Product> productPage = Optional.of(
                        productRepository.findByCategory(
                                category,
                                PageRequest.of(pageNumber, pageSize, sorting)
                        ))
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException(String.format("Category '%s' does not have any products!", category.getName()), HttpStatus.OK));

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
                .orElseThrow(() -> new APIException(String.format("No products found by keyword '%s'!", keyword), HttpStatus.OK));

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
        checkIfProductExist(productDTO, productId);
        return modelMapper.map(
                productRepository.findById(productId)
                        .map(product -> {
                            product.setName(productDTO.getName())
                                    .setDescription(productDTO.getDescription())
                                    .setQuantity(productDTO.getQuantity())
                                    .setPrice(productDTO.getPrice())
                                    .setDiscount(productDTO.getDiscount())
                                    .setSpecialPrice(calculateSpecialPrice(productDTO.getPrice(), productDTO.getDiscount()));

                            cartRepository.findCartsByProductId(productId)
                                    .ifPresent(carts -> carts
                                            .forEach(cart -> cartService
                                                    .updateCartWithChangedProduct(product, cart)));

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
                        .map(product -> {
                            cartRepository.findCartsByProductId(productId)
                                    .ifPresent(carts ->
                                            carts.forEach(cart -> cartService.deleteProductFromCart(cart.getId(), productId)));
                            productRepository.delete(product);
                            return product;
                        })
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

    private void checkIfProductExist(ProductDTO productDTO, Long productId) {
        productRepository.findByName(productDTO.getName())
                .filter(product -> !product.getId().equals(productId))
                .ifPresent(existingProduct -> {
                    throw new APIException("Product with name " + existingProduct.getName() + " already exists");
                });
    }

    private static Specification<Product> generateProductQuerySpecification(String category, String keyword) {
        Specification<Product> spec = Specification.unrestricted();

        spec = spec.and((root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isBlank()) return criteriaBuilder.conjunction();

            String escapedKeyword = keyword.toLowerCase()
                    .replace("\\", "\\\\")
                    .replace("%", "\\%")
                    .replace("_", "\\_");

            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")),
                    "%" + escapedKeyword + "%",
                    '\\'
            );
        }).and((root, query, criteriaBuilder) -> {
            if (category == null || category.isBlank()) return criteriaBuilder.conjunction();

            return criteriaBuilder.equal(root.get("category").get("name"), category);
        });
        return spec;
    }
}
