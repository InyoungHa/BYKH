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

	@Override //부서 목록 조회
	public List<DeptVO> selectDeptList() {
		
		return sqlSession.selectList("deptMapper.selectDeptList");
	}
	
	
}
