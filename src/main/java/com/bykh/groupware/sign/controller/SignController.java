package com.bykh.groupware.sign.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.service.SignService;
import com.bykh.groupware.sign.vo.BuyDetailVO;
import com.bykh.groupware.sign.vo.BuyVO;
import com.bykh.groupware.sign.vo.DocPurchaseOrderVO;
import com.bykh.groupware.sign.vo.SignDocVO;
import com.bykh.groupware.sign.vo.SignVO;
import com.bykh.groupware.util.DateUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/sign")
public class SignController {
	@Resource(name = "signService")
	private SignService signService;
	
	//결재 메인 페이지 이동
	@GetMapping("/signMain")
	public String signMain(Model model, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		model.addAttribute("inProgressSignDocList", signService.getInProgressSignDocList(Integer.parseInt(user.getUsername())));
		model.addAttribute("endSignDocList", signService.getEndSignDocList(Integer.parseInt(user.getUsername())));
		return "content/sign/signMain";
	}
	
	//연차신청서 작성 페이지로 이동
	@GetMapping("/annualLeaveForm")
	public String signWriteForm(Model model, SignDocVO signDocVO, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		
		model.addAttribute("signWriteInfo", signService.getSingWriteInfo(Integer.parseInt(user.getUsername())));//매개변수 변경하기
		model.addAttribute("nowDate", DateUtil.getNowDateToString().substring(0, 10));
		if(signDocVO.getDocNo() != 0) {
			signDocVO = signService.getDetailDocAnnualLeave(signDocVO.getDocNo());
			model.addAttribute("docAnnualLeave", signDocVO.getDocAnnualLeaveVO());
		}
		
		return "content/sign/annual_leave_form";
	}
	
	//구매신청서 작성 페이지
	@GetMapping("/purchaseOrderForm")
	public String purchaseOrderForm(Model model, SignDocVO signDocVO, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		//시큐리티 설정 완료 후 바꾸기
		model.addAttribute("signWriteInfo", signService.getSingWriteInfo(Integer.parseInt(user.getUsername())));
		model.addAttribute("nowDate", DateUtil.getNowDateToString().substring(0, 10));
		model.addAttribute("itemList", signService.getItemList());
		if(signDocVO.getDocNo() != 0) {
			signDocVO = signService.getDetailDocPurchaseOrder(signDocVO.getDocNo());
			System.out.println("data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println(signDocVO);
			model.addAttribute("docPurchaseOrder", signDocVO.getDocPurchaseOrderVO());
		}
		return "content/sign/purchase_order_form";
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
	public String insertSign(SignDocVO signDocVO, String approverNoStr) {
		int docNo = signService.getNextDocNo();
		//결재라인 가공
		String[] approverNoList = approverNoStr.split(",");
		List<SignVO> signList = new ArrayList<>();
		for(int i = 0; i < approverNoList.length; i++) {
			SignVO signVO = new SignVO();
			signVO.setApproverNo(Integer.parseInt(approverNoList[i]));
			signVO.setDocNo(docNo);
			signList.add(signVO);
		}
		//날짜 + 시간 데이터 가공(2023-05-22 09:00:00 ~)
		//String startDate = docAnnualLeaveVO.getStartDate() + " " + docAnnualLeaveVO.getStartTime();
		
		signDocVO.setSignVOList(signList);
	
		//결재문서번호 데이터 넣기
		signDocVO.setDocNo(docNo);
		signDocVO.setDocType(1);
		signDocVO.getDocAnnualLeaveVO().setDocNo(docNo);
		 
		signService.insertDocAnnualLeave(signDocVO);
		
		
		return "redirect:/sign/signMain";
	}
	
	//구매신청서 작성
	@ResponseBody
	@PostMapping("/insertPurchaseorderAjax")
	public void insertPurchaseorderAjax(@RequestBody Map<String, Object> mapData, SignDocVO signDocVO) {
		System.out.println("----------------아래:mapData------------------");		
		//System.out.println(mapData);
		//기존 데이터가 있다면 삭제
		
		//1. 데이터 세팅
		ObjectMapper mapper = new ObjectMapper();
		//signDoc
		signDocVO = mapper.convertValue(mapData.get("sgn_doc"), SignDocVO.class);
		System.out.println("signDocVO = !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
		System.out.println(signDocVO);
		
		//1-3 sgn_arr
		SignVO[] signArr = mapper.convertValue(mapData.get("sgn_arr"), SignVO[].class);
		List<SignVO> signVOList = Arrays.asList(signArr);
		
		signDocVO.setSignVOList(signVOList);
		//1-5 purchase_order
		DocPurchaseOrderVO docPurchaseOrderVO = mapper.convertValue(mapData.get("doc_purchase_order"), DocPurchaseOrderVO.class);
		
		signDocVO.setDocPurchaseOrderVO(docPurchaseOrderVO);
		//1-2 buy
		BuyVO buyVO = mapper.convertValue(mapData.get("buy"), BuyVO.class);
		
		signDocVO.getDocPurchaseOrderVO().setBuyVO(buyVO);
		//1-1 buyDetail
		BuyDetailVO[] buyDetailArr = mapper.convertValue(mapData.get("buy_detail_arr"), BuyDetailVO[].class);
		List<BuyDetailVO> buyDetailVOList = Arrays.asList(buyDetailArr);
		
		signDocVO.getDocPurchaseOrderVO().getBuyVO().setBuyDetailVOList(buyDetailVOList);
		System.out.println(signDocVO);
		
		
		// 기존 데이터가 있다면 삭제(임시저장문서)
		if (signDocVO.getDocNo() != 0) {
			signService.delPurchaseOrder(signDocVO.getDocNo());
		} else {
			// 기존 데이터 없으면 docNo, buyNo 값 세팅
			int docNo = signService.getNextDocNo();
			int buyNo = signService.getNextBuyNo();
			signDocVO.setDocNo(docNo);
			signVOList.get(0).setDocNo(docNo);
			docPurchaseOrderVO.setDocNo(docNo);
			buyVO.setBuyNo(buyNo);
			buyVO.setDocNo(docNo);
			buyDetailVOList.get(0).setBuyNo(buyNo);
		}
		
		//2. 쿼리 실행
		signService.insertDocPurchaseOrder(signDocVO);
	}
	
	//결재문서 상세조회
	@ResponseBody
	@PostMapping("/getSignDocDetailAjax")
	public Map<String, SignDocVO> getSignDocDetailAjax(SignDocVO signDocVO) {
		Map<String, SignDocVO> data = new HashMap<>();
		//docType에 따라 쿼리 실행
		if(signDocVO.getDocType() == 1) {
			data.put("docAnnualLeave", signService.getDetailDocAnnualLeave(signDocVO.getDocNo()));
		}else if(signDocVO.getDocType() == 2) {
			data.put("docPurchaseOrder", signService.getDetailDocPurchaseOrder(signDocVO.getDocNo()));
		}else if(signDocVO.getDocType() == 3) {
			data.put("", signDocVO);			
		}
		
		return data;
	}
	//
	@ResponseBody
	@PostMapping("/updateSignResultAjax")
	public int updateSignResultAjax(SignVO signVO) {
		return signService.updateSignResult(signVO);
	}
	
	
	
	
	
}
