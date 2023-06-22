package com.bykh.groupware.security;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.bykh.groupware.emp.service.EmpService;


import jakarta.annotation.Resource;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;


//로그인 실패시 자동으로 실행되는 클래스
public class SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	@Resource(name = "empService")
	private EmpService empService;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		           	Authentication authentication) throws IOException, ServletException {

		/*
		 * User user=(User)authentication.getPrincipal(); user.getUsername();
		 * 
		 * String userName = memberService.getUserNameById(user.getUsername());
		 * 
		 * 
		 * PrintWriter userWriter=response.getWriter(); userWriter.write(userName);
		 * userWriter.flush();
		 */
		PrintWriter p =response.getWriter();//응답할때, 어떤 데이터를 가져가겠다는 설정
		
		p.write("success");
		p.flush();
		
		
		
		//super.onAuthenticationSuccess(request, response, authentication);
	}	
}
