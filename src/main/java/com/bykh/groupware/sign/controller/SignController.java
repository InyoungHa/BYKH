package com.bykh.groupware.sign.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sign")
public class SignController {
	//결재 메인 페이지 이동
	@GetMapping("/signMain")
	public String signMain() {
		return "content/sign/signMain";
	}
	
	//결제문서 작성 페이지로 이동
	@GetMapping("/signWriteForm")
	public String signWriteForm() {
		return "content/sign/sign_write_form";
	}
}
