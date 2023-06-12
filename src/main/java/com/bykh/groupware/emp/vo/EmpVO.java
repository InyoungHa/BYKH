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

	@JsonProperty("empno")
	private int empno;
	private int deptno;
	
	@JsonProperty("ename")
	private String ename;
	private String epw;
	
	@JsonProperty("e_job")
	private String eJob;
	private int age;
	private String gender;
	private String eEmail;
	
	@JsonProperty("phone_tel")
	private String phoneTel;
	
	@JsonProperty("office_tel")
	private String officeTel;
	
	@JsonProperty("e_role")
	private String eRole;
	
	@JsonProperty("e_status")
	private int eStatus;
	private String joinDate;
	
	private String eStatusStr; //재직상태 이름

	private DeptVO deptVO;
	
	private int eAccount; //계정 상태
	private String eAccountStr; //계정 상태 이름
	
	
	private String searchKeyword;//검색 키워드
	private String searchValue; //검색 
	
	
	private EImgVO eImgVO; // 사원 이미지 등록
	
	private int selectedEStatus;//재직 상태 변경
	private int selectedEAccount;//계정 상태 변경
	
	//테스트용 추가-희수
	private int level;
	

}
