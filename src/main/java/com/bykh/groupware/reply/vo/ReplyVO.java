package com.bykh.groupware.reply.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReplyVO {
	private String replyNum;
	private int replyWriter;
	private String replyContent;
	private String replyDate;
	private String boardNum;
	
	private String ename;
	private String attachedFileName;
}
