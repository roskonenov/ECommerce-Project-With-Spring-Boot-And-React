package com.ecommerce.project.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CartItemDTO {

    private Long id;

    private CartDTO cart;

    private ProductDTO product;

    private int quantity;

    private double discount;

    private double productPrice;
}
