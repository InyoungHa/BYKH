package com.bykh.groupware.notice.service;

import java.util.List;

import com.bykh.groupware.notice.vo.BoardVO;

public interface NoticeService {

	//글 등록
	void regNotice(BoardVO boardVO);
	
	//공지 게시판 목록 조회
	List<BoardVO> getNoticeList();
	
	List<BoardVO> getNoticeImportantList();
}
