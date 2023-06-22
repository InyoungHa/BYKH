package com.bykh.groupware;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;


@Controller
public class IndexController {
	
	//로그인 시 메인 페이지로 이동
	@GetMapping("/")
	public String index(Authentication authentication, HttpServletRequest request) {
		
		String path ="";
		
		//authentication이 null이면 로그인 안하거나, 로그아웃된 상태

		if(authentication == null) {
			path = "redirect:/user/log";
		}
		else {
			path = "redirect:/user/main";
		}
		
		return path;
	}
	
	//미인가 시 이동할 페이지
	@GetMapping("/accessDeny")
	public String accessDeny() {
		
		return "content/access_deny";
	}
	
	
}

