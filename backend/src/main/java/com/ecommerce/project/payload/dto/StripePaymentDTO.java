package com.ecommerce.project.payload.dto;

import com.ecommerce.project.model.Address;
import lombok.Data;

@Data
public class StripePaymentDTO {

    public Long amount;

    public String currency;

    public String email;

    public String name;

    public AddressDTO address;

    public String description;
}
