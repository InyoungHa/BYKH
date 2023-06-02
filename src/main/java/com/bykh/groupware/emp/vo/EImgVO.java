package com.bykh.groupware.emp.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EImgVO {
	private String imgCode;
	private int empno;
	
	@JsonProperty("origin_file_name")
	private String originFileName;
	
	@JsonProperty("attached_file_name")
	private String attachedFileName;
}
