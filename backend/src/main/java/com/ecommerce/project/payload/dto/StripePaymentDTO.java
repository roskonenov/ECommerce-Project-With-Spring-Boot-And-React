package com.ecommerce.project.payload.dto;

import lombok.Data;

@Data
public class StripePaymentDTO {

    public Long amount;

    public String currency;
}
