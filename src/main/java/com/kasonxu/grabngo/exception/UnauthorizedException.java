package com.kasonxu.grabngo.exception;

import lombok.Getter;

@Getter
public class UnauthorizedException extends RuntimeException {
    private String userId;
    public UnauthorizedException(String message) {
        super(message);
    }
    public UnauthorizedException(String message, String userId) {
        super(message);
        this.userId = userId;
    }
}
