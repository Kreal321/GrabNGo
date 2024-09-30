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

import java.util.Arrays;
import java.util.Comparator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ProwlarrService extends PluginAbstractClass {

    @Autowired
    public ProwlarrService(RestTemplate restTemplate, PluginService pluginService) {
        super(restTemplate, pluginService, "Prowlarr");
    }

    @Override
    public void verifyAndConnect() {
        Plugin plugin = this.getPlugin();
        plugin.setStatus(Status.VERIFYING);
        this.pluginService.save(plugin);

        try {
            ProwlarrSystemStatus status = this.getSystemStatus();
            plugin.setMessage("System version: " + status.getVersion() + ". Started at: " + status.getStartTime());
        } catch (IllegalArgumentException e) {
            plugin.setStatus(Status.ERROR);
            plugin.setMessage("Error: " + e.getMessage());
            this.pluginService.save(plugin);
            throw new BadRequestException("Prowlarr connection error: " + e.getMessage());
        }
        plugin.setStatus(Status.CONNECTED);
        this.pluginService.save(plugin);
    }

    // API Requests

    public ProwlarrSystemStatus getSystemStatus() {
        Plugin config = this.getPlugin();
        UriComponents uri = UriComponentsBuilder.fromHttpUrl(config.getUrl() + "/api/v1/system/status")
                .queryParam("apikey", config.getToken()).build();
        return this.restTemplate.getForObject(uri.toUri(), ProwlarrSystemStatus.class);
    }

    public ProwlarrSearchResult[] search(String query, int limit, int offset, boolean clean) {
        Plugin config = this.getConnectedPlugin();
        ProwlarrSearchResult[] results =this.restTemplate.getForObject(config.getUrl() + "/api/v1/search?apikey={apikey}&query={query}&type={type}&limit={limit}&offset={offset}", ProwlarrSearchResult[].class, config.getToken(), query, "search", limit, offset);
        if (clean && results != null) {
            Pattern pattern = Pattern.compile("DDHDTV|HDBTHD");
            Matcher matcher = null;
            for (ProwlarrSearchResult result : results) {
                matcher = pattern.matcher(result.getTitle());
                if (matcher.find()) {
                    result.setSuggested(true);
                }
                result.setTitle(result.getTitle().replaceAll("(【.*\\.com.*】)", ""));
            }
            Arrays.sort(results, Comparator.comparingInt(ProwlarrSearchResult::getAge));
            Arrays.sort(results, (a, b) -> Boolean.compare(b.isSuggested(), a.isSuggested()));
        }
        return results;
    }


}
