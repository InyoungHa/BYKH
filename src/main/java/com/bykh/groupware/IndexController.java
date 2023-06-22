package com.bykh.groupware;

import java.util.ArrayList;
import java.util.List;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;


@Controller
public class IndexController {
	
	
	@GetMapping("/")
	public String index(Authentication authentication, HttpServletRequest request) {
		//로그인 성공 유무와 상관 없이 해당 페이지로 이동된다.
		//프로젝트 처음 시작시에는 null
		//작업하면 바로 전 페이지를 알려준다.
		String previousPage = request.getHeader("Referer");
		System.out.println("!!!!!!!!!!!!!!!!!!!"+previousPage);
		System.out.println(authentication);
		
		
		
		
		
		
		
		String path ="";
		
		//authentication이 null이면 로그인 안하거나, 로그아웃된 상태
		if(authentication == null) {
			path ="redirect:/user/log";
		}
		
		else {//로그인 한 경우에만 권한 정보 확인
			
			
			//로그인 한 사람의 권한 정보를 목록을 authoList가 담고 있다.
			//getAuthorities()의 자료형을 맞춰준다(List<>)
			User user = (User)authentication.getPrincipal();
			List<GrantedAuthority> authoList = new ArrayList<>(user.getAuthorities());
			
			//리스트의 각 요소를 뽑아 권한 정보를 받아온다
			//USER  ADMIN SUPER_ADMIN
			
			
			//문자열을 여러 개 가질 List
			List<String> strAuthoList = new ArrayList<>();
			for(GrantedAuthority autho : authoList) {
				String strAutho = autho.getAuthority();
				strAuthoList.add(strAutho);
			}
			
			//관리자 권한이 포함되어 있는지 확인(Security는 ROLE_ 넣어준다)
			if(strAuthoList.contains("ROLE_ADMIN")) {//ADMIN
				path ="redirect:/emp/empManage";
			}
			else if(strAuthoList.contains("ROLE_SUPER_ADMIN")) {//SUPER_ADMIN
				path ="redirect:/emp/empManage";
				
			}
			else {//일반 사원
				if(strAuthoList.contains("ROLE_USER")) {
					//일반 사원 이동할 페이지 _>빈 문자로 설정/로그인 기능과 함께
					path ="redirect:/user/main";
				}
				else {
					//로그인 한 경우엔 바로 이전 페이지로 이동한다.
					path = "redirect:"+previousPage;
					
					//이전 페이지에 /emp/dept가 들어 있다면, 경로를 강제로 메인 페이지로 바꾼다.
					if(previousPage.contains("/emp")){
						//path ="redirect:/user/main";
						path ="redirect:/emp/empManage";
					}
					else if(previousPage.contains("/dept")){
						//path ="redirect:/user/main";						
						path ="redirect:/dept/deptManage";
					}
				}
			}
			
		}		
		return path;	
	}
	
	//미인가 시 이동할 페이지
	@GetMapping("/accessDeny")
	public String accessDeny() {
		return "content/access_deny";
	}
	
	
}

