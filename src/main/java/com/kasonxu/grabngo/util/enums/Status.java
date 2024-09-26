package com.kasonxu.grabngo.util.enums;

public enum Status {
    RUNNING("RUNNING"),
    STOPPED("STOPPED"),
    ERROR("ERROR"),
    DISABLED("DISABLED"),
    VERIFYING("VERIFYING");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
