package com.bykh.groupware.sign.service;

import java.util.List;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.vo.DocAnnualLeaveVO;
import com.bykh.groupware.sign.vo.SignDocVO;
import com.bykh.groupware.sign.vo.SignVO;

public interface SignService {
	List<SignDocVO> getInProgressSignDocList();
	List<SignDocVO> getEndSignDocList();
	SignDocVO getSingWriteInfo(int empno);
	List<EmpVO> getEmpList(String ename);
	
	//연차신청서 insert
	//  >>결재문서 추가 + 연차신청서 추가 + 결재자 추가
	void insertDocAnnualLeave(SignDocVO signDocVO);
	//다음 DOC_NO 조회
	int getNextDocNo();
	
	//결재문서 상세조회
	SignDocVO getDetailDocAnnualLeave(int docNo);
	
	//결재/반려 버튼 클릭 시 실행
	int updateSignResult(SignVO signVO);
	
}
