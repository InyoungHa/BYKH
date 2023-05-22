package com.bykh.groupware.calendar.service;



import java.util.List;

import com.bykh.groupware.calendar.vo.CalendarVO;


public interface CalendarService {
	
//일정제거
void deleteSchedule();
	
	
//일정추가
void insertSchedule(CalendarVO calendarVO);


//일정조회
List<CalendarVO> getAllSchedules();





}


