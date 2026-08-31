package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")

                        // React Vite frontend
                        .allowedOrigins(
                                "http://localhost:5173",
                                "http://127.0.0.1:5173"
                        )

                        // HTTP methods
                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS",
                                "PATCH"
                        )

                        // Request headers
                        .allowedHeaders("*")

                        // Allow cookies / authorization headers
                        .allowCredentials(true)

                        // Cache preflight response
                        .maxAge(3600);
            }
        };
    }
}