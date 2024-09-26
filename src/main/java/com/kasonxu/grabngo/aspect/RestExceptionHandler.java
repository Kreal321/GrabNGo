package com.kasonxu.grabngo.aspect;

import com.kasonxu.grabngo.dto.response.DataResponse;
import com.kasonxu.grabngo.exception.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;

import java.net.UnknownHostException;

@ControllerAdvice
public class RestExceptionHandler {
    private static final Logger log = LogManager.getLogger(RestExceptionHandler.class);

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<DataResponse> handleInvalidFieldsInValidJson(final BadRequestException badRequestException) {
        return ResponseEntity.badRequest().body(DataResponse.builder()
                .success(false)
                .message(badRequestException.getMessage())
                .build());
    }
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<DataResponse> handleInvalidFieldsInValidJson(final NotFoundException notFoundException) {
        return ResponseEntity.status(404).body(DataResponse.builder()
                .success(false)
                .message(notFoundException.getMessage())
                .build());
    }
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<DataResponse> handleInvalidFieldsInValidJson(final UnauthorizedException unauthorizedException) {
        return ResponseEntity.status(401).body(DataResponse.builder()
                .success(false)
                .message(unauthorizedException.getMessage())
                .build());
    }
    @ExceptionHandler(InternalErrorException.class)
    public ResponseEntity<DataResponse> handleInvalidFieldsInValidJson(final InternalErrorException internalErrorException) {
        log.error(internalErrorException.getMessage(), internalErrorException);
        return ResponseEntity.status(500).body(DataResponse.builder()
                .success(false)
                .message("Internal error. 内部错误")
                .build());
    }
//    @ExceptionHandler(IllegalArgumentException.class)
//    public ResponseEntity<DataResponse> handleIllegalArgumentException(final IllegalArgumentException exception) {
//        return ResponseEntity.status(400).body(DataResponse.builder()
//                .success(false)
//                .message("Illegal Argument: " + exception.getMessage())
//                .build());
//    }
    @ExceptionHandler(UnknownHostException.class)
    public ResponseEntity<DataResponse> handleUnknownHostException(final UnknownHostException exception) {
        return ResponseEntity.status(400).body(DataResponse.builder()
                .success(false)
                .message("Unknown Host Name: " + exception.getMessage())
                .build());
    }
    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<DataResponse> handleHttpClientErrorException(final HttpClientErrorException exception) {
        String message = "Request Error: ";
        if (exception.getStatusCode().value() == 401) {
            message += "Username password invalid or API key invalid";
        } else {
            message += exception.getMessage();
        }
        return ResponseEntity.status(400).body(DataResponse.builder()
                .success(false)
                .message(message)
                .build());
    }
}
