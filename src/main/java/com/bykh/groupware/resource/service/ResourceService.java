package com.bykh.groupware.resource.service;

import java.util.List;

import com.bykh.groupware.resource.vo.ResourceVO;

public interface ResourceService {
	
	//예약내역 조회
	List<ResourceVO>selectResource(int empno);
	
	//자원디테일 조회
	List<ResourceVO>resourceDetail(int empno);
	
	//id조회
	List<ResourceVO> selectId(int empno);
	
	//자원관리 캘린더 상세 정보 저장
	void insertScheduleDetail(ResourceVO resourceVO);

	//자원관리 캘린더 상세 정보 조회
	List<ResourceVO> selectCalendarDetail(int idDetail);
	

}


