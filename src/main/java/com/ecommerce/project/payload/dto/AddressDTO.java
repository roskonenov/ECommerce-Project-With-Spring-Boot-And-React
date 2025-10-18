package com.ecommerce.project.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {

    private Long id;

    private String country;

    private String city;

    private String state;

    private String street;

    private String building;

    private String apartment;

    private String postalCode;

}
