package com.bykh.groupware.calendar.controller;

import java.util.List;

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
	public void calendarSaveAjax(@RequestBody List<CalendarVO> calendarVOs) {
		for (CalendarVO c : calendarVOs) {
			System.out.println(c);
		}

		calendarService.deleteSchedule();

		for (CalendarVO calendarVO : calendarVOs) {
			calendarService.insertSchedule(calendarVO);
		}

	}

	// 근태캘린더 조회
	@ResponseBody
	@RequestMapping("/calendarLoad")
	public List<CalendarVO> calendarLoadAjax() {

		return calendarService.getAllSchedules();
	}

	// 자원관리캘린더 일정추가
	@ResponseBody
	@RequestMapping("/resourceCalendarSave")
	public void resourceCalendarSaveAjax(@RequestBody List<ResourceVO> resourceVOs) {
		for (ResourceVO c : resourceVOs) {
			System.out.println(c);
		}
		calendarService.deleteResourceSchedule();

		for (ResourceVO resourceVO : resourceVOs) {
			calendarService.insertResourceSchedule(resourceVO);
		}

	}

	// 자원관리캘린더 조회
	@ResponseBody
	@RequestMapping("/resourceCalendarLoad")
	public List<ResourceVO> resourceCalendarLoad() {

		return calendarService.getAllResourceSchedules();
	}

	

}
    
    
    






