package com.bykh.groupware.community.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardReportVO {
	private String reportNum;
	private int reportUser;
	private String reportReason;
	private String reportDate;
	private String boardNum;
	
	private String ename;
	private String boardTitle;
}
