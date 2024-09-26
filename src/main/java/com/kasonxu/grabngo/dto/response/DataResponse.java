package com.kasonxu.grabngo.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DataResponse {
    private boolean success;
    private String message;
    private Object data;


    public static DataResponse success(String message) {
        return DataResponse.builder()
                .success(true)
                .message(message)
                .build();
    }

    public static DataResponse success(String message, Object data) {
        return DataResponse.builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }
}
