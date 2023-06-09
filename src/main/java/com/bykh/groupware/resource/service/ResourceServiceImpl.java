package com.bykh.groupware.resource.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.resource.vo.ResourceVO;



@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//예약내역조회
	@Override
	public List<ResourceVO> selectResource(int empno) {
		return sqlSession.selectList("attendanceMapper.selectResource",empno);
	}



	//자원디테일 조회
	@Override
	public List<ResourceVO> resourceDetail(int empno) {
		return sqlSession.selectList("attendanceMapper.resourceDetail", empno);
	}

	//id조회
	@Override
	public List<ResourceVO> selectId(int empno) {
		return sqlSession.selectList("attendanceMapper.selectId", empno);
	}
	
	//자원관리 캘린더 상세정보 저장
		@Override
		public void insertScheduleDetail(ResourceVO resourceVO) {
			sqlSession.insert("calendarMapper.insertScheduleDetail", resourceVO);
		}

		//자원관리 캘린더 상세정보 조회
		@Override
		public List<ResourceVO> selectCalendarDetail(int idDetail) {
			return sqlSession.selectList("calendarMapper.selectCalendarDetail", idDetail);
		}



	
	


	

	
}
