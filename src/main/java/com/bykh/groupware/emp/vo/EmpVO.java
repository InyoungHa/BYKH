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
	
	private String eStatusStr; //재직상태 이름

	private DeptVO deptVO;
	
	private int eAccount; //계정 상태
	private String eAccountStr; //계정 상태 이름
	
	
	private String searchKeyword;//검색 키워드
	private String searchValue; //검색 
	
	private EImgVO eImgVO; // 사원 이미지 등록
	
	

	//테스트용 추가-희수
	private int level;
	

}
