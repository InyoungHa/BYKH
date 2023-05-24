package com.bykh.groupware.sign.vo;

import java.util.List;

import com.bykh.groupware.emp.vo.EmpVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SignDocVO {
	private int docNo;
	private int docType;
	private int writerNo;
	private String docTitle;
	private int sgnStatus;
	private String sgnStatusStr;
	private int docStatus;
	private String insertDate;
	
	private DocAnnualLeaveVO docAnnualLeaveVO;
	private List<SignVO> signVOList;
	private EmpVO empVO;
	 
}
