package com.bykh.groupware.reply.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.reply.vo.ReplyVO;

@Service("replyService")
public class ReplyServiceImpl implements ReplyService {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//다음으로 들어갈 댓글 번호 조회
	@Override
	public String getNextReplyNum() {
		return sqlSession.selectOne("replyMapper.getNextReplyNum");
	}

	//댓글 등록
	@Override
	public void regReply(ReplyVO replyVO) {
		sqlSession.insert("replyMapper.regReply", replyVO);
	}

	//댓글 번호로 댓글 조회
	@Override
	public ReplyVO getReplyByReplyNum(String replyNum) {
		return sqlSession.selectOne("replyMapper.getReplyByReplyNum", replyNum);
	}

	//댓글 삭제
	@Override
	public void deleteReply(String replyNum) {
		sqlSession.delete("replyMapper.deleteReply", replyNum);
	}

	//댓글 수정
	@Override
	public void updateReply(ReplyVO replyVO) {
		sqlSession.update("replyMapper.updateReply", replyVO);
	}

	
	
	
}
