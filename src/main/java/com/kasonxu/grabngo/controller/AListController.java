package com.kasonxu.grabngo.controller;

import com.kasonxu.grabngo.dto.alist.OfflineDownloadRequest;
import com.kasonxu.grabngo.dto.response.DataResponse;
import com.kasonxu.grabngo.service.AListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plugins/alist")
public class AListController {
    private final AListService aListService;

    @Autowired
    public AListController(AListService aListService) {
        this.aListService = aListService;
    }

    @PostMapping("/offline-download")
    public ResponseEntity<DataResponse> offlineDownload(@RequestBody OfflineDownloadRequest request) {

        return ResponseEntity.ok(DataResponse.success("Offline download task added", this.aListService.offline_download(request)));
    }


}
