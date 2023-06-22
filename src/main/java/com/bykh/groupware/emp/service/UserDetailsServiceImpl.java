package com.bykh.groupware.emp.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bykh.groupware.emp.vo.EmpVO;

import jakarta.annotation.Resource;

//Security가 로그인 할 때 자동으로 실행하는 클래스
@Service("userDetailService")
public class UserDetailsServiceImpl implements UserDetailsService {
	@Resource(name ="empService")
	private  EmpService empService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		//로그인 정보 조회
		EmpVO empVO = empService.login(Integer.parseInt(username));
		
		//아이디가 없는 경우 예외 설정
		if(empVO == null) {
			throw new UsernameNotFoundException("오류");
		}
		
		
		UserDetails user = User.withUsername(String.valueOf(empVO.getEmpno()))
							   .password(empVO.getEpw())
							   .roles(empVO.getERole().split(","))
							   .build();
				
		return user;
	}	
}