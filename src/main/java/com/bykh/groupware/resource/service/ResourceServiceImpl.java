package com.bykh.groupware.resource.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.resource.vo.ResourceDetailVO;


@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//자원관리 캘린더 상세정보 저장
	@Override
	public void insertScheduleDetail(ResourceDetailVO resourceDetailVO) {
		sqlSession.insert("calendarMapper.insertScheduleDetail",resourceDetailVO);
	}

	//자원관리 캘린더 상세정보 조회
	@Override
	public List<ResourceDetailVO> selectCalendarDetail(int id) {
		return sqlSession.selectList("calendarMapper.selectCalendarDetail", id);
	}

	
	//자원관리 캘린더 상세정보 업데이트
	@Override
	public void insertOrUpdateScheduleDetail(int id) {
		sqlSession.update("calendarMapper.insertOrUpdateScheduleDetail", id);
	}


	

	
}
