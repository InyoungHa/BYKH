package com.bykh.groupware;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;

import jakarta.annotation.Resource;

@Controller
public class IndexController {
	
	
	@GetMapping("/")
	public String index() {
		
		return "content/login";
	}
}
