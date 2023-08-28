package com.app.backend.controlleradvice;

import java.sql.Timestamp;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
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

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ExceptionResponse> argumentNotValid(MethodArgumentNotValidException exception) {
                ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .timestamp(new Timestamp(System.currentTimeMillis()).toString())
                                .build();

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(exceptionResponse);
        }

        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ExceptionResponse> duplicateEntry(
                        DataIntegrityViolationException exception) {

                ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .timestamp(new Timestamp(System.currentTimeMillis()).toString())
                                .build();

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(exceptionResponse);
        }

        @ExceptionHandler(TransactionSystemException.class)
        public ResponseEntity<ExceptionResponse> emptyRequests(
                        TransactionSystemException exception) {

                ExceptionResponse exceptionResponse = ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .timestamp(new Timestamp(System.currentTimeMillis()).toString())
                                .build();

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(exceptionResponse);
        }

}
