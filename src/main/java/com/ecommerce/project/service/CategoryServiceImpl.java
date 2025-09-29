package com.ecommerce.project.service;

import com.ecommerce.project.model.Category;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private List<Category> categories = new ArrayList<>();
    private Long nextId = 1L;

    @Override
    public List<Category> getAll() {
        return categories;
    }

    @Override
    public Category addCategory(Category category) {
        categories.add(category.setId(nextId++));
        return category;
    }

    @Override
    public Category updateCategory(long categoryId, Category category) {
        return categories.stream()
                .filter(c -> c.getId() == categoryId)
                .findFirst()
                .map(c -> c.setName(category.getName()))
                .orElse(null);
    }

    @Override
    public Category deleteCategory(long categoryId) {
        Category category = categories.stream()
                .filter(c -> c.getId() == categoryId)
                .findFirst()
                .orElse(null);

        if (category != null) {
            categories.remove(category);
        }
        return category;
    }
}
