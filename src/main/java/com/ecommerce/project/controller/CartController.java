package com.ecommerce.project.controller;

import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productId,
                                                    @PathVariable Integer quantity) {
        return new ResponseEntity<>(
                cartService.addProductToCart(productId, quantity),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<CartDTO>> getAllCarts() {
        return new ResponseEntity<>(
                cartService.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/users/cart")
    public ResponseEntity<CartDTO> getLoggedUsersCart() {
        return new ResponseEntity<>(
                cartService.getUsersCart(),
                HttpStatus.OK
        );
    }

    @PutMapping("/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long productId,
                                                     @PathVariable String operation) {
        return new ResponseEntity<>(
                cartService.updateProductQuantityInCart(productId,
                        operation.equalsIgnoreCase("update") ? 1 : -1),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{cartId}/product/{productId}")
    public ResponseEntity<CartDTO> deleteProductFromCart(@PathVariable Long cartId,
                                                         @PathVariable Long productId) {
        return new ResponseEntity<>(
                cartService.deleteProductFromCart(cartId, productId),
                HttpStatus.OK
        );
    }
}
