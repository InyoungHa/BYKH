package com.bykh.groupware.attendance.controller;


import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.vo.DocAnnualLeaveVO;
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
		int writerNo = Integer.parseInt(user.getUsername());
		
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));
		//출근시간 조회
		model.addAttribute("goWork",attendanceService.selectGowork(empno));
		//퇴근시간 조회
		model.addAttribute("outWork",attendanceService.selectOutwork(empno));
		//정상출근횟수 조회
		model.addAttribute("selectNomalCount",attendanceService.selectNomalCount(empno));
		//지각횟수 조회
		model.addAttribute("lateCount",attendanceService.selectLateCount(empno));
		//근무일수 조회
		model.addAttribute("workingDays",attendanceService.checkDays(empno));
		//총 근무시간 조회
		model.addAttribute("totalWorkingTime",attendanceService.totalWorkingTime(empno));
		//총 연장근무시간 조회
		model.addAttribute("findOverTime",attendanceService.findOverTime(empno));

		//이번달 사용한 연차개수
		model.addAttribute("vacation", attendanceService.selectCountVacation(writerNo));
		
		//이번달 사용한 반차개수
		model.addAttribute("halfVacation", attendanceService.selectCountHalfVacation(writerNo));
		
		
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
	public String vacation(AttendanceVO attendanceVO, Model model, Authentication authentication, EmpVO empVO) {
		String nowDate = DateUtil.getNowDateToString(); //오늘날짜설정	
		if(attendanceVO.getCurDate() == null) {
			attendanceVO.setCurDate(nowDate);
		}	
		
		User user = (User)authentication.getPrincipal();
		int writerNo = Integer.parseInt(user.getUsername());		
		int empno = Integer.parseInt(user.getUsername());
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));
		//이번달 사용한 총 휴가개수
		model.addAttribute("allVacation",  attendanceService.selectAllVacation(writerNo));
		
		//휴가사용내역 조회(최신5회)
		List<DocAnnualLeaveVO> vacList =  attendanceService.selectListVacation(writerNo);
		model.addAttribute("vacList", vacList); 
		
		//휴가사용내역 조회(전체)
		List<DocAnnualLeaveVO> vacList2 =  attendanceService.selectListVacation(writerNo);
		model.addAttribute("vacList2", vacList2); 
	
		return "content/attendance/vacation";
	}


		
	// 캘린더 페이지 이동
	@GetMapping("/calender")
	public String calender(AttendanceVO attendanceVO, Model model, Authentication authentication) {	
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
		
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));

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
	
	
	// 사원별 근태차트 이동
	@GetMapping("/workingChart")
	public String calender() {	


		return "content/attendance/workingChart";
	}
	
	
	//사원별 총근무시간 조회(차트용)
	@ResponseBody
	@PostMapping("/selectTotalChartAjax")
	public List<Map<String, Object>> selectTotalChartAjax() {
	List<Map<String, Object>> maplList = attendanceService.selectTotalChart();
	
	
	return maplList;
	}	

}
