package com.ecommerce.project.service.impl;

import com.ecommerce.project.payload.response.AnalyticsResponse;
import com.ecommerce.project.repositories.OrderRepository;
import com.ecommerce.project.repositories.ProductRepository;
import com.ecommerce.project.service.AnalyticsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AnalyticsServiceImpl(ProductRepository productRepository, OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public AnalyticsResponse getAnalyticsData() {
        return new AnalyticsResponse()
                .setProductCount(String.valueOf(productRepository.count()))
                .setTotalOrders(String.valueOf(orderRepository.count()))
                .setTotalRevenue(String.valueOf(
                        Optional.ofNullable(orderRepository.getTotalRevenue())
                                .orElse(0.0)));
    }
}
