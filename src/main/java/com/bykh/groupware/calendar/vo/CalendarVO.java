package com.bykh.groupware.calendar.vo;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CalendarVO {
    private int scheduleCode;
    private String eventName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean allDay;
}



