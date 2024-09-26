package com.kasonxu.grabngo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kasonxu.grabngo.util.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "plugin")
public class Plugin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "url")
    private String url; // without trailing slash

    @Column(name = "username")
    private String username;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @JsonIgnore
    @Column
    private String token;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "message")
    private String message;

    @Column(name = "created")
    private Date created;

    @Column(name = "updated")
    private Date updated;

    @PrePersist
    protected void onCreate() {
        this.created = new Date();
        this.updated = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated = new Date();
    }

    public Plugin(String name) {
        this.name = name;
        this.status = Status.DISABLED;
        this.message = this.name + " Configuration";
    }
}
