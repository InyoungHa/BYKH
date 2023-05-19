package com.bykh.groupware.attendance.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AttendanceVO {
	
	String workStatus; //근무상태
	String regDays; //등록날짜
	String workingTime; //출근시간
	String quittingTime; //퇴근시간
	String curDate; //현재시간
}
