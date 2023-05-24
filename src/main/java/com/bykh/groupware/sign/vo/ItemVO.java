package com.bykh.groupware.sign.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ItemVO {
	private int itemNo;
	private String itemName;
	private int itemPrice;
	private String regDate;
}
