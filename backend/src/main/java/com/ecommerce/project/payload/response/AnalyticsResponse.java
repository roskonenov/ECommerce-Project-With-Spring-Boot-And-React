package com.ecommerce.project.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class AnalyticsResponse {

    private String productCount;

    private String totalOrders;

    private String totalRevenue;
}
