package com.ecommerce.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean(name = "imgbbRestClient")
    public RestClient imgbbRestClient(ImgbbConfig imgbbConfig) {
        return RestClient.builder()
                .baseUrl(imgbbConfig.getUrl())
                .build();

    }
}
