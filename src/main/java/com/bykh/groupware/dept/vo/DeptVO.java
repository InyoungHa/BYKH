package com.bykh.groupware.dept.vo;





import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DeptVO {
	private int deptno;

	private String dename;
	private String loc;
	private String isUse;
	
	
	//부서 수정_ 중복확인
	private String modifyDename;
	
}
