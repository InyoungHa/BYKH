package com.bykh.groupware.attendance.service;

import java.util.List;

import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.vo.DocAnnualLeaveVO;

public interface AttendanceService {
	
	
	//이름조회
	AttendanceVO selectName(int empno);
	
	//ATT_CODE 최신 첫번쨰 조회
	AttendanceVO selectAtt(int empno);
	
	//출근시간저장
	void goWork(int empno);
	
	//퇴근시간저장
	void outWork(AttendanceVO attendanceVO);
	
	//제일최신 출근시간 조회
	AttendanceVO selectGowork(int empno);
	
	//제일최신 퇴근시간 조회
	AttendanceVO selectOutwork(int empno);
	
	//지각횟수 조회
	AttendanceVO selectLateCount(int empno);
	
	//근무일수 조회
	AttendanceVO checkDays(int empno);
	
	//총근무시간 조회(한달)
	AttendanceVO totalWorkingTime(int empno);
	
	//총연장근무시간 조회(한달)
	AttendanceVO findOverTime(int empno);
	
	//연장근무가능시간 조회 
	AttendanceVO findCanOverTime(int empno);
	
	//결근 횟수조회(한달)
	AttendanceVO findLateCount(int empno);
	
	//출퇴근 기록 게시판 조회 (최근5일)
	List<AttendanceVO> workingBoard(int empno);

	//출퇴근 기록 게시판 조회 (전체)
	List<AttendanceVO> workingBoardAll(int empno);
	
	// 이번달 사용한 연차개수 
	DocAnnualLeaveVO selectCountVacation(int empno);
	
	// 이번달 사용한 반차개수 
	DocAnnualLeaveVO selectCountHalfVacation(int empno);
	
	// 이번달 사용한 총휴가개수 
	DocAnnualLeaveVO selectAllVacation(int empno);
	
	//휴가사용내역 테이블 조회
	List<DocAnnualLeaveVO> selectListVacation(int empno);
	
	//휴가사용내역 테이블 조회
	List<DocAnnualLeaveVO> selectListVacation2(int empno);
	
}


