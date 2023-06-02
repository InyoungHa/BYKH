package com.bykh.groupware.emp.service;

import java.util.List;
import java.util.Map;

import com.bykh.groupware.emp.vo.EImgVO;
import com.bykh.groupware.emp.vo.EmpVO;

public interface EmpService {

	//로그인 쿼리
	EmpVO login(EmpVO empVO);
	
	//사원 등록_간편
	void insertEmp(EmpVO empVO);
	
	//사원 조회
	List<EmpVO> selectEmpList(EmpVO empVO);
	
	//전체 사원 수 조회
	int getEmpListCnt(EmpVO empVO);
	
	//사원의 사원 상세 정보 조회
	EmpVO selectEmpDetail(int empno);
	
	//사원 이미지 등록
	void insertEmpImg(EImgVO eImgVO);
	
	//사원 상세 정보 수정
	void updateEmpDetail(Map<String, Object> mapData);
	
}
