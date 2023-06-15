package com.bykh.groupware.mro.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ItemVO extends SearchItemVO{
	
	private int itemNo;
	private int cateNo;
	private String itemName;
	private int itemPrice;
	private int itemCnt;
	private String isUse;
	private String regDate;
	private String updateDate;
	
	//private String searchItemName;
	//private int searchCateNo;
	private SearchItemVO searchItemVO;
	
	private CategoryVO categoryVO;
	
}
