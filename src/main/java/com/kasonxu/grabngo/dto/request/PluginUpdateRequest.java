package com.kasonxu.grabngo.dto.request;

public record PluginUpdateRequest(
        long id,
        String name,
        String url,
        String username,
        String password,
        String token
) {
}
