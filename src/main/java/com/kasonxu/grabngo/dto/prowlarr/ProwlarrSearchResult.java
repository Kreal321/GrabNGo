package com.kasonxu.grabngo.dto.prowlarr;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProwlarrSearchResult {
    private String guid;
    private String title;
    private int age;
    private long size;
    private String indexer;
}
