package com.kasonxu.grabngo.service;

import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.dto.prowlarr.ProwlarrSearchResult;
import com.kasonxu.grabngo.dto.prowlarr.ProwlarrSystemStatus;
import com.kasonxu.grabngo.exception.BadRequestException;
import com.kasonxu.grabngo.util.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ProwlarrService {
    private final RestTemplate restTemplate;
    private final PluginService pluginService;

    @Autowired
    public ProwlarrService(RestTemplate restTemplate, PluginService pluginService) {
        this.restTemplate = restTemplate;
        this.pluginService = pluginService;
    }

    public void verifyPlugin() {
        Plugin plugin = this.getConfig();
        plugin.setStatus(Status.VERIFYING);
        this.pluginService.save(plugin);
        ProwlarrSystemStatus status = this.getSystemStatus();
        plugin.setMessage("System version: " + status.getVersion() + ", started at: " + status.getStartTime());
        plugin.setStatus(Status.RUNNING);
        this.pluginService.save(plugin);
    }

    public ProwlarrSystemStatus getSystemStatus() {
        Plugin config = this.getConfig();
        UriComponents uri = UriComponentsBuilder.fromHttpUrl(config.getUrl() + "/api/v1/system/status")
                .queryParam("apikey", config.getToken()).build();
        return this.restTemplate.getForObject(uri.toUri(), ProwlarrSystemStatus.class);
    }

    public ProwlarrSearchResult[] search(String query, int limit, int offset) {
        Plugin config = this.getConfig();
        UriComponents uri = UriComponentsBuilder.fromHttpUrl(config.getUrl() + "/api/v1/search")
                .queryParam("apikey", config.getToken())
                .queryParam("type","search")
                .queryParam("limit", limit)
                .queryParam("offset",offset).build();
        return this.restTemplate.getForObject(uri.toUri(), ProwlarrSearchResult[].class);
    }

    private Plugin getConfig() {
        Plugin config = this.pluginService.findByName("Prowlarr").orElseThrow(
                () -> new BadRequestException("Prowlarr plugin not found")
        );
        if (config.getStatus() == Status.ERROR) {
            throw new BadRequestException("Prowlarr plugin configuration error");
        }
        return config;
    }
}
