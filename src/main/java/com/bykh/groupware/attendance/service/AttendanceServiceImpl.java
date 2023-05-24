package com.bykh.groupware.attendance.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("attendanceService")
public class AttendanceServiceImpl implements AttendanceService {
	@Autowired
	private SqlSessionTemplate sqlSession;


	//출근시간등록
	@Override
	public void goWork(String empNo) {
		sqlSession.insert("attendanceMapper.goToWork", empNo);
		
	}

	//출근시간등록
	@Override
	public void outWork(String empNo) {
		sqlSession.insert("attendanceMapper.outWork", empNo);
	}
	


	
}
