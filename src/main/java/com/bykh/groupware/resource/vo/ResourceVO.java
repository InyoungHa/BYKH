package com.bykh.groupware.resource.vo;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ResourceVO {
    private int id;
    private String title;
    private Date start;
    private Date end;
    private boolean allDay;
    private int type;
    private int empno;
    private String startDay;
    private String endDay;
    private String totalDuration;
    private String participant;
    private String resourceContent;

}


