package com.kasonxu.grabngo.dto.alist;

import lombok.*;

import java.util.HashMap;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AListResponse {
    private int code;
    private String message;
    private HashMap<String, String> data;
}
