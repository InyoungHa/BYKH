package com.bykh.groupware.community.service;

import java.util.List;

import com.bykh.groupware.community.vo.BoardLikeVO;
import com.bykh.groupware.community.vo.BoardReportVO;
import com.bykh.groupware.notice.vo.BoardCategoryVO;
import com.bykh.groupware.notice.vo.BoardVO;

public interface CommunityService {
	
	//카테고리 목록 조회
	List<BoardCategoryVO> getBoardCate();
	
	//비밀글 체크
	String checkBoardNum(BoardVO boardVO);
	
	//좋아요 추가
	void insertBoardLike(BoardLikeVO boardLikeVO);
	
	//좋아요 눌렀는지 체크
	boolean getLikeCheck(BoardLikeVO boardLikeVO);
	
	//좋아요 취소
	void deleteBoardLike(BoardLikeVO boardLikeVO);
	
	//인기글 목록 조회
	List<BoardVO> getBoardHotList(BoardVO boardVO);
	
	//신고
	void reportBoard(BoardReportVO boardReportVO);
	
	//신고한 글인지 체크
	boolean getReportCheck(BoardReportVO boardReportVO);
	
	//신고글 리스트 조회
	List<BoardReportVO> getReportList(BoardVO boardVO);
	
	//신고글 개수 조회
	int getReportListCnt();
	
	//신고 취소
	void deleteReport(BoardReportVO boardReportVO);
	
}
