package com.ecommerce.project.service;

import com.ecommerce.project.payload.dto.OrderDTO;
import com.ecommerce.project.payload.dto.OrderRequestDTO;
import jakarta.transaction.Transactional;

public interface OrderService {

    @Transactional
    OrderDTO placeOrder(String paymentMethod, OrderRequestDTO orderRequestDTO);
}
