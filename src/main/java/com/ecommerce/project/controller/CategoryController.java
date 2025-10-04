package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {

        return new ResponseEntity<>(
                categoryService.getAll(pageNumber, pageSize, sortBy, sortOrder),
                HttpStatus.OK
        );
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryDTO> addCategory(@Valid @RequestBody CategoryDTO categoryDTO) {

        return new ResponseEntity<>(
                categoryService.addCategory(categoryDTO),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long categoryId,
                                                   @Valid @RequestBody CategoryDTO categoryDTO) {
        return new ResponseEntity<>(
                categoryService.updateCategory(categoryId, categoryDTO),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/admin/categories/{categoryI" +
            "d}")
    public ResponseEntity<CategoryDTO> deleteCategory(@PathVariable Long categoryId) {

        return new ResponseEntity<>(
                categoryService.deleteCategory(categoryId),
                HttpStatus.OK
        );
    }
}
