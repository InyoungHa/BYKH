package com.bykh.groupware.util;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailVO {
	private String title;
	private String content;
	private List<String> recipientList;
}





