package com.kasonxu.grabngo.service;

import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.exception.BadRequestException;
import com.kasonxu.grabngo.util.enums.Status;
import org.springframework.web.client.RestTemplate;


public abstract class PluginAbstractClass {
    protected final RestTemplate restTemplate;
    protected final PluginService pluginService;
    private final String pluginName;

    public PluginAbstractClass(RestTemplate restTemplate, PluginService pluginService, String pluginName) {
        this.restTemplate = restTemplate;
        this.pluginService = pluginService;
        this.pluginName = pluginName;
    }

    protected Plugin getPlugin() {
        return this.pluginService.findByName(this.pluginName).orElseThrow(
                () -> new BadRequestException(this.pluginName + " plugin not found.")
        );
    }

    protected Plugin getConnectedPlugin() {
        Plugin plugin = this.getPlugin();

        if (plugin.getStatus() == Status.ERROR) {
            throw new BadRequestException(this.pluginName + " plugin configuration error");
        }
        return plugin;
    }

    public abstract void verifyAndConnect();
}
