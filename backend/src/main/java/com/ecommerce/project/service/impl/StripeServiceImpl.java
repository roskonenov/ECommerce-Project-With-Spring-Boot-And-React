package com.ecommerce.project.service.impl;

import com.ecommerce.project.payload.dto.StripePaymentDTO;
import com.ecommerce.project.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    private void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public String paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException {

        List<Customer> customers = getCustomerList(stripePaymentDTO);

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(stripePaymentDTO.getAmount())
                        .setCurrency(stripePaymentDTO.getCurrency())
                        .setCustomer(
                                customers.isEmpty()
                                        ? createCustomer(stripePaymentDTO).getId()
                                        : customers.get(0).getId()
                        )
                        .setDescription(stripePaymentDTO.getDescription())
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        return PaymentIntent.create(params).getClientSecret();
    }

    private static Customer createCustomer(StripePaymentDTO stripePaymentDTO) throws StripeException {
        return Customer
                .create(CustomerCreateParams
                        .builder()
                        .setName(stripePaymentDTO.getName())
                        .setEmail(stripePaymentDTO.getEmail())
                        .setAddress(CustomerCreateParams
                                .Address
                                .builder()
                                .setPostalCode(stripePaymentDTO.getAddress().getPostalCode())
                                .setCountry(stripePaymentDTO.getAddress().getCountry())
                                .setState(stripePaymentDTO.getAddress().getState())
                                .setCity(stripePaymentDTO.getAddress().getCity())
                                .setLine1(stripePaymentDTO.getAddress().getStreet())
                                .setLine2(stripePaymentDTO.getAddress().getBuilding() + " " + stripePaymentDTO.getAddress().getApartment())
                                .build())
                        .build());
    }

    private static List<Customer> getCustomerList(StripePaymentDTO stripePaymentDTO) throws StripeException {
        return Customer
                .search(CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + stripePaymentDTO.getEmail() + "'")
                        .build())
                .getData();
    }
}
