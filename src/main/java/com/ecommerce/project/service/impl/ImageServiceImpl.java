package com.ecommerce.project.service.impl;

import com.ecommerce.project.config.ImgbbConfig;
import com.ecommerce.project.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageServiceImpl implements ImageService {

    private final RestClient restClient;

    private final ImgbbConfig imgbbConfig;

    private final ObjectMapper objectMapper;

    public ImageServiceImpl(@Qualifier("imgbbRestClient") RestClient restClient, ImgbbConfig imgbbConfig, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.imgbbConfig = imgbbConfig;
        this.objectMapper = objectMapper;
    }

    public String uploadImage(MultipartFile file) throws IOException {

        ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", resource);
        body.add("key", imgbbConfig.getKey());

        String response = restClient
                .post()
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(String.class);

        return objectMapper.readTree(response)
                .path("data")
                .path("display_url")
                .asText();
    }
}
