package com.bykh.groupware.dept.service;

import java.util.List;

import com.bykh.groupware.dept.vo.BranchLocationInfoVO;
import com.bykh.groupware.dept.vo.DeptVO;
import com.bykh.groupware.dept.vo.OrgDeptVO;
import com.bykh.groupware.dept.vo.OrganizationVO;
import com.bykh.groupware.emp.vo.EmpVO;


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
	
	//부서의 지역을 중복없이 조회
	List<OrganizationVO> getLocList();
	List<OrgDeptVO> getDeptListForOrg(String loc);
	List<EmpVO> getEmpListForOrg(int deptno);
	
	
	//회사 지도 조회
	BranchLocationInfoVO selectBranchLocation(String branchCode);
	
	//부서 수정_중복 확인
	boolean isDuplicateModifyDename(DeptVO deptVO);
	
	//부서 수정
	void updateDename(DeptVO deptVO);
}
