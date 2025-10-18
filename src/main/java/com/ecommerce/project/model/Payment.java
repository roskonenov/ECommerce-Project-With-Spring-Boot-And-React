package com.ecommerce.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "payment", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Order order;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "pg_payment_id", nullable = false)
    private String pgPaymentId;

    @Column(name = "pg_status", nullable = false)
    private String pgStatus;

    @Column(name = "pg_response_message", nullable = false)
    private String pgResponseMessage;

    @Column(name = "pg_name", nullable = false)
    private String pgName;
}
