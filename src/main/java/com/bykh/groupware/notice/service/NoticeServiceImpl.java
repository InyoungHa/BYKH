package com.bykh.groupware.notice.service;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bykh.groupware.notice.vo.BoardFileVO;
import com.bykh.groupware.notice.vo.BoardVO;
import com.bykh.groupware.reply.vo.ReplyVO;
import com.bykh.groupware.util.ConstVariable;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	//글 개수 조회
	@Override
	public int getBoardCnt(BoardVO boardVO) {
		return sqlSession.selectOne("boardMapper.getBoardCnt", boardVO);
	}
	
	//공지 게시판 목록 조회
	@Override
	public List<BoardVO> getBoardList(BoardVO boardVO) {
		return sqlSession.selectList("boardMapper.getBoardList", boardVO);
	}
	
	//게시판 목록 BOARD_NUM 조회
	@Override
	public List<String> getBoardNumList(BoardVO boardVO) {
		return sqlSession.selectList("boardMapper.getBoardNumList", boardVO);
	}
	
	//공지 게시판 중요글 목록 조회
	@Override
	public List<BoardVO> getBoardImportantList(BoardVO boardVO) {
		return sqlSession.selectList("boardMapper.getBoardImportantList", boardVO);
	}
	
	//게시글에 따른 파일 목록 조회
	@Override
	public List<BoardFileVO> getFileList(BoardVO boardVO) {
		return sqlSession.selectList("boardMapper.getFileList", boardVO);
	}
	
	//다음으로 들어갈 글 번호 조회
	@Override
	public String getNextBoardNum() {
		return sqlSession.selectOne("boardMapper.getNextBoardNum");
	}
	
	//다음으로 들어갈 첨부파일 번호 조회
	@Override
	public int getNextFileNumber() {
		return sqlSession.selectOne("boardMapper.getNextFileNumber");
	}

	
	//글 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regBoard(BoardVO boardVO) {
		//글 등록
		sqlSession.insert("boardMapper.regBoard", boardVO);
		
		//첨부파일 등록
		if(boardVO.getBoardFileList() != null) {
			sqlSession.insert("boardMapper.regFiles", boardVO);
		}
	}

	
	//공지글 상세 조회 (조회수 증가 + 조회)
	@Override
	@Transactional(rollbackFor = Exception.class)
	public BoardVO getBoardDetail(BoardVO boardVO) {
		//조회수 증가
		sqlSession.update("boardMapper.updateBoardView", boardVO);
		
		//글 상세 조회 정보 반환
		return getSelectedBoardDetail(boardVO, false);
	}

	
	//글 수정을 위한 상세 조회(조회수 빼고)
	@Override
	public BoardVO getBoardDetailForUpdate(BoardVO boardVO) {
		//글 상세 조회 정보 반환
		return getSelectedBoardDetail(boardVO, true);
	}
	
	//글 삭제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void deleteBoard(BoardVO boardVO) {
		//해당 글의 첨부파일 있는지 조회
		List<String> deleteFileNumList = sqlSession.selectList("boardMapper.getFileNumByBoardNum", boardVO);
		
		//첨부파일이 있으면 삭제
		if(deleteFileNumList != null) {
			deleteFileByFileNumList(deleteFileNumList);
		}
		
		//글 삭제
		sqlSession.delete("boardMapper.deleteBoard", boardVO);
	}
	
	
	
	//글 수정
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateBoard(BoardVO boardVO, String[] deleteFileNumArr) {
		//삭제된 파일 처리
		if(deleteFileNumArr != null) {
			deleteFileByFileNumList(Arrays.asList(deleteFileNumArr));
		}
		
		//새로운 첨부파일 등록
		if(boardVO.getBoardFileList() != null) {
			sqlSession.insert("boardMapper.regFiles", boardVO);
		}
		
		//글 수정
		sqlSession.update("boardMapper.updateBoard", boardVO);
	}
	
	
	//첨부파일 정보 조회
	@Override
	public BoardFileVO getDownloadFileVO(String fileNum) {
		return sqlSession.selectOne("boardMapper.getDownloadFileVO", fileNum);
	}


	//사번으로 임시저장글 조회
	@Override
	public List<BoardVO> getTempBoardListByEmpno(Map<String, Object> dataMap) {
		return sqlSession.selectList("boardMapper.getTempBoardListByEmpno", dataMap);
	}

	
	//사번으로 임시저장글 개수 조회
	@Override
	public int getTempBoardCntByEmpno(Map<String, Object> dataMap) {
		return sqlSession.selectOne("boardMapper.getTempBoardCntByEmpno", dataMap);
	}
	

	
	
	
	
	
	//fileNum 리스트로 파일 삭제 메소드
	public void deleteFileByFileNumList(List<String> deleteFileNumList) {
		
		for(String deleteFileNum : deleteFileNumList) {
			BoardFileVO fileVO =  sqlSession.selectOne("boardMapper.getDownloadFileVO", deleteFileNum);
			String attachedFileName = fileVO.getAttachedFileName();
			
			File file = new File(ConstVariable.FILE_PATH + attachedFileName);
			file.delete();
			
			sqlSession.delete("boardMapper.deleteFile", deleteFileNum);
		}
	}
	
	
	//글 상세 조회 메소드
	public BoardVO getSelectedBoardDetail(BoardVO boardVO, Boolean update) {
		//첨부파일 조회
		List<BoardFileVO> selectedFileList = sqlSession.selectList("boardMapper.getBoardFile", boardVO);
		
		//댓글 조회
		List<ReplyVO> replyList = sqlSession.selectList("boardMapper.getReplyList", boardVO);
		
		BoardVO selectedBoard = new BoardVO();
		
		//상세 조회하는 글
		if(update == true) { //수정용 상세 조회일 경우
			selectedBoard = sqlSession.selectOne("boardMapper.getBoardDetailForUpdate", boardVO);			
		}
		else {
			selectedBoard = sqlSession.selectOne("boardMapper.getBoardDetail", boardVO);
		}
		
		//첨부파일 변수에 담아줌
		selectedBoard.setBoardFileList(selectedFileList);
		
		//댓글 변수에 담아줌
		selectedBoard.setReplyList(replyList);
		
		//글 상세 조회 정보 반환
		return selectedBoard;
	}
	
	











	


	

}
