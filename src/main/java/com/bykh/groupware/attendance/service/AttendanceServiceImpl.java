package com.bykh.groupware.attendance.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("attendanceService")
public class AttendanceServiceImpl implements AttendanceService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	//출퇴근시간 저장
	@Override
	public void regTime(String empNo) {
		sqlSession.insert("attendanceMapper.regTime", empNo);
	}
	


	
}
