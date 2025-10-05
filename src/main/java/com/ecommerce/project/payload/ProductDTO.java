package com.ecommerce.project.payload;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;

    @NotBlank(message = "Product name cannot be blank")
    @Size(min = 3, max = 255, message = "Product name must be between 3 and 255 characters")
    private String name;

    private String image;

    @NotBlank(message = "Product description cannot be blank")
    @Size(min = 6, max = 1000, message = "Product description must be between 6 and 1000 characters")
    private String description;

    @PositiveOrZero(message = "Product quantity must be greater than or equal to 0")
    private Integer quantity;

    @NotNull(message = "Product price cannot be blank")
    @Positive(message = "Product price must be greater than 0")
    private Double price;

    @Min(value = 0, message = "Discount must be greater than or equal to 0")
    @Max(value = 100, message = "Discount must be less than or equal to 100")
    private Double discount;

    private Double specialPrice;
}
