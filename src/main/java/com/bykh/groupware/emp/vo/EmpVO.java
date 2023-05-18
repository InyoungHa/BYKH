package com.bykh.groupware.emp.vo;

import com.bykh.groupware.dept.vo.DeptVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmpVO {

	private int empno;
	private int deptno;
	private String ename;
	private String epw;
	private String eJob;
	private int age;
	private String gender;
	private String eEmail;
	private String phoneTel;
	private String officeTel;
	private String eRole;
	private int eStatus;
	private String joinDate;
	private DeptVO deptVO;
}
