package com.bykh.groupware.community.service;

import java.util.List;

import com.bykh.groupware.notice.vo.BoardCategoryVO;
import com.bykh.groupware.notice.vo.BoardVO;

public interface CommunityService {
	
	//카테고리 목록 조회
	List<BoardCategoryVO> getBoardCate();
	
	//비밀글 체크
	String checkBoardNum(BoardVO boardVO);

}
