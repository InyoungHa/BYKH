package com.bykh.groupware.dept.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.dept.vo.DeptVO;


@Service("deptService")
public class DeptServiceImpl implements DeptService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	

	@Override//부서 등록 쿼리
	public void insertDept(DeptVO deptVO) {		
		sqlSession.insert("deptMapper.insertDept",deptVO);
	}



	@Override //부서 목록 조회
	public List<DeptVO> selectDeptList() {
		
		return sqlSession.selectList("deptMapper.selectDeptList");
	}

	@Override //사용 중인 부서 목록 조회
	public List<DeptVO> selectDeptListIsUse() {
		
		return sqlSession.selectList("deptMapper.selectDeptListIsUse");
	}

	@Override//부서 중복확인
	public boolean isDulicateDept(DeptVO deptVO) {
		
		int result = sqlSession.selectOne("deptMapper.isDulicateDept", deptVO);
		return result != 0 ? true : false;
	}

	@Override//부서 삭제
	public void deleteDept(int deptno) {
		sqlSession.delete("deptMapper.deleteDept",deptno);
		
	}

	@Override //부서 사용 여부 변경
	public int updateIsUse(int deptno) {
		
		return sqlSession.update("deptMapper.updateIsUse",deptno);
	}



	
	
	
	
}
