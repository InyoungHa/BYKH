package com.bykh.groupware.attendance.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AttendanceVO {
	
private	String workStatus; //근무상태
private	String goWork; //출근
private	String outWork; //퇴근
private	String curDate; //현재시간
}


