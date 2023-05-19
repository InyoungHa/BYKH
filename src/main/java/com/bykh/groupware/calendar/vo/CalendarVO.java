package com.bykh.groupware.calendar.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CalendarVO {
	
	private int scheduleCode;
	private String eventName;
	private Date startDate;
	private Date endDate;
	private boolean allDay;
	


}



