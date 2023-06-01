package com.bykh.groupware.resource.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.calendar.vo.CalendarVO;
import com.bykh.groupware.resource.service.ResourceService;
import com.bykh.groupware.resource.vo.ResourceDetailVO;
import com.bykh.groupware.util.DateUtil;

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
	public String reservationList() {

		return "content/resource/reservationList";
	}
	
	//자원관리 캘린더상세정보 저장
	@ResponseBody
	@PostMapping("/insertScheduleDetail")
	public void insertScheduleDetail(ResourceDetailVO resourceDetailVO) {
		 resourceService.insertScheduleDetail(resourceDetailVO);
	}
	
	
	// 자원관리 캘린더상세정보 조회
	@ResponseBody
	@RequestMapping("/selectCalendarDetail")
	public List<ResourceDetailVO> selectCalendarDetail(int id) {

		return resourceService.selectCalendarDetail(id);
	}
	
	
	//자원관리 캘린더상세정보 업데이트
	@ResponseBody
	@PostMapping("/insertOrUpdateScheduleDetail")
	public void insertOrUpdateScheduleDetail(int id) {
		 resourceService.insertOrUpdateScheduleDetail(id);
	}
	
	
	

}
