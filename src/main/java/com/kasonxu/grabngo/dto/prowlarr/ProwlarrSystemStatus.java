package com.kasonxu.grabngo.dto.prowlarr;

import lombok.*;

import java.util.Date;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProwlarrSystemStatus {
    private String version;
    private Date startTime;
    private String appName;
}
