package com.ecommerce.project.service;

import com.ecommerce.project.payload.dto.StripePaymentDTO;
import com.stripe.exception.StripeException;

public interface StripeService {

    String paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException;
}
