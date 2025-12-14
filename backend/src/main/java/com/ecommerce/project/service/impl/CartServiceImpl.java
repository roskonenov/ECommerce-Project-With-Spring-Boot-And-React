package com.ecommerce.project.service.impl;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.dto.CartDTO;
import com.ecommerce.project.payload.dto.CartItemDTO;
import com.ecommerce.project.payload.dto.ProductDTO;
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
        Cart cart = getLoggedUsersCart();

        Product product = getValidProduct(productId, quantity);

        validateCartItem(productId, cart);

        CartItem cartItem = saveNewCartItem(quantity, cart, product);

//        Optional reducing to product quantity, depends on application logic!!!
//        product.setQuantity(product.getQuantity() - quantity);
        cart.getCartItems().add(cartItem);
        cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));

        return mapCartToDTO(cartRepository.save(cart));
    }

    private Cart getLoggedUsersCart() {
        return cartRepository
                .findByUserEmail(authUtil.loggedInUserEmail())
                .orElseGet(() -> cartRepository
                        .save(new Cart()
                                .setUser(authUtil.loggedInUser())));
    }


    @Override
    @Transactional
    public CartDTO addAllProductsToCart(List<CartItemDTO> cartItems) {
        Cart cart = getLoggedUsersCart();
        cartItems
                .forEach(item -> {
                    Product product = getValidProduct(item.getProductId(), item.getQuantity());
                    validateCartItem(product.getId(), cart);
                    CartItem cartItem = saveNewCartItem(item.getQuantity(), cart, product);

//                  Optional reducing to product quantity, depends on application logic!!!
//                    product.setQuantity(product.getQuantity() - item.getQuantity());

                    cart.getCartItems().add(cartItem);
                    cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * item.getQuantity()));
                });
        return mapCartToDTO(cartRepository.save(cart));
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

    @Override
    public CartDTO getUsersCart() {
        return cartRepository
                .findByUserEmail(authUtil.loggedInUserEmail())
                .map(this::mapCartToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "user email", authUtil.loggedInUserEmail()));
    }

    @Override
    @Transactional
    public CartDTO updateProductQuantityInCart(Long productId, int quantity) {
        Cart cart = cartRepository
                .findByUserEmail(authUtil.loggedInUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "user email", authUtil.loggedInUserEmail()));

        Product product = getValidProduct(productId, quantity);

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new APIException("Product " + product.getName() + " does not exist in cart!"));

        CartItem savedCartItem = cartItemRepository.save(cartItem
                .setProductPrice(product.getSpecialPrice())
                .setQuantity(cartItem.getQuantity() + quantity)
                .setDiscount(product.getDiscount()));

        if (savedCartItem.getQuantity() <= 0) {
            cart.getCartItems().remove(savedCartItem);
        }

        return mapCartToDTO(
        cartRepository.save(cart
                        .setTotalPrice(cart.getTotalPrice() + savedCartItem.getProductPrice() * quantity))
        );
    }

    @Override
    @Transactional
    public CartDTO deleteProductFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cart id", cartId));

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cartId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "product id", productId));

        cart.setTotalPrice(cart.getTotalPrice() - cartItem.getProductPrice() * cartItem.getQuantity());

        cart.getCartItems().remove(cartItem);

        return mapCartToDTO(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public void updateCartWithChangedProduct(Product product, Cart cart) {

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElseThrow(() -> new APIException("Product " + product.getName() + " does not exist in cart!"));

        cartRepository.save(cart.setTotalPrice(
        cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity())
        + (product.getSpecialPrice() * cartItem.getQuantity())
        ));

        cartItemRepository.save(cartItem
                .setProductPrice(product.getSpecialPrice())
                .setDiscount(product.getDiscount()));
    }

    private Product getValidProduct(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "product id", productId));

        if (product.getQuantity() <= 0) {
            throw new APIException(product.getName() + " is not available");
        }
        if (product.getQuantity() < quantity) {
            throw new APIException("Please make an order of the " + product.getName()
            + " quantity less than or equal to " + product.getQuantity() + ".");
        }
        return product;
    }

    private CartItem saveNewCartItem(Integer quantity, Cart cart, Product product) {
        CartItem cartItem = cartItemRepository
                .save(new CartItem()
                        .setCart(cart)
                        .setProduct(product)
                        .setQuantity(quantity)
                        .setDiscount(product.getDiscount())
                        .setProductPrice(product.getSpecialPrice()));
        return cartItem;
    }

    private void validateCartItem(Long productId, Cart cart) {
        cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .ifPresent(item -> {
                    throw new APIException("Product " + item.getProduct().getName() + " already exists in cart!");
                });
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
