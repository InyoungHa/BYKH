package com.bykh.groupware.reply.service;

import com.bykh.groupware.reply.vo.ReplyVO;

public interface ReplyService {
	
	//다음으로 들어갈 댓글 번호 조회
	String getNextReplyNum();
	
	//댓글 등록
	void regReply(ReplyVO replyVO);
	
	//댓글 번호로 댓글 조회(한 개)
	ReplyVO getReplyByReplyNum(String replyNum);
	
	//댓글 삭제
	void deleteReply(String replyNum);

	//댓글 수정
	void updateReply(ReplyVO replyVO);
}
