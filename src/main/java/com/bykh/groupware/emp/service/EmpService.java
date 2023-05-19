package com.bykh.groupware.emp.service;

import java.util.List;

import com.bykh.groupware.emp.vo.EmpVO;

public interface EmpService {

	//로그인 쿼리
	EmpVO login(EmpVO empVO);
	
	//사원 등록_간편
	void insertEmp(EmpVO empVO);
	
	//사원 조회
	List<EmpVO> selectEmpList();
	
	
}
