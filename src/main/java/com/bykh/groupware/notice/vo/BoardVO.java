package com.bykh.groupware.notice.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardVO extends BoardMenuVO{
	private String boardNum;
	private String boardTitle;
	private String boardContent;
	private int boardWriter;
	private String boardDate;
	private int boardView;
	private int boardStatus;
	private String isImportant;
	private String isPrivate;
	private String boardPw;
	private int boardLike;
	
	private BoardCategoryVO boardCategoryVO;
}
