package com.kasonxu.grabngo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.dto.alist.AListLoginRequest;
import com.kasonxu.grabngo.dto.alist.AListResponse;
import com.kasonxu.grabngo.exception.BadRequestException;
import com.kasonxu.grabngo.util.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.http.HttpResponse;


@Service
public class AListService {
    private final RestTemplate restTemplate;
    private final PluginService pluginService;

    @Autowired
    public AListService(RestTemplate restTemplate, PluginService pluginService) {
        this.restTemplate = restTemplate;
        this.pluginService = pluginService;
    }

    private Plugin getConfig() {
        Plugin config = this.pluginService.findByName("AList").orElseThrow(
                () -> new BadRequestException("AList plugin not found")
        );
        if (config.getStatus() == Status.ERROR) {
            throw new BadRequestException("AList plugin configuration error");
        }
        return config;
    }

    public void verifyAndRefreshToken() {
        Plugin plugin = this.getConfig();
        plugin.setStatus(Status.VERIFYING);
        this.pluginService.save(plugin);
        UriComponents uri = UriComponentsBuilder.fromHttpUrl(plugin.getUrl() + "/api/auth/login")
                .build();
        AListResponse response = this.restTemplate.postForObject(uri.toUri(), new AListLoginRequest(plugin.getUsername(), plugin.getPassword()), AListResponse.class);
        if (response.getCode() != 200|| response.getData() == null) {
            throw new BadRequestException("AList connection error: " + response.getMessage());
        }
        plugin.setToken(response.getData().get("token"));

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", plugin.getToken());
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");

        uri = UriComponentsBuilder.fromHttpUrl(plugin.getUrl() + "/api/me")
                .build();

        ResponseEntity<String> resp = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<>(headers), String.class);
        try {
            response = new ObjectMapper().readValue(resp.getBody(), AListResponse.class);
            if (resp.getStatusCode().isError()) {
                throw new BadRequestException("AList config error: " + response.getMessage());
            }
            if (!"2".equals(response.getData().get("role"))) {
                throw new BadRequestException("AList user is not an admin");
            }
            plugin.setStatus(Status.RUNNING);
            this.pluginService.save(plugin);
        } catch (JsonProcessingException e) {
            throw new BadRequestException("AList connection error, cannot get user info.");
        }

    }
}
