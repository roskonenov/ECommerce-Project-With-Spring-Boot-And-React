package com.ecommerce.project.repositories;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    default Product deleteByProduct(Product product) {
        deleteById(product.getId());
        return product;
    }

    Page<Product> findByCategory(Category category, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Optional<Product> findByName(String name);
}
