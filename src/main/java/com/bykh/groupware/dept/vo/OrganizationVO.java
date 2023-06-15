package com.bykh.groupware.dept.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
//조직도 데이터를 받을 객체
public class OrganizationVO {
	private String loc; //지역명
	private List<OrgDeptVO> orgDeptList;
}
