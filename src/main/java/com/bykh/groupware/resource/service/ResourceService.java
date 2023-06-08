package com.bykh.groupware.resource.service;

import java.util.List;

import com.bykh.groupware.resource.vo.ResourceVO;

public interface ResourceService {
	
	//예약내역 조회
	List<ResourceVO>selectResource(int empno);
	
	
	

}


