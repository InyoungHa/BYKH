package com.bykh.groupware.sign.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DocAnnualLeaveVO {
	private int dalNo;
	private int docNo;
	private String dalType;
	private String startDate;
	private String endDate;
	private int startTime;
	private int endTime;
	private int leaveDays;
	private String leaveReason;
	
}
