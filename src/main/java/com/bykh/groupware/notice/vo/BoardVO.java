package com.bykh.groupware.notice.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardVO {
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
	
	private BoardMenuVO boardMenuVO;
	private BoardCategoryVO boardCategoryVO;
	
	private List<BoardFileVO> boardFileList;
	
	private String ename;
	private String boardPrevNum;
	private String boardPrevTitle;
	private String boardNextNum;
	private String boardNextTitle;
	private int fileCnt;
}
