package com.bykh.groupware.sign.service;

import java.util.List;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.vo.DocTypeVO;
import com.bykh.groupware.sign.vo.SignDocVO;

public interface SignService {
	List<SignDocVO> getInProgressSignDocList();
	List<SignDocVO> getEndSignDocList();
	DocTypeVO getSingWriteInfo(int empno);
	List<EmpVO> getEmpList(String ename);
}
