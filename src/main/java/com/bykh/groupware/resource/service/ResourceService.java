package com.bykh.groupware.resource.service;

import java.util.List;

import com.bykh.groupware.resource.vo.ResourceDetailVO;

public interface ResourceService {
	
	//자원관리 캘린더 상세 정보 저장
	void insertScheduleDetail(ResourceDetailVO resourceDetailVO);
	
	//자원관리 캘린더 상세 정보 조회
	List<ResourceDetailVO> selectCalendarDetail(int id);
	
	//자원관리 캘린더 상세정보 업데이트
	void insertOrUpdateScheduleDetail(int id);
	

}


