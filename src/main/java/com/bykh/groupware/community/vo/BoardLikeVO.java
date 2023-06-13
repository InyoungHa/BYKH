package com.bykh.groupware.community.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardLikeVO {
	private String likeNum;
	private int likeUser;
	private String boardNum;
}
