package com.bykh.groupware.emp.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EImgVO {
	private String imgCode;
	private int empno;
	private String originFileName;
	private String attachedFileName;
}
