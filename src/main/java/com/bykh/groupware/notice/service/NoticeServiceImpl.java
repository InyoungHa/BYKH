package com.bykh.groupware.notice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	//공지글 상세 조회
	@Override
	@Transactional(rollbackFor = Exception.class)
	public BoardVO getNoticeDetail(BoardVO boardVO) {
		//조회수 증가
		sqlSession.update("boardMapper.updateBoardView", boardVO);
		
		//글 상세 조회 정보 반환
		return sqlSession.selectOne("boardMapper.getNoticeDetail", boardVO);
	}

	//글 삭제
	@Override
	public void deleteBoard(BoardVO boardVO) {
		sqlSession.delete("boardMapper.deleteBoard", boardVO);
	}

	
	//글 수정
	@Override
	public void updateBoard(BoardVO boardVO) {
		sqlSession.update("boardMapper.updateBoard", boardVO);
	}

	


	

}
