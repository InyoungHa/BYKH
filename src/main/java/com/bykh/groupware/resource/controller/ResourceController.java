package com.bykh.groupware.resource.controller;



import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.resource.service.ResourceService;
import com.bykh.groupware.resource.vo.ResourceVO;
import com.bykh.groupware.util.DateUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/resource")
public class ResourceController {
	@Resource(name = "resourceService")
	private  ResourceService resourceService;
	@Resource(name = "attendanceService")
	private  AttendanceService attendanceService;

	

	//예약하기 페이지
	@GetMapping("/reserve")
	public String reserve() {

		return "content/resource/reserve";
	}

	//예약목록 페이지
	@GetMapping("/reservationList")
	public String reservationList(Authentication authentication, Model model, ResourceVO resourceVO, AttendanceVO attendanceVO) {
		String nowDate = DateUtil.getNowDateToString(); //오늘날짜설정	
		if(attendanceVO.getCurDate() == null) {
			attendanceVO.setCurDate(nowDate);
		}	
		
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());	
		
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));
		
		
		//자원예약 게시판 조회
		List<ResourceVO> resList =  resourceService.selectResource(empno);
		model.addAttribute("resList", resList); 
		
		//참석자,사유 조회
		List<ResourceVO> resDeList =  resourceService.resourceDetail(empno);
		model.addAttribute("resDeList", resDeList); 

		return "content/resource/reservationList";
	}
	
	//자원관리 캘린더상세정보 저장
		@ResponseBody
		@PostMapping("/insertScheduleDetail")
		public void insertScheduleDetail(ResourceVO resourceVO, Authentication authentication) {
			User user = (User)authentication.getPrincipal();
			int empno = Integer.parseInt(user.getUsername());	
			
			resourceVO.setEmpno(empno);
			
			 resourceService.insertScheduleDetail(resourceVO);
		}


		// 자원관리 캘린더상세정보 조회
		@ResponseBody
		@RequestMapping("/selectCalendarDetail")
		public List<ResourceVO> selectCalendarDetail(int idDetail) {

			return resourceService.selectCalendarDetail(idDetail);
		}
	



	
	

}
