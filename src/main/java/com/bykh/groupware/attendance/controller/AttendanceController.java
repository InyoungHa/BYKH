package com.bykh.groupware.attendance.controller;


import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.emp.vo.EmpVO;
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
	public String commute(AttendanceVO attendanceVO, Model model, Authentication authentication, EmpVO empVO) {
		String nowDate = DateUtil.getNowDateToString(); //오늘날짜설정	
		if(attendanceVO.getCurDate() == null) {
			attendanceVO.setCurDate(nowDate);
		}	
		
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
		
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));
		//출근시간 조회
		model.addAttribute("goWork",attendanceService.selectGowork(empno));
		//퇴근시간 조회
		model.addAttribute("outWork",attendanceService.selectOutwork(empno));
		//지각횟수 조회
		model.addAttribute("lateCount",attendanceService.selectLateCount(empno));
		//근무일수 조회
		model.addAttribute("workingDays",attendanceService.checkDays(empno));
		//총 근무시간 조회
		model.addAttribute("totalWorkingTime",attendanceService.totalWorkingTime(empno));
		//총 연장근무시간 조회
		model.addAttribute("findOverTime",attendanceService.findOverTime(empno));
		//결근 횟수 조회
		model.addAttribute("findLateTime",attendanceService.findLateCount(empno));
		
		//출퇴근 기록 게시판 조회(최근5일)
		List<AttendanceVO> attList =  attendanceService.workingBoard(empno);
		model.addAttribute("attList", attList); 
		
		//출퇴근 기록 게시판 조회(전체)
		List<AttendanceVO> attListAll =  attendanceService.workingBoardAll(empno);
		model.addAttribute("attListAll", attListAll); 
	
		
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
	public String goToWork(AttendanceVO attendanceVO, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
	
		attendanceService.goWork(empno);
	return "redirect:/user/main";
	}
	
	// 퇴근등록
	@RequestMapping("/outWork")
	public String outWork(Authentication authentication, AttendanceVO attendanceVO) {
	    User user = (User) authentication.getPrincipal();
	    int empno = Integer.parseInt(user.getUsername());
	    AttendanceVO attCode = attendanceService.selectAtt(empno);

	    attendanceVO.setEmpno(empno);
	    attendanceVO.setAttCode(attCode.getAttCode());

	    attendanceService.outWork(attendanceVO);

	    return "redirect:/user/main";
	}

}
