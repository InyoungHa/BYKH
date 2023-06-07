package com.bykh.groupware.admin.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.util.DateUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class adminController {
	@Resource(name = "attendanceService")
	private  AttendanceService attendanceService;

	
	//메인페이지이동
	@GetMapping("/main")
	public String main(Model model, AttendanceVO attendanceVO, Authentication authentication) {
		String nowDate = DateUtil.getNowDateToString(); //오늘날짜설정
		if(attendanceVO.getCurDate() == null) {
			attendanceVO.setCurDate(nowDate);
		}	
		
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
		
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));
		
		return "content/main";
	}

}
