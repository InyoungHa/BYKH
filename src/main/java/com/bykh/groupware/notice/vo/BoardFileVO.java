package com.bykh.groupware.notice.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardFileVO {
	private String fileNum;
	private String originFileName;
	private String attachedFileName;
	private String fileSize;
	private String boardNum;
}
