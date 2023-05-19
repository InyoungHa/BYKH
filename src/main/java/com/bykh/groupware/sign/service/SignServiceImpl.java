package com.bykh.groupware.sign.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.vo.DocAnnualLeaveVO;
import com.bykh.groupware.sign.vo.DocTypeVO;
import com.bykh.groupware.sign.vo.SignDocVO;
import com.bykh.groupware.sign.vo.SignVO;

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
	
	// 결재문서 추가 + 연차신청서 추가 + 결재자 추가
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertDocAnnualLeave(DocTypeVO docTypeVO) {
		sqlsession.insert("signMapper.insertSignDoc", docTypeVO);
		sqlsession.insert("signMapper.insertDocAnnualLeave", docTypeVO);
		sqlsession.insert("signMapper.insertSignList", docTypeVO);
	}
	@Override
	public int getNextDocNo() {
		return sqlsession.selectOne("signMapper.getNextDocNo");
	}
}
