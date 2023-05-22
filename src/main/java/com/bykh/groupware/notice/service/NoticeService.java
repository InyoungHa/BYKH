package com.bykh.groupware.notice.service;

import java.util.List;

import com.bykh.groupware.notice.vo.BoardFileVO;
import com.bykh.groupware.notice.vo.BoardVO;

public interface NoticeService {
	
	//공지 게시판 목록 조회
	List<BoardVO> getNoticeList();
	
	//공지 중요글 목록 조회
	List<BoardVO> getNoticeImportantList();
	
	//다음으로 들어갈 글 번호 조회
	String getNextBoardNum();

	//글 등록
	void regNotice(BoardVO boardVO);
	
	//공지글 상세 조회
	BoardVO getNoticeDetail(BoardVO boardVO);
	
	//글 삭제
	void deleteBoard(BoardVO boardVO);
	
	//글 수정
	void updateBoard(BoardVO boardVO, String[] deleteFileNum);
	
	//첨부파일 정보 조회
	BoardFileVO getDownloadFileVO(String fileNum);
	
}
