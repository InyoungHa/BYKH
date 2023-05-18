package com.bykh.groupware.sign.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.vo.DocTypeVO;
import com.bykh.groupware.sign.vo.SignDocVO;

@Service("signService")
public class SignServiceImpl implements SignService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	@Override
	public List<SignDocVO> getInProgressSignDocList() {
		return sqlsession.selectList("signMapper.getInProgressSignDocList");
	}
	@Override
	public List<SignDocVO> getEndSignDocList() {
		return sqlsession.selectList("signMapper.getInEndSignDocList");
	}
	@Override
	public DocTypeVO getSingWriteInfo(int empno) {
		return sqlsession.selectOne("signMapper.getSingWriteInfo", empno);
	}
	@Override
	public List<EmpVO> getEmpList(String ename) {
		return sqlsession.selectList("signMapper.getEmpList", ename);
	}
}
