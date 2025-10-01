package com.ecommerce.project.service;

import com.ecommerce.project.model.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAll();

    Category addCategory(Category category);

    Category updateCategory(Long categoryId, Category category);

    Category deleteCategory(Long categoryId);
}
