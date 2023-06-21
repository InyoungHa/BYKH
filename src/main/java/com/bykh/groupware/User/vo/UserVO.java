package com.bykh.groupware.User.vo;

import com.bykh.groupware.dept.vo.DeptVO;
import com.bykh.groupware.emp.vo.EImgVO;
import com.bykh.groupware.emp.vo.EmpVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserVO {
	private String toDoCode;
	private int empno;
	private String toDoContent;
	private EmpVO empVO;
	private DeptVO deptVO;
	private EImgVO eImgVO;
}
