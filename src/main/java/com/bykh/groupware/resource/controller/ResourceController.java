package com.bykh.groupware.resource.controller;



import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.resource.service.ResourceService;
import com.bykh.groupware.resource.vo.ResourceVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/resource")
public class ResourceController {
	@Resource(name = "resourceService")
	private  ResourceService resourceService;

	

	//예약하기 페이지
	@GetMapping("/reserve")
	public String reserve() {

		return "content/resource/reserve";
	}

	//예약목록 페이지
	@GetMapping("/reservationList")
	public String reservationList(Authentication authentication, Model model, ResourceVO resourceVO) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());	
		
		//출퇴근 기록 게시판 조회(최근5일)
		List<ResourceVO> resList =  resourceService.selectResource(empno);
		model.addAttribute("resList", resList); 

		return "content/resource/reservationList";
	}
	


	
	

	
	

}
