package com.bykh.groupware.calendar.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.calendar.vo.CalendarVO;
import com.bykh.groupware.resource.service.ResourceService;
import com.bykh.groupware.resource.vo.ResourceVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/calendar")
public class CalendarController {
	@Resource(name = "calendarService")
	private CalendarService calendarService;
	@Resource(name = "resourceService")
	private ResourceService resourceService;

	// 근태캘린더 일정추가
	@ResponseBody
	@RequestMapping("/calendarSave")
	public void calendarSaveAjax(@RequestBody List<CalendarVO> calendarVOs, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
		

		calendarService.deleteSchedule(empno);

		for (CalendarVO calendarVO : calendarVOs) {
			calendarVO.setEmpno(empno);
			
			calendarService.insertSchedule(calendarVO);
		}

	}

	// 근태캘린더 조회
	@ResponseBody
	@RequestMapping("/calendarLoad")
	public List<CalendarVO> calendarLoadAjax(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());

		return calendarService.getAllSchedules(empno);
	}

	// 자원관리캘린더 일정추가
	@ResponseBody
	@RequestMapping("/resourceCalendarSave")
	public void resourceCalendarSaveAjax(@RequestBody List<ResourceVO> resourceVOs, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
		
		calendarService.deleteResourceSchedule(empno);

		for (ResourceVO resourceVO : resourceVOs) {
			resourceVO.setEmpno(empno);
			calendarService.insertResourceSchedule(resourceVO);
		}

	}

	// 자원관리캘린더 조회
	@ResponseBody
	@RequestMapping("/resourceCalendarLoad")
	public List<ResourceVO> resourceCalendarLoad(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());

		return calendarService.getAllResourceSchedules(empno);
	}

	

}
    
    
    






