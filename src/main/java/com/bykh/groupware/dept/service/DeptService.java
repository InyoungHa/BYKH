package com.bykh.groupware.dept.service;

import java.util.List;

import com.bykh.groupware.dept.vo.DeptVO;


public interface DeptService {
	
	//부서 등록 쿼리
	void insertDept(DeptVO deptVO);

	
	//부서 목록 조회
	List<DeptVO> selectDeptList();
	
	//사용 중인 부서 목록 조회
	List<DeptVO> selectDeptListIsUse();
	
	//부서 중복확인
	boolean isDulicateDept(DeptVO deptVO);
	
	//부서 삭제
	void deleteDept(int deptno);
	
	//부서 사용 여부 변경
	int updateIsUse(int deptno);
}
