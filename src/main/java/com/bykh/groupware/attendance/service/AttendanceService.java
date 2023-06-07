package com.bykh.groupware.attendance.service;

import java.util.List;

import com.bykh.groupware.attendance.vo.AttendanceVO;

public interface AttendanceService {
	
	
	//출근시간저장
	void goWork();
	
	//퇴근시간저장
	void outWork();
	
	//제일최신 출근시간 조회
	AttendanceVO selectGowork();
	
	//제일최신 퇴근시간 조회
	AttendanceVO selectOutwork();
	
	//지각횟수 조회
	AttendanceVO selectLateCount();
	
	//근무일수 조회
	AttendanceVO checkDays();
	
	//총근무시간 조회(한달)
	AttendanceVO totalWorkingTime();
	
	//총연장근무시간 조회(한달)
	AttendanceVO findOverTime();
	
	//결근 횟수조회(한달)
	AttendanceVO findLateCount();
	
	//출퇴근 기록 게시판 조회 (최근5일)
	List<AttendanceVO> workingBoard();

	//출퇴근 기록 게시판 조회 (전체)
	List<AttendanceVO> workingBoardAll();
	
	
}


