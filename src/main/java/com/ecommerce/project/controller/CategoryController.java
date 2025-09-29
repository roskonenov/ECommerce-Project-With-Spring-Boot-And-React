package com.ecommerce.project.controller;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.service.CategoryService;
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
        List<Category> categories = categoryService.getAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable long categoryId,
                                                   @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(categoryId, category);

        if (updatedCategory == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<Category> deleteCategory(@PathVariable long categoryId) {
        Category category = categoryService.deleteCategory(categoryId);

        if (category == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(category, HttpStatus.OK);
    }
}
