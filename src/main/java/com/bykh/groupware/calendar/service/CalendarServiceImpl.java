package com.bykh.groupware.calendar.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.calendar.vo.CalendarVO;
import com.bykh.groupware.resource.vo.ResourceVO;


@Service("calendarService")
public class CalendarServiceImpl implements CalendarService {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//근태관리 캘린더 일정제거
	@Override
	public void deleteSchedule(int empno) {
		sqlSession.delete("calendarMapper.deleteSchedule", empno);
	}


	//근태관리 캘린더 일정추가
	@Override
	public void insertSchedule(CalendarVO calendarVO) {
		sqlSession.insert("calendarMapper.insertSchedule", calendarVO);
	}
	
	//근태관리 캘린더 일정조회
	@Override
	public List<CalendarVO> getAllSchedules(int empno) {
		return sqlSession.selectList("calendarMapper.getAllSchedules", empno);
	}
	
	
	//자원관리 캘린더 일정제거
	@Override
	public void deleteResourceSchedule(int empno) {
		sqlSession.delete("calendarMapper.deleteResourceSchedule", empno);
	}


	//자원관리 캘린더 일정추가
	@Override
	public void insertResourceSchedule(ResourceVO resourceVO) {
		sqlSession.insert("calendarMapper.insertResourceSchedule", resourceVO);
	}
	
	//자원관리 캘린더 일정조회
	@Override
	public List<ResourceVO> getAllResourceSchedules(int empno) {
		return sqlSession.selectList("calendarMapper.getAllResourceSchedules", empno);
	}


	



}
