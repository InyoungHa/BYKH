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
	private int countVacation; //정운 컬럼추가함.
	private int countHalfVacation;// 정운 컬럼추가함.
	private double allVacation; //정운 컬럼추가
}
