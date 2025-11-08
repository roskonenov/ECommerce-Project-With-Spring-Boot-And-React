package com.ecommerce.project.exceptions;

import com.ecommerce.project.payload.response.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> myMethodArgumentNotValidException(MethodArgumentNotValidException err){
        return ResponseEntity
                .badRequest()
                .body(
                        err.getBindingResult()
                                .getFieldErrors()
                                .stream()
                                .collect(Collectors.toMap(
                                        FieldError::getField,
                                        FieldError -> Optional.ofNullable(FieldError.getDefaultMessage()).orElse("Validation Error"),
                                        (message1, message2) -> message1 + "; " + message2
                                ))
                );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<APIResponse> myResourceNotFoundException(ResourceNotFoundException err) {
        return new ResponseEntity<>(new APIResponse(err.getMessage(), false), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(APIException.class)
    public ResponseEntity<APIResponse> myAPIException(APIException err) {
        return new ResponseEntity<>(new APIResponse(err.getMessage(), false), err.getStatus());
    }
}
