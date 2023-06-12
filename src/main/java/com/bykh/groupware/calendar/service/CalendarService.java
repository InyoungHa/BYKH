package com.bykh.groupware.calendar.service;



import java.util.List;

import com.bykh.groupware.calendar.vo.CalendarVO;
import com.bykh.groupware.resource.vo.ResourceVO;


public interface CalendarService {
	
//근태관리 캘린더 일정제거
void deleteSchedule(int empno);
	
	
//근태관리 캘린더 일정추가
void insertSchedule(CalendarVO calendarVO);


//근태관리 캘린더 일정조회
List<CalendarVO> getAllSchedules(int empno);


//자원관리 캘린더 일정제거
void deleteResourceSchedule(int empno);
	
	
//자원관리 캘린더 일정추가
void insertResourceSchedule(ResourceVO resourceVO);


//자원관리 캘린더 일정조회
List<ResourceVO> getAllResourceSchedules(int empno);


//자원관리 캘린더 세부일정 추가
void insertScheduleDetail(ResourceVO resourceVO);

}


