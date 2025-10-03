package com.ecommerce.project.repositories;

import com.ecommerce.project.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    default Category deleteByCategory(Category category) {
        deleteById(category.getId());
        return category;
    }

    Optional<Category> findByName(String name);
}
