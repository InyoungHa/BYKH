package com.bykh.groupware.emp.vo;



import com.bykh.groupware.emp.service.EmpService;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.annotation.Resource;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EImgVO {
	@Resource(name="empService")
	private EmpService empService;
	
	
	private String imgCode;
	private int empno;
	
	@JsonProperty("origin_file_name")
	private String originFileName;
	
	@JsonProperty("attached_file_name")
	private String attachedFileName;
	

}



