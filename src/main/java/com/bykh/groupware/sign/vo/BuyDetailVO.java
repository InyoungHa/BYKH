package com.bykh.groupware.sign.vo;

import com.bykh.groupware.mro.vo.ItemVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BuyDetailVO {
	private int buyDetailNo;
	private int buyNo;
	private int itemNo;
	private int buyCnt;
	private int buyDetailPrice;
	private ItemVO itemVO;
}
