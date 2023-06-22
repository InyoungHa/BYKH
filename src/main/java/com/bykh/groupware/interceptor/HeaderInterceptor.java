package com.bykh.groupware.interceptor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.bykh.groupware.emp.service.EmpService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class HeaderInterceptor implements HandlerInterceptor{
	@Resource(name = "empService")
	private EmpService empService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		//로그인 풀렸을 때 
		if(authentication.getPrincipal() == "anonymousUser") {
			response.sendRedirect("redirect:/user/log");
			
			return false;
		}
		else {
			return true;
		}
	}
	
	

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		User user = (User) authentication.getPrincipal();
		int loginEmpno = Integer.parseInt(user.getUsername());
		
		modelAndView.addObject("userInfo", empService.selectEmpDetail(loginEmpno));
		
	}

}
