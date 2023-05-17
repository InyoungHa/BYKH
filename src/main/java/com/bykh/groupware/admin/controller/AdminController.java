package com.bykh.groupware.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.admin.service.AdminService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Resource(name = "adminService")
	private AdminService adminService;
	
	
	//근태관리 출퇴근기록 페이지(메인)
	@GetMapping("/commute")
	public String commute() {
		return "content/attendance/commute";
	}
	
	//근태관리 휴가관리 페이지
	@GetMapping("/vacation")
	public String vacation() {
		
		return "content/attendance/vacation";
	}
	
	
	//근태관리 연장근무관리 페이지
		@GetMapping("/overTime")
		public String overTime() {
			
			return "content/attendance/overTime";
		}
}
