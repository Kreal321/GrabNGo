package com.kasonxu.grabngo.service;

import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.dto.tmdb.TMDBResponse;
import com.kasonxu.grabngo.dto.tmdb.TMDBSearchResult;
import com.kasonxu.grabngo.exception.BadRequestException;
import com.kasonxu.grabngo.util.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TMDBService  extends PluginAbstractClass{

    @Autowired
    public TMDBService(RestTemplate restTemplate, PluginService pluginService) {
        super(restTemplate, pluginService, "TMDB");
    }

    @Override
    public void verifyAndConnect() {
        Plugin plugin = this.getPlugin();
        plugin.setStatus(Status.VERIFYING);
        this.pluginService.save(plugin);
        TMDBResponse response = this.restTemplate.getForObject(plugin.getUrl() + "/authentication?api_key=" + plugin.getToken(), TMDBResponse.class);
        if (response != null && response.isSuccess()) {
            plugin.setStatus(Status.CONNECTED);
            plugin.setMessage("Connected to TMDB");
        } else {
            plugin.setStatus(Status.ERROR);
            plugin.setMessage("Error: " + response.getStatus_message());
            this.pluginService.save(plugin);
            throw new BadRequestException("TMDB API Key error: " + response.getStatus_message());
        }
        plugin.setStatus(Status.CONNECTED);
        this.pluginService.save(plugin);
    }

    public TMDBSearchResult getTrendingMovies(int page, String language) {
        if (page < 1 || page > 500) {
            throw new BadRequestException("Invalid page number");
        }
        Plugin config = this.getConnectedPlugin();
        return this.restTemplate.getForObject(config.getUrl() + "/trending/movie/week?api_key=" + config.getToken() + "&page=" + page + "&language=" + language, TMDBSearchResult.class);
    }
}
