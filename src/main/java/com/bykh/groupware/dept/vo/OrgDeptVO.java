package com.bykh.groupware.dept.vo;

import java.util.List;

import com.bykh.groupware.emp.vo.EmpVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class OrgDeptVO {
	private int deptno;
	private String dename;
	private List<EmpVO> empList;
}
