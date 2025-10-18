package com.ecommerce.project.service;

import com.ecommerce.project.payload.dto.CategoryDTO;
import com.ecommerce.project.payload.response.CategoryResponse;

public interface CategoryService {

    CategoryResponse getAll(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    CategoryDTO addCategory(CategoryDTO categoryDTO);

    CategoryDTO updateCategory(Long categoryId, CategoryDTO categoryDTO);

    CategoryDTO deleteCategory(Long categoryId);
}
