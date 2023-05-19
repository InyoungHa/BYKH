package com.bykh.groupware.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class adminController {
	
	//메인페이지이동
	@GetMapping("/main")
	public String main() {
		return "content/main";
	}

}
