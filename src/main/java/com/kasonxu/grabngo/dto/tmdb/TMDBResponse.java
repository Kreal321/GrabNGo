package com.kasonxu.grabngo.dto.tmdb;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TMDBResponse {
    private boolean success;
    private String status_code;
    private String status_message;
}
