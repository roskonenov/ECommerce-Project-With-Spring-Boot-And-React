package com.ecommerce.project.service;

import com.ecommerce.project.payload.dto.OrderDTO;
import com.ecommerce.project.payload.dto.OrderRequestDTO;
import com.ecommerce.project.payload.dto.OrderStatusUpdateDTO;
import com.ecommerce.project.payload.response.OrderResponse;
import jakarta.transaction.Transactional;

public interface OrderService {

    @Transactional
    OrderDTO placeOrder(String paymentMethod, OrderRequestDTO orderRequestDTO);

    OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    OrderDTO updateOrder(Long orderId, OrderStatusUpdateDTO orderStatusUpdateDTO);
}
