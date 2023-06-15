package com.bykh.groupware.dept.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class BranchLocationInfoVO {
	private String branchCode;
	private String branchAddr;
	private String byWayBus;
	private String byWaySubway;
	private String latitude;
	private String longitude;
}
