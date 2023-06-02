package com.bykh.groupware.attendance.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.attendance.vo.AttendanceVO;

@Service("attendanceService")
public class AttendanceServiceImpl implements AttendanceService {
	@Autowired
	private SqlSessionTemplate sqlSession;


	//출근시간등록
	@Override
	public void goWork() {
		sqlSession.insert("attendanceMapper.goWork");
		
	}

	//출근시간등록
	@Override
	public void outWork() {
		sqlSession.insert("attendanceMapper.outWork");
	}

	//제일최신 출근시간 조회
	@Override
	public AttendanceVO selectGowork() {
		return sqlSession.selectOne("attendanceMapper.selectGowork");
	}

	//제일최신 퇴근시간 조회
	@Override
	public AttendanceVO selectOutwork() {
		return sqlSession.selectOne("attendanceMapper.selectOutwork");
	}

	//지각회수 조회
	@Override
	public AttendanceVO selectLateCount() {
		return sqlSession.selectOne("attendanceMapper.selectLateCount");
	}

	@Override
	public AttendanceVO checkDays() {
		return sqlSession.selectOne("attendanceMapper.checkDays");
	}
	


	
}
