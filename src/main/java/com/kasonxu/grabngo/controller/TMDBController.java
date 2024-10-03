package com.kasonxu.grabngo.controller;

import com.kasonxu.grabngo.dto.response.DataResponse;
import com.kasonxu.grabngo.dto.tmdb.TMDBSearchResult;
import com.kasonxu.grabngo.service.TMDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plugins/tmdb")
public class TMDBController {
    private final TMDBService tmdbService;

    @Autowired
    public TMDBController(TMDBService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/trending/movies")
    public ResponseEntity<DataResponse> getTrendingMovies(@RequestParam(value = "page", defaultValue = "1") int page, @RequestParam(value = "language", defaultValue = "en-US") String language) {
        return ResponseEntity.ok(DataResponse.success("Trending movies", tmdbService.getTrendingMovies(page, language)));
    }
}
