package com.kasonxu.grabngo.repository;

import com.kasonxu.grabngo.domain.Plugin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PluginRepository extends JpaRepository<Plugin, Long> {

    public Optional<Plugin> findByName(String name);
}
