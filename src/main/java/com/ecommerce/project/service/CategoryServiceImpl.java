package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
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

        categoryRepository.findByName(category.getName())
                .ifPresent( existingCategory -> {
                    throw new APIException("Category with name \"" + category.getName() + "\" already exists");
                });

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        return categoryRepository.findById(categoryId)
                .map(c -> c.setName(category.getName()))
                .map(categoryRepository::save)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId));
    }

    @Override
    public Category deleteCategory(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .map(categoryRepository::deleteByCategory)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId));
    }
}
