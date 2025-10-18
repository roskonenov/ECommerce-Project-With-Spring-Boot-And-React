package com.ecommerce.project.service;

import com.ecommerce.project.payload.dto.OrderDTO;
import com.ecommerce.project.payload.dto.OrderRequestDTO;

public interface OrderService {
    OrderDTO placeOrder(String paymentMethod, OrderRequestDTO orderRequestDTO);
}
