package com.ecommerce.project.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("JWT Bearer Token");

        SecurityRequirement bearerAuth = new SecurityRequirement()
                .addList("bearerAuth");

        return new OpenAPI()
                .info(new Info()
                        .title("Spring Boot Ecommerce API")
                        .description("This is a Spring Boot Ecommerce Project")
                        .contact(new Contact()
                                .name("Rosen Nenov")
                                .email("roskonenov@gmail.com")
                                .url("https://my-portfolio-2e76d.web.app/")
                        ))
                .externalDocs(new ExternalDocumentation()
                        .description("GitHub Project Repository")
                        .url("https://github.com/roskonenov/Spring-Boot-ECommerce-Project-Back-End"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", securityScheme))
                .addSecurityItem(bearerAuth);
    }
}
