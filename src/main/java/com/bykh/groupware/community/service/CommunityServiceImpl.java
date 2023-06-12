package com.bykh.groupware.community.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	
	
}
