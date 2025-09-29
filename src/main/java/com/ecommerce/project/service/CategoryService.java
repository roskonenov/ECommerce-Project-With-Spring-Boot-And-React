package com.ecommerce.project.service;

import com.ecommerce.project.model.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAll();

    Category addCategory(Category category);

    Category updateCategory(long categoryId, Category category);

    Category deleteCategory(long categoryId);
}
