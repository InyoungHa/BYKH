package com.bykh.groupware.sign.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DocPurchaseOrderVO {
	private int dpoNo;
	private int docNo;
	private String dpoComment;
	private BuyVO buyVO;
}
