package com.bykh.groupware.dept.service;

import java.util.List;

import com.bykh.groupware.dept.vo.DeptVO;

public interface DeptService {

	
	//부서 목록 조회
	List<DeptVO> selectDeptList();
}
