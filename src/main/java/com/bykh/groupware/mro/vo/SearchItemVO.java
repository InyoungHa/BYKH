package com.bykh.groupware.mro.vo;

import com.bykh.groupware.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchItemVO extends PageVO{
	public SearchItemVO() {
		super(8, 10);
	}
	private String searchItemName;
	private int searchCateNo;
}
