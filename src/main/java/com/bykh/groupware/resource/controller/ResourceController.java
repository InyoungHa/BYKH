package com.bykh.groupware.resource.controller;



import java.util.List;
import java.util.Map;

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
	public String reserve(AttendanceVO attendanceVO, Model model, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
		
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));

		return "content/resource/reserve";
	}
	
	//전체조회 페이지
		@GetMapping("/reserveAll")
		public String reserveAll() {
		

			return "content/resource/reserveAll";
		}
		
		//차트 페이지
		@GetMapping("/chart")
		public String chart() {
		

			return "content/resource/chart";
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
		@PostMapping("/insertScheduleDetailAjax")
		public void insertScheduleDetailAjax(ResourceVO resourceVO, Authentication authentication) {
			User user = (User)authentication.getPrincipal();
			int empno = Integer.parseInt(user.getUsername());	
			
			resourceVO.setEmpno(empno);
			
			 resourceService.insertScheduleDetailAjax(resourceVO);
		}


		// 자원관리 캘린더상세정보 조회
		@ResponseBody
		@RequestMapping("/selectCalendarDetailAjax")
		public List<ResourceVO> selectCalendarDetailAjax(Authentication authentication, ResourceVO resourceVO) {
			User user = (User)authentication.getPrincipal();
			int empno = Integer.parseInt(user.getUsername());	
			
			resourceVO.setEmpno(empno);

			return resourceService.selectCalendarDetailAjax(resourceVO);
		}
		
		
		// 자원관리 캘린더상세정보 조회(전체)
		@ResponseBody
		@RequestMapping("/selectCalendarDetailAllAjax")
		public List<ResourceVO> selectCalendarDetailAllAjax(ResourceVO resourceVO) {

			return resourceService.selectCalendarDetailAllAjax(resourceVO);
		}
	
		//이벤트갯수조회(차트용)
		@ResponseBody
		@PostMapping("/selectEventCountAjax")
		public List<Map<String, Object>> getSaleStatusByCategoryAjax() {
		List<Map<String, Object>> maplList = resourceService.selectEventCount();
		
		
		return maplList;
		}	
		
		



	
	

}
