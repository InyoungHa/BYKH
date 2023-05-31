package com.bykh.groupware.attendance.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.util.DateUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/attendance")
public class AttendanceController {
	@Resource(name = "attendanceService")
	private  AttendanceService attendanceService;
	@Resource(name = "calendarService")
	private  CalendarService calendarService;
	
	// 근태관리 출퇴근기록 페이지(메인)
	@GetMapping("/commute")
	public String commute(AttendanceVO attendanceVO, Model model) {
		String nowDate = DateUtil.getNowDateToString(); //오늘날짜설정
		if(attendanceVO.getCurDate() == null) {
			attendanceVO.setCurDate(nowDate);
		}	
		//출근시간 조회
		model.addAttribute("goWork",attendanceService.selectGowork());
		//퇴근시간 조회
		model.addAttribute("outWork",attendanceService.selectOutwork());
		//지각횟수 조회
		model.addAttribute("lateCount",attendanceService.selectLateCount());
		//근무일수 조회
		model.addAttribute("workingDays",attendanceService.checkDays());
		
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
	
	
	
	//출근등록
	@RequestMapping("/goToWork")
	public String goToWork( AttendanceVO attendanceVO) {
	
		
		
		attendanceService.goWork();
	return "redirect:/admin/main";
	}
	
	//퇴근등록
	@RequestMapping("/outWork")
	public String outWork() {
		attendanceService.outWork();
	return "redirect:/admin/main";
	}	
}
