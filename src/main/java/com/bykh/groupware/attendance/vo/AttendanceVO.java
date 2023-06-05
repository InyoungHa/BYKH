package com.bykh.groupware.attendance.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AttendanceVO {
	private String attCode;
	private	String goWork; //출근 DATE 정보
	private	String outWork; //퇴근 DATE 정보
	private	String curDate; //현재시간
	private	String empno;  
	private	int lateCount; //지각횟수
	private	int workingDays; //근무일수
	private	String overTime; //연장근무시간
	private	String fixTime; //고정시간
	private	String restTime; //점심시간(1시간)
	private	String workingStatus; // 1 정상출근 2 지각 3 결근 4 연차
	private	String working; //출근 년 월 일
	private	String day; //요일
	private	String workingTime; //출근 시간
	private	String outTime; //퇴근 시간 
	
	
	
	
	
	
	
}


