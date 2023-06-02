package com.bykh.groupware.dept.vo;



import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DeptVO {
	private int deptno;
	
	@JsonProperty("dename")
	private String dename;
	private String loc;
	private String isUse;
}
