package com.bykh.groupware.notice.service;

import java.util.List;

import com.bykh.groupware.notice.vo.BoardFileVO;
import com.bykh.groupware.notice.vo.BoardVO;

public interface NoticeService {
	
	//글 개수 조회
	int getBoardCnt(BoardVO boardVO);
	
	//공지 게시판 목록 조회
	List<BoardVO> getNoticeList(BoardVO boardVO);
	
	//공지 중요글 목록 조회
	List<BoardVO> getNoticeImportantList();
	
	//다음으로 들어갈 글 번호 조회
	String getNextBoardNum();
	
	//다음으로 들어갈 첨부 파일 번호 조회
	int getNextFileNumber();

	//글 등록
	void regNotice(BoardVO boardVO);
	
	//공지글 상세 조회
	BoardVO getNoticeDetail(BoardVO boardVO);
	
	//수정을 위한 글 상세 조회(조회수 증가 제외)
	BoardVO getNoticeDetailForUpdate(BoardVO boardVO);
	
	//글 삭제
	void deleteBoard(BoardVO boardVO);
	
	//글 수정
	void updateBoard(BoardVO boardVO, String[] deleteFileNum);
	
	//첨부파일 정보 조회
	BoardFileVO getDownloadFileVO(String fileNum);
	
	//사번으로 임시저장글 조회
	List<BoardVO> getTempBoardListByEmpno(int empno);
	
	//사번으로 임시저장글 개수 조회
	int getTempBoardCntByEmpno(int empno);
}
