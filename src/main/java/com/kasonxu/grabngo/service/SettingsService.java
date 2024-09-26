package com.kasonxu.grabngo.service;

import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.dto.prowlarr.ProwlarrSystemStatus;
import com.kasonxu.grabngo.dto.request.PluginUpdateRequest;
import com.kasonxu.grabngo.exception.BadRequestException;
import com.kasonxu.grabngo.util.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsService {
    private final PluginService pluginService;
    private final ProwlarrService prowlarrService;

    @Autowired
    public SettingsService(PluginService pluginService, ProwlarrService prowlarrService) {
        this.pluginService = pluginService;
        this.prowlarrService = prowlarrService;
    }

    public List<Plugin> getPlugins() {
        return this.pluginService.findAll();
    }

    public Plugin getPlugin(String name) {
        return this.pluginService.findByName(name)
                .orElseThrow(() -> new BadRequestException("Plugin not found"));
    }

    public void updatePlugin(String name, PluginUpdateRequest pluginRequest) {
        if (name == null || !name.equals(pluginRequest.name())) {
            throw new BadRequestException("Plugin name does not match");
        }
        Plugin plugin = this.pluginService.findByName(name)
                .orElseThrow(() -> new BadRequestException("Plugin not found"));

        switch (name) {
            case "Prowlarr":
                plugin.setUrl(pluginRequest.url());
                plugin.setToken(pluginRequest.token());
                this.prowlarrService.verifyPlugin();
                break;
            default:
                throw new BadRequestException("Plugin not supported");
        }


    }

    public String updatePluginStatus(String name, String trigger) {
        Plugin plugin = this.pluginService.findByName(name)
                .orElseThrow(() -> new BadRequestException("Plugin not found"));
        if (trigger.equals("on")) {
            this.prowlarrService.verifyPlugin();
            return "Plugin " + name + " started";
        } else if (trigger.equals("off")) {
            plugin.setStatus(Status.STOPPED);
            this.pluginService.save(plugin);
            return "Plugin " + name + " stopped";
        } else {
            throw new BadRequestException("Trigger not supported");
        }
    }
}
