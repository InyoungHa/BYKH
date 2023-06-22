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
	@RequestMapping("/calendarSaveAjax")
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
	@RequestMapping("/calendarLoadAjax")
	public List<CalendarVO> calendarLoadAjax(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());

		return calendarService.getAllSchedules(empno);
	}

	// 자원관리캘린더 일정추가(?)
	@ResponseBody
	@RequestMapping("/resourceCalendarSave")
	public void resourceCalendarSaveAjax(@RequestBody List<ResourceVO> resourceVOs, Authentication authentication, ResourceVO resourceVO) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
		
		
	

		for (ResourceVO resource : resourceVOs) {
			resource.setEmpno(empno);
			calendarService.insertResourceSchedule(resource);
		}

	}
	// 자원관리캘린더 일정 이동시 업데이트
		@ResponseBody
		@RequestMapping("/resourceCalendarUpdate2Ajax")
		public void resourceCalendarUpdateAjax2(@RequestBody List<ResourceVO> resourceVOs, Authentication authentication, ResourceVO resourceVO) {
			User user = (User)authentication.getPrincipal();
			int empno = Integer.parseInt(user.getUsername());
			

			for (ResourceVO resource : resourceVOs) {
				resource.setEmpno(empno);

				calendarService.updateResourceSchedule2(resource);
			}		
		}

	
	//자원관리캘린더 일정(주/일) 업데이트
		@ResponseBody
		@RequestMapping("/resourceCalendarUpdateAjax")
		public int resourceCalendarUpdateAjax(@RequestBody List<ResourceVO> resourceVOs, Authentication authentication, ResourceVO resourceVO) {
			User user = (User)authentication.getPrincipal();
			int empno = Integer.parseInt(user.getUsername());

			//방금 삽입한 code 조회
			int scheduleCode = calendarService.getInsertScheduleCode();

			for (ResourceVO resource : resourceVOs) {
				resource.setEmpno(empno);
				resource.setId(scheduleCode);
				calendarService.updateResourceSchedule2(resource);
			}



			return scheduleCode;

		}

	// 자원관리캘린더 조회
	@ResponseBody
	@RequestMapping("/resourceCalendarLoadAjax")
	public List<ResourceVO> resourceCalendarLoadAjax(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());

		return calendarService.getAllResourceSchedules(empno);
	}
	
		// 자원관리캘린더 전체조회
		@ResponseBody
		@RequestMapping("/selectAllSchedulesAjax")
		public List<ResourceVO> selectAllSchedulesAjax(Authentication authentication) {
		

			return calendarService.selectAllSchedules();
		}
	
	// 자원관리캘린더 일정제거
		@ResponseBody
		@RequestMapping("/deleteResourceScheduleAjax")
		public void resourceCalendarSaveAjax(Authentication authentication, ResourceVO resourceVO) {
			User user = (User)authentication.getPrincipal();
			int empno = Integer.parseInt(user.getUsername());
				
			  
			  //empno값 resourceVO에 저장
			  resourceVO.setEmpno(empno);


			calendarService.deleteResourceSchedule(resourceVO);
			
		}

	

}
    
    
    






