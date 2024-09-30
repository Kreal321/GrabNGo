package com.kasonxu.grabngo.dto.alist;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfflineDownloadRequest {
    private String delete_policy;
    private String path;
    private String tool;
    private String[] urls;
}
