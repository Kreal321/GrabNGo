package com.kasonxu.grabngo.controller;

import com.kasonxu.grabngo.dto.response.DataResponse;
import com.kasonxu.grabngo.service.ProwlarrService;
import org.aspectj.lang.annotation.Around;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plugins/prowlarr")
public class ProwlarrController {
    private final ProwlarrService prowlarrService;

    @Autowired
    public ProwlarrController(ProwlarrService prowlarrService) {
        this.prowlarrService = prowlarrService;
    }

    @GetMapping("/search")
    public ResponseEntity<DataResponse> search(@RequestParam("query") String query, @RequestParam("limit") int limit, @RequestParam("offset") int offset) {

        return ResponseEntity.ok(DataResponse.success("Search success", this.prowlarrService.search(query, limit, offset, true)));
    }
}
