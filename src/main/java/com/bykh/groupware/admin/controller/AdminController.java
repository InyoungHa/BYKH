package com.bykh.groupware.admin.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.admin.service.AdminService;
import com.bykh.groupware.dept.service.DeptService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Resource(name = "adminService")
	private AdminService adminService;
	
	@Resource(name = "deptService")
	private DeptService deptService;
	
	//사원 관리 페이지로 이동
	@GetMapping("/empManage")
	private String empManage(Model model) {
		//부서 목록 조회 쿼리
		//model.addAttribute("deptList", deptService.selectDeptList());
		
		return "content/admin/emp_manage";
	}
	
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
