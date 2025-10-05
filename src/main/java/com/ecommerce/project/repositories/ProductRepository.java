package com.ecommerce.project.repositories;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    default Product deleteByProduct(Product product) {
        deleteById(product.getId());
        return product;
    }

    List<Product> findByCategoryOrderByPriceAsc(Category category);

    List<Product> findByNameContainingIgnoreCase(String name);
}
