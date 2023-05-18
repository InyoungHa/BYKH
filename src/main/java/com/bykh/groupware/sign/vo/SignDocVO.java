package com.bykh.groupware.sign.vo;

import java.util.List;

import com.bykh.groupware.emp.vo.EmpVO;

import groovy.transform.ToString;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ToString
public class SignDocVO {
	private int docNo;
	private int dtNo;
	private int writerNo;
	private String docTitle;
	private String sgnStatus;
	private int docStatus;
	private String insertDate;
	
	private EmpVO empVO;
	private List<SignVO> signVOList;
}
