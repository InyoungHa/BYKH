package com.bykh.groupware.attendance.service;

public interface AttendanceService {
	
	
	//출퇴근 시간 저장
	void regTime(String empNo);
	
	//현재시간
	void curTime();
	
}


