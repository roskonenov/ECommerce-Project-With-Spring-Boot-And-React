package com.ecommerce.project.service.impl;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.dto.CategoryDTO;
import com.ecommerce.project.payload.response.CategoryResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {


    private final ModelMapper modelMapper;
    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryResponse getAll(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sorting = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Page<Category> categoryPage = Optional.of(
                        categoryRepository
                                .findAll(PageRequest.of(pageNumber, pageSize, sorting))
                )
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException("No categories found!", HttpStatus.OK));

        return new CategoryResponse()
                .setContent(categoryPage
                        .stream()
                        .map(category -> modelMapper.map(category, CategoryDTO.class))
                        .toList()
                )
                .setPageNumber(categoryPage.getNumber())
                .setPageSize(categoryPage.getSize())
                .setTotalElements(categoryPage.getTotalElements())
                .setTotalPages(categoryPage.getTotalPages())
                .setLastPage(categoryPage.isLast());
    }

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {

        chekIfCategoryExist(categoryDTO.getName());

        return modelMapper.map(
                categoryRepository.save(modelMapper.map(categoryDTO, Category.class)),
                CategoryDTO.class
        );
    }

    @Override
    public CategoryDTO updateCategory(Long categoryId, CategoryDTO categoryDTO) {

        chekIfCategoryExist(categoryDTO.getName());

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

    private void chekIfCategoryExist(String name) {
        categoryRepository.findByName(name)
                .ifPresent(existingCategory -> {
                    throw new APIException(String.format("Category with name '%s' already exists", existingCategory.getName()));
                });
    }
}
