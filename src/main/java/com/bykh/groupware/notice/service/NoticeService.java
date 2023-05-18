package com.bykh.groupware.notice.service;

import java.util.List;

import com.bykh.groupware.notice.vo.BoardVO;

public interface NoticeService {

	//글 등록
	void regNotice(BoardVO boardVO);
	
	//공지 게시판 목록 조회
	List<BoardVO> getNoticeList();
	
	//공지 중요글 목록 조회
	List<BoardVO> getNoticeImportantList();
	
	//공지글 상세 조회
	BoardVO getNoticeDetail(BoardVO boardVO);
	
	//글 삭제
	void deleteBoard(BoardVO boardVO);
	
	//글 수정
	void updateBoard(BoardVO boardVO);
	
}
