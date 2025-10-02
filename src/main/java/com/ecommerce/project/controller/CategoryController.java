package com.ecommerce.project.controller;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/public/categories")
    public ResponseEntity<List<Category>> getAllCategories() {

        return new ResponseEntity<>(
                categoryService.getAll(),
                HttpStatus.OK
        );
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<Category> addCategory(@Valid @RequestBody Category category) {

        return new ResponseEntity<>(
                categoryService.addCategory(category),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryId,
                                                   @RequestBody Category category) {

        return new ResponseEntity<>(
                categoryService.updateCategory(categoryId, category),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/admin/categories/{categoryI" +
            "d}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long categoryId) {

        return new ResponseEntity<>(
                categoryService.deleteCategory(categoryId),
                HttpStatus.OK
        );
    }
}
