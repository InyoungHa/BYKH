package com.bykh.groupware.dept.service;

import java.util.List;

import com.bykh.groupware.dept.vo.DeptVO;

public interface DeptService {
	
	//부서 등록 쿼리
	void insertDept(DeptVO deptVO);

	
	//부서 목록 조회
	List<DeptVO> selectDeptList();
	
	//부서 중복확인
	boolean isDulicateDept(DeptVO deptVO);
	
	//부서 삭제
	void deleteDept(int deptno);
}
