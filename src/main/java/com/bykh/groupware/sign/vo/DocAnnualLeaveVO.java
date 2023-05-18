package com.bykh.groupware.sign.vo;

import groovy.transform.ToString;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ToString
public class DocAnnualLeaveVO {
	private int dalNo;
	private int docNo;
	private int dtNo;
	private String dalType;
	private String startDate;
	private String endDate;
	private String startTime;
	private String endTime;
	private int leaveDays;
	private String leaveReason;
	
	private SignDocVO signDocVO;
}
