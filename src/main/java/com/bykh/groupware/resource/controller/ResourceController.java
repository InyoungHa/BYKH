package com.bykh.groupware.resource.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.resource.service.ResourceService;
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

}
