package com.bykh.groupware.sign.vo;

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
	private String approverName;
	private String approverJob;
	private String sgnComent;
	private String sgnDate;
}
