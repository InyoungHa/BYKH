package com.bykh.groupware.sign.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BuyVO {
	private int buyNo;
	private int buyDeptNo;
	private int buyPrice;
	private int buyApproval;
	private List<BuyDetailVO> buyDetailList;
}
