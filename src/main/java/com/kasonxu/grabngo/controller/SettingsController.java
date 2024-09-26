package com.kasonxu.grabngo.controller;

import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.dto.request.PluginUpdateRequest;
import com.kasonxu.grabngo.dto.response.DataResponse;
import com.kasonxu.grabngo.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/settings")
public class SettingsController {
    private final SettingsService settingsService;

    @Autowired
    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping("/plugins")
    public ResponseEntity<DataResponse> getPlugins() {
        return ResponseEntity.ok(DataResponse.success("Get plugins success", this.settingsService.getPlugins()));
    }

    @GetMapping("/plugins/{name}")
    public ResponseEntity<DataResponse> getPlugin(@PathVariable("name") String name) {
        return ResponseEntity.ok(DataResponse.success("Get plugin success", this.settingsService.getPlugin(name)));
    }

    @PutMapping("/plugins/{name}")
    public ResponseEntity<DataResponse> updatePlugin(@PathVariable("name") String name, @RequestBody PluginUpdateRequest plugin) {
        this.settingsService.updatePlugin(name, plugin);
        return ResponseEntity.ok(DataResponse.success("Plugin updated"));
    }

    @PatchMapping("/plugins/{name}/{trigger}")
    public ResponseEntity<DataResponse> updatePluginStatus(@PathVariable("name") String name, @PathVariable("trigger") String trigger) {
        return ResponseEntity.ok(DataResponse
                .success(this.settingsService.updatePluginStatus(name, trigger))
        );
    }
}
