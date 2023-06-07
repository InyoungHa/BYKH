package com.bykh.groupware.resource.vo;

import java.util.Date;

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
}


