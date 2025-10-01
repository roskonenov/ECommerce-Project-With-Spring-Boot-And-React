package com.ecommerce.project.service;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.repositories.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {


    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        return categoryRepository.save(
                categoryRepository
                        .findById(categoryId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"))
                        .setName(category.getName())
        );
    }

    @Override
    public Category deleteCategory(Long categoryId) {
        return categoryRepository.deleteByCategory(
                categoryRepository
                        .findById(categoryId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"))
        );
    }
}
