package com.kasonxu.grabngo.service;

import com.kasonxu.grabngo.domain.Plugin;
import com.kasonxu.grabngo.repository.PluginRepository;
import com.kasonxu.grabngo.util.enums.Status;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@PropertySource("classpath:application.properties")
public class PluginService {
    private static final Logger log = LogManager.getLogger(PluginService.class);

    private final PluginRepository repository;
    private final String[] enabledPlugins;

    @Autowired
    public PluginService(PluginRepository repository, @Value("${grabngo.plugins.enabled}") String[] enabledPlugins) {
        this.repository = repository;
        this.enabledPlugins = enabledPlugins;
        this.init();
    }

    private void init() {
        if (this.enabledPlugins == null) {
            log.warn("No plugins enabled");
            return;
        }
        for (String name : this.enabledPlugins) {
            if (this.findByName(name).isEmpty()) {
                log.info("Plugin {} found, initialing...", name);
                this.save(new Plugin(name));
            }
        }
        log.info("Plugins: {} loaded", String.join(", ", this.enabledPlugins));
    }


    public Plugin save(Plugin plugin) {
        return this.repository.save(plugin);
    }

    public Optional<Plugin> findByName(String name) {
        return this.repository.findByName(name);
    }

    public List<Plugin> findAll() {
        return this.repository.findAll();
    }
}
