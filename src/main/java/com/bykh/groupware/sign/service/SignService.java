package com.bykh.groupware.sign.service;

import java.util.List;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.vo.DocAnnualLeaveVO;
import com.bykh.groupware.sign.vo.DocTypeVO;
import com.bykh.groupware.sign.vo.SignDocVO;
import com.bykh.groupware.sign.vo.SignVO;

public interface SignService {
	List<SignDocVO> getInProgressSignDocList();
	List<SignDocVO> getEndSignDocList();
	DocTypeVO getSingWriteInfo(int empno);
	List<EmpVO> getEmpList(String ename);
	
	//연차신청서 insert
	//  >>결재문서 추가 + 연차신청서 추가 + 결재자 추가
	void insertDocAnnualLeave(DocTypeVO docTypeVO);
	
	//다음 DOC_NO 조회
	int getNextDocNo();
}
