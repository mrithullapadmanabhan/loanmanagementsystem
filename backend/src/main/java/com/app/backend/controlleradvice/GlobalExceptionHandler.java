package com.app.backend.controlleradvice;

import java.sql.Timestamp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.app.backend.communication.response.ExceptionResponse;
import com.app.backend.exception.ResourceNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponse> entityNotFound(
            ResourceNotFoundException exception) {

        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                .message(exception.getMessage())
                .timestamp(new Timestamp(System.currentTimeMillis()).toString())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exceptionResponse);
    }

}
