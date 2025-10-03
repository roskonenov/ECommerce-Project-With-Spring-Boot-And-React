package com.ecommerce.project.payload;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CategoryDTO {

    private Long id;

    private String name;
}
