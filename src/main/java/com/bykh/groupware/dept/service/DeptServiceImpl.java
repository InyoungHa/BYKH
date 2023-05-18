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
	public int insertDept(DeptVO deptVO) {		
		return sqlSession.insert("deptMapper.insertDept",deptVO);
	}



	@Override //부서 목록 조회
	public List<DeptVO> selectDeptList() {
		
		return sqlSession.selectList("deptMapper.selectDeptList");
	}


	@Override//부서 중복확인
	public int isDulicateDept(DeptVO deptVO) {
		return sqlSession.selectOne("deptMapper.isDulicateDept", deptVO);
	}

	@Override//부서 삭제
	public void deleteDept(int deptno) {
		sqlSession.delete("deptMapper.deleteDept",deptno);
		
	}
	
	
	
}
