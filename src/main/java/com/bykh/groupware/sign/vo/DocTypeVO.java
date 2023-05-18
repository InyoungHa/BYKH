package com.bykh.groupware.sign.vo;

import java.util.List;

import groovy.transform.ToString;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ToString
public class DocTypeVO {
	private int dtNo;
	private String dtTitle;
	private List<DocAnnualLeaveVO> docAnnualLeaveVOList;
}
