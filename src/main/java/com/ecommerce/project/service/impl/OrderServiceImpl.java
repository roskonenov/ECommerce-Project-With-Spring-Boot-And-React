package com.ecommerce.project.service.impl;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.*;
import com.ecommerce.project.payload.dto.OrderDTO;
import com.ecommerce.project.payload.dto.OrderItemDTO;
import com.ecommerce.project.payload.dto.OrderRequestDTO;
import com.ecommerce.project.repositories.*;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.service.OrderService;
import com.ecommerce.project.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final CartService cartService;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final AuthUtil authUtil;
    private final ModelMapper modelMapper;

    @Override
    public OrderDTO placeOrder(String paymentMethod, OrderRequestDTO orderRequestDTO) {

        Cart cart = getUserCart();
        Address address = getUserAddress(orderRequestDTO.getAddressId());
        Order order = createNewOrder(address, cart);

        Payment payment = createNewPayment(paymentMethod, orderRequestDTO, order);
        Order savedOrder = orderRepository.save(order.setPayment(payment));

        List<OrderItem> orderItems = createOrderItems(cart, savedOrder);

        updateProductSockAndClearCart(cart);

        return mapOrderToDTO(orderRequestDTO.getAddressId(), savedOrder, orderItems);
    }

    private List<OrderItem> createOrderItems(Cart cart, Order savedOrder) {
        return orderItemRepository.saveAll(
                Optional.of(cart.getCartItems())
                        .filter(list -> !list.isEmpty())
                        .orElseThrow(() -> new APIException("Cart is empty"))
                        .stream()
                        .map(cartItem ->
                                new OrderItem()
                                        .setProduct(cartItem.getProduct())
                                        .setQuantity(cartItem.getQuantity())
                                        .setDiscount(cartItem.getDiscount())
                                        .setOrderedProductPrice(cartItem.getProductPrice())
                                        .setOrder(savedOrder))
                        .toList()
        );
    }

    private Payment createNewPayment(String paymentMethod, OrderRequestDTO orderRequestDTO, Order order) {
        return paymentRepository.save(
                new Payment()
                        .setOrder(order)
                        .setPaymentMethod(paymentMethod)
                        .setPgName(orderRequestDTO.getPgName())
                        .setPgStatus(orderRequestDTO.getPgStatus())
                        .setPgPaymentId(orderRequestDTO.getPgPaymentId())
                        .setPgResponseMessage(orderRequestDTO.getPgResponseMessage())
        );
    }

    private OrderDTO mapOrderToDTO(Long addressId, Order savedOrder, List<OrderItem> orderItems) {
        return modelMapper.map(savedOrder, OrderDTO.class)
                .setOrderItems(
                        orderItems
                                .stream()
                                .map(item -> modelMapper.map(item, OrderItemDTO.class))
                                .toList()
                )
                .setAddressId(addressId);
    }

    private Order createNewOrder(Address address, Cart cart) {
        return new Order()
                .setOrderDate(LocalDate.now())
                .setEmail(authUtil.loggedInUserEmail())
                .setAddress(address)
                .setStatus("Order accepted!")
                .setTotalAmount(cart.getTotalPrice());
    }

    private Address getUserAddress(Long addressId) {
        return addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "address id", addressId));
    }

    private Cart getUserCart() {
        return cartRepository.findByUserEmail(authUtil.loggedInUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "email", authUtil.loggedInUserEmail()));
    }

    private void updateProductSockAndClearCart(Cart cart) {
        cart.getCartItems()
                .forEach(item -> {
                    productRepository.save(item.getProduct()
                            .setQuantity(item.getProduct().getQuantity() - item.getQuantity()));
                    //Clear the Cart
                    cartService.deleteProductFromCart(cart.getId(), item.getProduct().getId());
                });
    }
}
