package com.kasonxu.grabngo.dto.tmdb;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TMDBMovie {
    private String backdrop_path;
    private String poster_path;
    private String original_title;
    private String overview;
    private String release_date;
    private int id;
    private String title;
    private double vote_average;
    private int vote_count;
    private String original_language;
    private String media_type;
}
