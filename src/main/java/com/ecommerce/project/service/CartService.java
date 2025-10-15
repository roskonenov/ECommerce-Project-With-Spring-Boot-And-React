package com.ecommerce.project.service;

import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.ProductDTO;

import java.util.List;

public interface CartService {
    CartDTO addProductToCart(Long productId, Integer quantity);

    List<CartDTO> getAll();

    CartDTO getUsersCart();

    CartDTO updateProductQuantityInCart(Long productId, int quantity);

    CartDTO deleteProductFromCart(Long cartId, Long productId);

    void updateCartWithChangedProduct(Product product, Cart cart);
}
