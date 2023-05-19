package com.bykh.groupware.calendar.service;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.calendar.vo.CalendarVO;


@Service("calendarService")
public class CalendarServiceImpl implements CalendarService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//일정추가
	@Override
	public void insertSchedule(CalendarVO calendarVO) {
		sqlSession.insert("calendarMapper.insertSchedule", calendarVO);
	}





	

	



	


	
}
