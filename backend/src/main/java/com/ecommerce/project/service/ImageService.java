package com.ecommerce.project.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    String uploadImage(MultipartFile image) throws IOException;
}
