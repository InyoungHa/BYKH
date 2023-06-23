package com.bykh.groupware.sign.vo;

import com.bykh.groupware.emp.vo.EmpVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SignVO {
	private int docNo;
	private int sgnOrder;
	private String sgnResultStr;
	private int sgnResult;
	private int approverNo;
	private int nextApproverNo;
	private String sgnComent;
	private String sgnDate;
	
	
	
	//private EmpVO empVO;
	//empVO로 대체할 수 있을지 생각하기
	// (결재문서 조회시 결재라인 조회시 오류 발생 고려)
	private String approverName;
	private String approverJob;
	private String attachedFileName;
}
