package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {


    private final ModelMapper modelMapper;
    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryResponse getAll() {
        return new CategoryResponse()
                .setContent(
                        categoryRepository
                                .findAll()
                                .stream()
                                .map(category -> modelMapper.map(category, CategoryDTO.class))
                                .toList()
                );
    }

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {

        categoryRepository.findByName(categoryDTO.getName())
                .ifPresent(existingCategory -> {
                    throw new APIException("Category with name \"" + categoryDTO.getName() + "\" already exists");
                });

        return modelMapper.map(
                categoryRepository.save(modelMapper.map(categoryDTO, Category.class)),
                CategoryDTO.class
        );
    }

    @Override
    public CategoryDTO updateCategory(Long categoryId, CategoryDTO categoryDTO) {
        return modelMapper.map(
                categoryRepository.findById(categoryId)
                        .map(c -> c.setName(categoryDTO.getName()))
                        .map(categoryRepository::save)
                        .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId)),
                CategoryDTO.class);
    }

    @Override
    public CategoryDTO deleteCategory(Long categoryId) {
        return modelMapper.map(
                categoryRepository.findById(categoryId)
                        .map(categoryRepository::deleteByCategory)
                        .orElseThrow(() -> new ResourceNotFoundException("Category", "category id", categoryId)),
                CategoryDTO.class
        );
    }
}
