package com.bykh.groupware.emp.vo;

import com.bykh.groupware.dept.vo.DeptVO;
import com.bykh.groupware.util.PageVO;
import com.fasterxml.jackson.annotation.JsonProperty;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmpVO extends PageVO {
	
	private int empno;
	
	@JsonProperty("deptno")
	private int deptno;
	
	@JsonProperty("ename")
	private String ename;
	
	@JsonProperty("epw")
	private String epw;
	
	@JsonProperty("e_job")
	private String eJob;
	private int age;
	private String gender;
	private String eEmail;
	private String phoneTel;
	private String officeTel;
	
	@JsonProperty("e_role")
	private String eRole;
	
	@JsonProperty("e_status")
	private int eStatus;
	
	@JsonProperty("join_date")
	private String joinDate;

	@JsonProperty("e_status_str")
	private String eStatusStr;
	
	@JsonProperty("deptVO")
	private DeptVO deptVO;
	

	//테스트용 추가-희수
	private int level;
	

}
