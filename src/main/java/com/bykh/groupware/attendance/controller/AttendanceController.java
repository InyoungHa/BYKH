package com.bykh.groupware.attendance.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.attendance.service.AttendanceService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/attendance")
public class AttendanceController {
	@Resource(name = "attendanceService")
	private  AttendanceService attendanceService;

	
	// 근태관리 출퇴근기록 페이지(메인)
	@GetMapping("/commute")
	public String commute() {
		return "content/attendance/commute";
	}

	// 근태관리 휴가관리 페이지
	@GetMapping("/vacation")
	public String vacation() {

		return "content/attendance/vacation";
	}

	// 근태관리 연장근무관리 페이지
	@GetMapping("/overTime")
	public String overTime() {

		return "content/attendance/overTime";
	}
		
	// 캘린더 페이지 이동
	@GetMapping("/calender")
	public String calender() {

		return "content/attendance/calender";
	}
	

	// 휴가신청 페이지 이동
	@GetMapping("/vacationRequest")
	public String vacationRequest() {

	return "content/attendance/vacationRequest";
	}
	
	
		
}
