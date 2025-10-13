package com.ecommerce.project.service.impl;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repositories.CartItemRepository;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.repositories.ProductRepository;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.util.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final ModelMapper modelMapper;

    private final AuthUtil authUtil;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        Cart cart = cartRepository
                .findByUserEmail(authUtil.loggedInUserEmail())
                .orElseGet(() -> cartRepository
                        .save(new Cart()
                                .setUser(authUtil.loggedInUser())));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "product id", productId));

        if (product.getQuantity() < quantity) {
            throw new APIException("Please make an order of the " + product.getName()
                    + " quantity less than or equal to " + product.getQuantity() + ".");
        }
        if (product.getQuantity() <= 0) {
            throw new APIException(product.getName() + " is not available");
        }

        cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .ifPresent(item -> {
                    throw new APIException("Product " + item.getProduct().getName() + " already exists in cart!");
                });

        CartItem cartItem = cartItemRepository
                .save(new CartItem()
                        .setCart(cart)
                        .setProduct(product)
                        .setQuantity(quantity)
                        .setDiscount(product.getDiscount())
                        .setProductPrice(product.getSpecialPrice()));

//        Optional reducing to quantity, depends on application logic!!!
//        product.setQuantity(product.getQuantity() - quantity);
        cart.getCartItems().add(cartItem);
        cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
        cartRepository.save(cart);

        return mapCartToDTO(cart);
    }

    @Override
    public List<CartDTO> getAll() {
        return Optional.of(cartRepository.findAll()
                        .stream()
                        .map(this::mapCartToDTO)
                        .toList()
                ).filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException("There are no existing carts"));
    }

    private CartDTO mapCartToDTO(Cart cart) {
        return modelMapper.map(cart, CartDTO.class)
                .setProducts(cart
                        .getCartItems()
                        .stream()
                        .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class)
                                .setQuantity(item.getQuantity()))
                        .toList());
    }
}
