package com.bykh.groupware.attendance.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.sign.vo.DocAnnualLeaveVO;

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
	
	//정상출근횟수 조회
	@Override
	public AttendanceVO selectNomalCount(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectNomalCount",empno);
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

	// 이번달 사용한 연차개수 
	@Override
	public DocAnnualLeaveVO selectCountVacation(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectCountVacation", empno);
	}

	// 이번달 사용한 반차개수 
	@Override
	public DocAnnualLeaveVO selectCountHalfVacation(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectCountHalfVacation", empno);
	}

	//이번달 총휴가 개수
	@Override
	public DocAnnualLeaveVO selectAllVacation(int empno) {
		return sqlSession.selectOne("attendanceMapper.selectAllVacation", empno);
	}
	
	//휴가사용내역 테이블 조회 (최신5회)
	@Override
	public List<DocAnnualLeaveVO> selectListVacation(int empno) {
		return sqlSession.selectList("attendanceMapper.selectListVacation", empno);
	}


	//휴가사용내역 테이블 조회 (전체)
	@Override
	public List<DocAnnualLeaveVO> selectListVacation2(int empno) {
		return sqlSession.selectList("attendanceMapper.selectListVacation", empno);
	}

	//사원별 총근무시간 조회(차트용)
	@Override
	public List<Map<String, Object>> selectTotalChart() {
		return sqlSession.selectList("attendanceMapper.selectTotalChart");
	}


	


	

	
	

	


	
}
