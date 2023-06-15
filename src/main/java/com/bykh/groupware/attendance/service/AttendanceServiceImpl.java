package com.bykh.groupware.attendance.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.attendance.vo.AttendanceVO;

@Service("attendanceService")
public class AttendanceServiceImpl implements AttendanceService {
	@Autowired
	private SqlSessionTemplate sqlSession;


	//이름조회
	@Override
	public AttendanceVO selectName(int empno) {
	    return sqlSession.selectOne("attendanceMapper.selectName", empno);
	}
	
	//ATTCODE 최신 첫번쨰 조회
	@Override
	public AttendanceVO selectAtt(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectAtt", empno);
	}


	
	//출근시간등록
	@Override
	public void goWork(int empno) {
		sqlSession.insert("attendanceMapper.goWork", empno);
		
	}

	//퇴근시간등록
	@Override
	public void outWork(AttendanceVO attendanceVO) {
	    sqlSession.insert("attendanceMapper.outWork", attendanceVO);
	}

	//제일최신 출근시간 조회
	@Override
	public AttendanceVO selectGowork(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectGowork", empno);
	}

	//제일최신 퇴근시간 조회
	@Override
	public AttendanceVO selectOutwork(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectOutwork", empno);
	}

	//지각회수 조회
	@Override
	public AttendanceVO selectLateCount(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectLateCount", empno);
	}

	@Override
	public AttendanceVO checkDays(int empno) {
		return sqlSession.selectOne("attendanceMapper.checkDays", empno);
	}

	//총 근무시간
	@Override
	public AttendanceVO totalWorkingTime(int empno) {
		return sqlSession.selectOne("attendanceMapper.totalWorkingTime", empno);
	}

	//총 연장근무 시간
	@Override
	public AttendanceVO findOverTime(int empno) {
		return sqlSession.selectOne("attendanceMapper.findOverTime", empno);
	}
	
	//연장근무가능시간 조회
	@Override
	public AttendanceVO findCanOverTime(int empno) {
		return sqlSession.selectOne("attendanceMapper.findCanOverTime", empno);
	}
	

	//결근 횟수 조회
	@Override
	public AttendanceVO findLateCount(int empno) {
		return sqlSession.selectOne("attendanceMapper.findLateCount", empno);
	}

	//출퇴근 기록 게시판 조회(최근5일)
	@Override
	public List<AttendanceVO> workingBoard(int empno) {
		return sqlSession.selectList("attendanceMapper.workingBoard", empno);
	}

	//출퇴근 기록 게시판 조회(전체)
	@Override
	public List<AttendanceVO> workingBoardAll(int empno) {
		return sqlSession.selectList("attendanceMapper.workingBoardAll", empno);
	}



	


	

	
	

	


	
}
