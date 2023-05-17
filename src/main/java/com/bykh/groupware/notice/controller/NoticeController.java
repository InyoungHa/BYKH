package com.bykh.groupware.notice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bykh.groupware.notice.service.NoticeService;

import jakarta.annotation.Resource;


//공지사항 게시판
@Controller
@RequestMapping("/notice")
public class NoticeController {
	@Resource(name = "noticeService")
	private NoticeService noticeService;
	
	//게시판 목록
	@GetMapping("/list")
	public String noticeList() {
		
		return "content/notice/list";
	}
}
