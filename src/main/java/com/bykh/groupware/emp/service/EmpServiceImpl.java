package com.bykh.groupware.emp.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.emp.vo.EImgVO;
import com.bykh.groupware.emp.vo.EmpVO;

@Service("empService")
public class EmpServiceImpl implements EmpService {

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override //로그인 쿼리
	public EmpVO login(int empno) {
		return sqlSession.selectOne("empMapper.login", empno);
	}

	
	@Override //사원 등록_간편
	public void insertEmp(EmpVO empVO) {		
		sqlSession.insert("empMapper.insertEmp",empVO);
		
	}

	@Override //사원 조회
	public List<EmpVO> selectEmpList(EmpVO empVO) {
		return sqlSession.selectList("empMapper.selectEmpList", empVO);
	}


	@Override //전체 사원 수 조회
	public int getEmpListCnt(EmpVO empVO) {
		return sqlSession.selectOne("empMapper.getEmpListCnt",empVO);
	}


	@Override //사원의 사원 상세 정보 조회
	public EmpVO selectEmpDetail(int empno) {		
		return sqlSession.selectOne("empMapper.selectEmpDetail",empno);
	}


	@Override //사원 이미지 등록
	public void insertEmpImg(EImgVO eImgVO) {
		sqlSession.insert("empMapper.insertEmpImg", eImgVO);
		
	}
	@Override //사원 상세 정보 수정
	public void updateEmpDetail(EmpVO empVO) {
	
		 sqlSession.update("empMapper.updateEmpDetail", empVO);
	}


	@Override //계정 상태 변경
	public void updateE_Account(EmpVO empVO) {
		sqlSession.update("empMapper.updateE_Account",empVO);
		
	}


	@Override //사원 삭제 
	public void deleteEmp(int empno) {
		sqlSession.delete("empMapper.deleteEmp",empno);
		
	}
	
	
	
	
}
