package com.ecommerce.project.controller;

import com.ecommerce.project.payload.dto.OrderDTO;
import com.ecommerce.project.payload.dto.OrderRequestDTO;
import com.ecommerce.project.payload.dto.StripePaymentDTO;
import com.ecommerce.project.service.OrderService;
import com.ecommerce.project.service.StripeService;
import com.stripe.exception.StripeException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private final StripeService stripeService;

    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod,
                                               @Valid @RequestBody OrderRequestDTO orderRequestDTO) {
        return new ResponseEntity<>(
                orderService.placeOrder(paymentMethod, orderRequestDTO),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/orders/users/stripe-client-secret")
    public ResponseEntity<String> getClientSecret(@RequestBody StripePaymentDTO stripePaymentDTO) throws StripeException {
        System.out.println("StripePaymentDTO received " + stripePaymentDTO);
        return new ResponseEntity<>(
                stripeService.paymentIntent(stripePaymentDTO),
                HttpStatus.CREATED
        );
    }
}
