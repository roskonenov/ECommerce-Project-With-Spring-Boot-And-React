package com.ecommerce.project.exceptions;

import org.springframework.http.HttpStatus;

import java.io.Serial;

public class APIException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 1L;

    private HttpStatus status;

    public APIException() {
    }

    public APIException(String message) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public APIException(String message, HttpStatus httpStatus) {
        super(message);
        this.status = httpStatus;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
