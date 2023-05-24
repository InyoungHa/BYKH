package com.bykh.groupware.emp.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bykh.groupware.emp.vo.EmpVO;

@Service("empService")
public class EmpServiceImpl implements EmpService {

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override //로그인 쿼리
	public EmpVO login(EmpVO empVO) {
		return sqlSession.selectOne("empMapper.login", empVO);
	}

	
	@Override //사원 등록_간편
	public void insertEmp(EmpVO empVO) {		
		sqlSession.insert("empMapper.insertEmp",empVO);
		
	}

	@Override //사원 조회
	public List<EmpVO> selectEmpList(EmpVO empVO) {
		return sqlSession.selectList("empMapper.selectEmpList", empVO);
	}
	
	
}
