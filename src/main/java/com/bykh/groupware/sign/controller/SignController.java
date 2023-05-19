package com.bykh.groupware.sign.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.service.SignService;
import com.bykh.groupware.sign.vo.DocTypeVO;
import com.bykh.groupware.sign.vo.SignDocVO;
import com.bykh.groupware.util.DateUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/sign")
public class SignController {
	@Resource(name = "signService")
	private SignService signService;
	
	//결재 메인 페이지 이동
	@GetMapping("/signMain")
	public String signMain(Model model) {
		model.addAttribute("inProgressSignDocList", signService.getInProgressSignDocList());
		model.addAttribute("endSignDocList", signService.getInProgressSignDocList());
		return "content/sign/signMain";
	}
	
	//결제문서 작성 페이지로 이동
	@GetMapping("/signWriteForm")
	public String signWriteForm(Model model, SignDocVO signDocVO) {
		//로그인기능 + 시큐리티 설정 완료 후 바꿔야 하는 코드 시작
		//유저이름 + 부서정보 + 기안일 가져가기 + 도장이미지정보? + 상위 결재자 가져가기
		 // 시큐리티 설정 완료 후 바꾸기
		
		model.addAttribute("signWriteInfo", signService.getSingWriteInfo(2023050301));//매개변수 변경하기
		model.addAttribute("nowDate", DateUtil.getNowDateToString());
		return "content/sign/sign_write_form";
	}
	
	//결제문서 작성 페이지 - 결재자 추가 시 전체 직원 조회
	@ResponseBody
	@PostMapping("/getEmpListAjax")
	public Map<String, List<EmpVO>> getEmpListAjax(String ename){
		List<EmpVO> empVOList = signService.getEmpList(ename);
		
		Map<String, List<EmpVO>> data = new HashMap<>();
		data.put("empList", empVOList);
		
		return data;
	}
	
	//연차신청서 작성
	@PostMapping("/insertSign")
	public String insertSign(DocTypeVO docTypeVO) {
		
		signService.insertDocAnnualLeave(docTypeVO);
		
		return "redirect: /sign/signMain";
	}
	
	
	
	
	
	
	
	
	
}
