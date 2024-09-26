package com.kasonxu.grabngo.dto.alist;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AListLoginRequest {
    private String username;
    private String password;
}
