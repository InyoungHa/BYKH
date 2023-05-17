package com.bykh.groupware.notice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.notice.vo.BoardVO;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//글 등록
	@Override
	public void regNotice(BoardVO boardVO) {
		sqlSession.insert("boardMapper.regNotice", boardVO);
	}

	//공지 게시판 목록 조회
	@Override
	public List<BoardVO> getNoticeList() {
		return sqlSession.selectList("boardMapper.getNoticeList");
	}

	//공지 게시판 중요글 목록 조회
	@Override
	public List<BoardVO> getNoticeImportantList() {
		return sqlSession.selectList("boardMapper.getNoticeImportantList");
	}
	
	

}
