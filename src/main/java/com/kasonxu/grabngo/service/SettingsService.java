package com.kasonxu.grabngo.service;

import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.dto.request.PluginUpdateRequest;
import com.kasonxu.grabngo.exception.BadRequestException;
import com.kasonxu.grabngo.util.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsService {
    private final PluginService pluginService;
    private final ProwlarrService prowlarrService;
    private final AListService aListService;
    private final TMDBService tmdbService;

    @Autowired
    public SettingsService(ProwlarrService prowlarrService, AListService aListService, TMDBService tmdbService, PluginService pluginService) {
        this.prowlarrService = prowlarrService;
        this.aListService = aListService;
        this.tmdbService = tmdbService;
        this.pluginService = pluginService;
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
                this.prowlarrService.verifyAndConnect();
                break;
            case "AList":
                plugin.setUrl(pluginRequest.url());
                plugin.setUsername(pluginRequest.username());
                plugin.setPassword(pluginRequest.password());
                this.aListService.verifyAndConnect();
                break;
            case "TMDB":
                plugin.setUrl(pluginRequest.url());
                plugin.setToken(pluginRequest.token());
                this.tmdbService.verifyAndConnect();
                break;
            default:
                throw new BadRequestException("Plugin " + name + " not supported");
        }


    }

    public String updatePluginStatus(String name, String trigger) {
        Plugin plugin = this.pluginService.findByName(name)
                .orElseThrow(() -> new BadRequestException("Plugin not found"));
        if (trigger.equals("on")) {
            switch (name) {
                case "Prowlarr":
                    this.prowlarrService.verifyAndConnect();
                    break;
                case "AList":
                    this.aListService.verifyAndConnect();
                    break;
                case "TMDB":
                    this.tmdbService.verifyAndConnect();
                    break;
                default:
                    throw new BadRequestException("Plugin " + name + " not supported");
            }
            return "Plugin " + name + " started";
        } else if (trigger.equals("off")) {
            plugin.setStatus(Status.NOT_CONNECTED);
            this.pluginService.save(plugin);
            return "Plugin " + name + " stopped";
        } else {
            throw new BadRequestException("Trigger not supported");
        }
    }
}
