package com.kasonxu.grabngo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
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


@Service
public class AListService extends PluginAbstractClass{

    @Autowired
    public AListService(RestTemplate restTemplate, PluginService pluginService) {
        super(restTemplate, pluginService, "AList");
    }

    @Override
    public void verifyAndConnect() {
        Plugin plugin = this.getPlugin();
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
            plugin.setStatus(Status.CONNECTED);
            this.pluginService.save(plugin);
        } catch (JsonProcessingException e) {
            throw new BadRequestException("AList connection error, cannot get user info.");
        }

    }
}
