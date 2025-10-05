package com.ecommerce.project.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "imgbb.api")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImgbbConfig {

    private String key;

    private String url;
}
