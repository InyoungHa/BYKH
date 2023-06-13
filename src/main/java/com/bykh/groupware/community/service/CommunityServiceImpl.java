package com.bykh.groupware.community.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.community.vo.BoardLikeVO;
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
	
	
	
}
