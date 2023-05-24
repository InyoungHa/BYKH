package com.bykh.groupware.emp.vo;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

//사원 검색 전용 VO
public class SearchEmpVO  {
	
	
	private String searchKeyword; //검색 키워드
	private String searchValue; // 검색 타입

	private int searchEmpno; //사번 검색
	private String searchEname; //사원 이름 검색
	private int searchDeptno; //부서 이름 검색
	private int searchEstatus; //재직 상태 검색
	private String searchErole; //계정 관리자 여부 검색
	
}
