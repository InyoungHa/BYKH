package com.bykh.groupware.sign.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.mro.vo.ItemVO;
import com.bykh.groupware.sign.vo.DocAnnualLeaveVO;
import com.bykh.groupware.sign.vo.SignDocVO;
import com.bykh.groupware.sign.vo.SignVO;

@Service("signService")
public class SignServiceImpl implements SignService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	@Override
	public List<SignDocVO> getInProgressSignDocList(int empno) {
		return sqlsession.selectList("signMapper.getInProgressSignDocList", empno);
	}
	@Override
	public List<SignDocVO> getEndSignDocList(int empno) {
		return sqlsession.selectList("signMapper.getEndSignDocList", empno);
	}
	@Override
	public SignDocVO getSingWriteInfo(int empno) {
		return sqlsession.selectOne("signMapper.getSingWriteInfo", empno);
	}
	@Override
	public List<EmpVO> getEmpList(String ename) {
		return sqlsession.selectList("signMapper.getEmpList", ename);
	}
	
	// 결재문서 추가 + 연차신청서 추가 + 결재자 추가
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertDocAnnualLeave(SignDocVO signDocVO) {
		sqlsession.insert("signMapper.insertSignDoc", signDocVO);
		sqlsession.insert("signMapper.insertDocAnnualLeave", signDocVO);
		sqlsession.insert("signMapper.insertSignList", signDocVO);
		sqlsession.insert("signMapper.insertReferrerList", signDocVO);
	}
	@Override
	public int getNextDocNo() {
		return sqlsession.selectOne("signMapper.getNextDocNo");
	}
	@Override
	public SignDocVO getDetailDocAnnualLeave(int docNo) {
		return sqlsession.selectOne("signMapper.getDetailDocAnnualLeave", docNo);
	}
	@Override
	public int updateSignResult(SignVO signVO) {
		return sqlsession.update("signMapper.updateSignResult", signVO);
	}
	
	@Override
	public int updateBuyApproval(SignVO signVO) {
		return sqlsession.update("signMapper.updateBuyApproval", signVO);
	}
	@Override
	public List<ItemVO> getItemList() {
		return sqlsession.selectList("signMapper.getItemList");
	}
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertDocPurchaseOrder(SignDocVO signDocVO) {
		sqlsession.insert("signMapper.insertSignDoc", signDocVO);
		sqlsession.insert("signMapper.insertSignList", signDocVO);
		sqlsession.insert("signMapper.insertReferrerList", signDocVO);
		sqlsession.insert("signMapper.insertBuy", signDocVO.getDocPurchaseOrderVO().getBuyVO());
		sqlsession.insert("signMapper.insertBuyDetails", signDocVO.getDocPurchaseOrderVO().getBuyVO());
		sqlsession.insert("signMapper.insertDocPurchaseOrder", signDocVO.getDocPurchaseOrderVO());
	}
	
	@Override
	public int getNextBuyNo() {
		return sqlsession.selectOne("signMapper.getNextBuyNo");
	}
	@Override
	public SignDocVO getDetailDocPurchaseOrder(int docNo) {
		return sqlsession.selectOne("signMapper.getDetailDocPurchaseOrder", docNo);
	}
	@Override
	public void delPurchaseOrder(int docNo) {
		sqlsession.delete("signMapper.delPurchaseOrder", docNo);
	}
	@Override
	public int getNextApproverNo(int docNo) {
		return sqlsession.selectOne("signMapper.getNextApproverNo", docNo);
	}
	@Override
	public int updateSignStatus(SignDocVO signDocVO) {
		return sqlsession.update("signMapper.updateSignStatus", signDocVO);
	}
	@Override
	public void delAnnualLeave(int docNo) {
		sqlsession.delete("signMapper.delAnnualLeave", docNo);
	}
	@Override
	public List<SignDocVO> getMainSignDocList(int empno) {
		return sqlsession.selectList("signMapper.getMainSignDocList", empno);
	}
	
	
	
	
	
}
