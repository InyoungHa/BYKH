package com.bykh.groupware.sign.vo;

import groovy.transform.ToString;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ToString
public class SignVO {
	private String sgnCode;
	private int docNo;
	private int sgnStatus;
	private int sgnResult;
	private int approverNo;
	private String approverName;
	private String approverJob;
	private String sgnComent;
	private String sgnDate;
}
