package com.kasonxu.grabngo.dto.tmdb;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TMDBSearchResult {
    private int page;
    private int total_results;
    private int total_pages;
    private TMDBMovie[] results;
}
