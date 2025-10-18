package com.ecommerce.project.payload.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;

    @Email(message = "Email should be valid")
    private String email;

    private List<OrderItemDTO> orderItems;

    private LocalDate orderDate;

    private PaymentDTO payment;

    private Double totalAmount;

    private String orderStatus;

    private Long addressId;
}
