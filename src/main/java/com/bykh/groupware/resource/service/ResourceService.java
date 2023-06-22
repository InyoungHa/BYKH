package com.bykh.groupware.resource.service;

import java.util.List;
import java.util.Map;

import com.bykh.groupware.resource.vo.ResourceVO;

public interface ResourceService {
	
	//예약내역 조회
	List<ResourceVO>selectResource(int empno);
	
	//자원디테일 조회
	List<ResourceVO>resourceDetail(int empno);
	
	//id조회
	List<ResourceVO> selectId(int empno);
	
	//자원관리 캘린더 상세 정보 저장
	void insertScheduleDetailAjax(ResourceVO resourceVO);

	//자원관리 캘린더 상세 정보 조회
	List<ResourceVO> selectCalendarDetailAjax(ResourceVO resourceVO);
	
	//자원관리 캘린더 상세 정보 조회(전체)
	List<ResourceVO> selectCalendarDetailAllAjax(ResourceVO resourceVO);
	
	
	 //이벤트갯수조회(차트용)
	 List<Map<String, Object>> selectEventCount();
	

	

}


