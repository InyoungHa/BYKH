package com.bykh.groupware.sign.service;

import java.util.List;
import java.util.Map;


import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.mro.vo.ItemVO;
import com.bykh.groupware.sign.vo.SignDocVO;
import com.bykh.groupware.sign.vo.SignVO;

public interface SignService {
	List<SignDocVO> getInProgressSignDocList(int empno);
	List<SignDocVO> getEndSignDocList(int empno);
	SignDocVO getSingWriteInfo(int empno);
	List<EmpVO> getEmpList(String ename);
	
	//연차신청서 insert
	//  >>결재문서 추가 + 연차신청서 추가 + 결재자 추가
	void insertDocAnnualLeave(SignDocVO signDocVO);
	//다음 DOC_NO 조회
	int getNextDocNo();
	
	//연차신청서 상세조회
	SignDocVO getDetailDocAnnualLeave(int docNo);
	//구매신청서 상세조회
	SignDocVO getDetailDocPurchaseOrder(int docNo);
	
	//결재/반려 버튼 클릭 시 실행
	int updateSignResult(SignVO signVO);
	int updateSignStatus(SignDocVO signDocVO);
	
	//구매신청서 - 모든 아이템 리스트 조회
	List<ItemVO> getItemList();
	//구매신청서 - INSERT
	void insertDocPurchaseOrder(SignDocVO signDocVO);
	//다음 buy_no 조회
	int getNextBuyNo();
	//연차신청서 - DELETE
	void delAnnualLeave(int docNo);
	//구매신청서 - DELETE
	void delPurchaseOrder(int docNo);
	
	//다음 결재자번호 조회
	int getNextApproverNo(int docNo);
	
}
