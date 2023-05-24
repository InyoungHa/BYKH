package com.bykh.groupware.reply.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.reply.service.ReplyService;
import com.bykh.groupware.reply.vo.ReplyVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/reply")
public class ReplyController {
	@Resource(name = "replyService")
	private ReplyService replyService;
	
	//댓글 등록
	@ResponseBody
	@PostMapping("/regReply")
	public ReplyVO regReplyAjax(ReplyVO replyVO) {
		//다음으로 들어갈 댓글 번호 조회
		String nextReplyNum = replyService.getNextReplyNum();
		//댓글 번호 세팅
		replyVO.setReplyNum(nextReplyNum);
		
		//댓글 등록
		replyService.regReply(replyVO);
		
		return replyService.getReplyByReplyNum(nextReplyNum);
	}
	
	//댓글 삭제
	@ResponseBody
	@PostMapping("/delete")
	public void deleteReply(String replyNum) {
		replyService.deleteReply(replyNum);
	}
	
	//댓글 수정
	@ResponseBody
	@PostMapping("/update")
	public ReplyVO updateReply(ReplyVO replyVO) {
		replyService.updateReply(replyVO);
		
		return replyService.getReplyByReplyNum(replyVO.getReplyNum());
	}
	
	
	
}
