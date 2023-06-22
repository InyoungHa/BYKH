package com.bykh.groupware.emp.service;

import java.util.List;


import com.bykh.groupware.emp.vo.EImgVO;
import com.bykh.groupware.emp.vo.EmpVO;

public interface EmpService {

	//로그인 쿼리
	EmpVO login(int empno);
	
	//사원 등록_간편
	void insertEmp(EmpVO empVO);
	
	//사원 조회
	List<EmpVO> selectEmpList(EmpVO empVO);
	
	//전체 사원 수 조회
	int getEmpListCnt(EmpVO empVO);
	
	//사원의 사원 상세 정보 조회
	EmpVO selectEmpDetail(int empno);
	
	//사원 이미지 등록
	//void insertEmpImg(EImgVO eImgVO);
	
	//사원 이미지 update
	//void updateEmpImg(EImgVO eImgVO);	

	
	
	//이미지 있으면 update, 없으면 insert
	void insertOrUpdateE_Img(EImgVO eImgVO);
	
	
	
	//사원 상세 정보 수정
	void updateEmpDetail(EmpVO empVO);
	
	//계정 상태 변경
	void updateE_Account(EmpVO empVO);
	
	
	
	//계정 상태 변경 조회 쿼리
	void selectE_Account(int empno);

	//마이페이지 조회
	EmpVO selectSelfEmpDetail(int empno);
	
	//마이페이지 수정
	void updateSelfEmpDetail(EmpVO empVO);
	
	//비밀번호 조회
	String getEpw(int empno);
	
	//비밀번호 변경
	void updateEpw(EmpVO empVO);
	
	//임시비밀번호 받기
	String getEmailEpw(EmpVO empVO);
	
	
	//임시비밀번호로 비번 변경
	void updateImsiEpw(EmpVO empVO);
	


}
