package com.bykh.groupware.community.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bykh.groupware.community.vo.BoardLikeVO;
import com.bykh.groupware.community.vo.BoardReportVO;
import com.bykh.groupware.notice.vo.BoardCategoryVO;
import com.bykh.groupware.notice.vo.BoardVO;

@Service("communityService")
public class CommunityServiceImpl implements CommunityService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	//카테고리 목록 조회
	@Override
	public List<BoardCategoryVO> getBoardCate() {
		return sqlSession.selectList("boardMapper.getBoardCate");
	}

	//비밀글 체크
	@Override
	public String checkBoardNum(BoardVO boardVO) {
		return sqlSession.selectOne("boardMapper.checkBoardNum", boardVO);
	}

	//좋아요 추가
	@Override
	public void insertBoardLike(BoardLikeVO boardLikeVO) {
		sqlSession.insert("boardMapper.insertBoardLike", boardLikeVO);
	}

	//좋아요 눌렀는지 체크
	@Override
	public boolean getLikeCheck(BoardLikeVO boardLikeVO) {
		return sqlSession.selectOne("boardMapper.getLikeCheck", boardLikeVO);
	}

	//좋아요 취소
	@Override
	public void deleteBoardLike(BoardLikeVO boardLikeVO) {
		sqlSession.delete("boardMapper.deleteBoardLike", boardLikeVO);
	}

	//인기글 목록 조회
	@Override
	public List<BoardVO> getBoardHotList(BoardVO boardVO) {
		return sqlSession.selectList("boardMapper.getBoardHotList", boardVO);
	}

	//신고
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void reportBoard(BoardReportVO boardReportVO) {
		sqlSession.insert("boardMapper.reportBoard", boardReportVO);
		
		//신고 개수 확인
		int reportCnt = sqlSession.selectOne("boardMapper.getReportCnt", boardReportVO);
		
		//신고 개수 5개면 상태값 변경
		if(reportCnt >= 5) {
			sqlSession.update("boardMapper.updateReportBoard", boardReportVO);
		}
	}

	//신고한 글인지 체크
	@Override
	public boolean getReportCheck(BoardReportVO boardReportVO) {
		return sqlSession.selectOne("boardMapper.getReportCheck", boardReportVO);
	}

	//신고글 리스트 조회
	@Override
	public List<BoardReportVO> getReportList(BoardVO boardVO) {
		return sqlSession.selectList("boardMapper.getReportList", boardVO);
	}

	//신고글 개수 조회
	@Override
	public int getReportListCnt() {
		return sqlSession.selectOne("boardMapper.getReportListCnt");
	}

	//신고 취소 + 신고 개수 5개 미만이면 블라인드 해제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void deleteReport(BoardReportVO boardReportVO) {
		sqlSession.delete("boardMapper.deleteReport", boardReportVO);

		//신고 개수 확인
		int reportCnt = sqlSession.selectOne("boardMapper.getReportCnt", boardReportVO);
		
		//신고 개수 5개 미만이면 상태값 변경
		if(reportCnt < 5) {
			sqlSession.update("boardMapper.releaseReportBoard", boardReportVO);
		}
		
	}

	
	
	
}
