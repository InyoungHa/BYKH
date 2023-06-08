package com.bykh.groupware.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//로그인 실패시 자동으로 실행되는 클래스
public class FailureHandler extends SimpleUrlAuthenticationFailureHandler {

	//erro 메세지
	String eMsg="";
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		
		//예외의 종류에 예외가 달라진다.
		if(exception instanceof BadCredentialsException) {
			//입력한 아이디 또는 비번이 오류
			eMsg ="아이디 혹은 비밀번호를 확인하세요";
		}
		else if(exception instanceof UsernameNotFoundException) {
			//아예 없는 계정일 때
			eMsg ="계정이 존재하지 않습니다";
		}
		else {
			eMsg="알 수 없는 이유로 로그인에 실패했습니다.";
			
		}
		//로그인시 입력한 사번
		String empno =request.getParameter("empno");
		System.out.println(empno);
		
		//eMsg를 엔코더 후에 넘긴다
		eMsg = URLEncoder.encode(eMsg,"UTF-8");
		
		//로그인 실패
		PrintWriter p =response.getWriter();//응답할때, 어떤 데이터를 가져가겠다는 설정
		
		p.write("fail");
		p.flush();

	}
}
