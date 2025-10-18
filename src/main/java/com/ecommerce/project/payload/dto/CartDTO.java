package com.ecommerce.project.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CartDTO {

    private Long id;

    private double totalPrice;

    private List<ProductDTO> products;
}
