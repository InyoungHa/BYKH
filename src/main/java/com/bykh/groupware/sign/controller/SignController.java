package com.bykh.groupware.sign.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.naming.factory.webservices.ServiceRefFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.dept.service.DeptService;
import com.bykh.groupware.dept.vo.OrgDeptVO;
import com.bykh.groupware.dept.vo.OrganizationVO;
import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.mro.vo.ItemVO;
import com.bykh.groupware.sign.service.SignService;
import com.bykh.groupware.sign.vo.BuyDetailVO;
import com.bykh.groupware.sign.vo.BuyVO;
import com.bykh.groupware.sign.vo.DocPurchaseOrderVO;
import com.bykh.groupware.sign.vo.ReferrerVO;
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
	@Resource(name = "deptService")
	private DeptService deptService;
	
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
		//===========조직도 정보=============
		//지역 목록 조회 
		List<OrganizationVO> organizationList = deptService.getLocList();	 
		//모든 지역 정보를 조회 
		for(OrganizationVO organizationVO : organizationList) {
			//지역에 속한 모든 부서 목록 조회 
			List<OrgDeptVO> deptList = deptService.getDeptListForOrg(organizationVO.getLoc());
			
			organizationVO.setOrgDeptList(deptList);
		}		
		model.addAttribute("organizationList", organizationList);
		
		return "content/sign/annual_leave_form";
	}
	
	//구매신청서 작성 페이지
	@GetMapping("/purchaseOrderForm")
	public String purchaseOrderForm(Model model, SignDocVO signDocVO, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		model.addAttribute("signWriteInfo", signService.getSingWriteInfo(Integer.parseInt(user.getUsername())));
		model.addAttribute("nowDate", DateUtil.getNowDateToString().substring(0, 10));
		model.addAttribute("itemList", signService.getItemList());
		if(signDocVO.getDocNo() != 0) {
			signDocVO = signService.getDetailDocPurchaseOrder(signDocVO.getDocNo());
			model.addAttribute("docPurchaseOrder", signDocVO.getDocPurchaseOrderVO());
		}
		
		
		//===========조직도 정보=============
		//지역 목록 조회 
		List<OrganizationVO> organizationList = deptService.getLocList();	 
		//모든 지역 정보를 조회 
		for(OrganizationVO organizationVO : organizationList) {
			//지역에 속한 모든 부서 목록 조회 
			List<OrgDeptVO> deptList = deptService.getDeptListForOrg(organizationVO.getLoc());
			
			organizationVO.setOrgDeptList(deptList);
		}		
		model.addAttribute("organizationList", organizationList);
		return "content/sign/purchase_order_form";
	}
	
	// mro  > 구매신청서 작성 페이지
	@GetMapping("/purchaseOrderFormMro")
	public String purchaseOrderFormMro(@RequestParam("buyDetailArr") String buyDetailArrJson, Model model, Authentication authentication) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			List<BuyDetailVO> buyDetailList = objectMapper.readValue(buyDetailArrJson, objectMapper.getTypeFactory().constructCollectionType(List.class, BuyDetailVO.class));
			
			// itemVO를 ItemVO 객체로 변환
			for (BuyDetailVO buyDetail : buyDetailList) {
				ItemVO item = objectMapper.convertValue(buyDetail.getItemVO(), ItemVO.class);
				buyDetail.setItemVO(item);
			}
			model.addAttribute("buyDetailList", buyDetailList);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
		//구매신청서 작성 페이지 이동시와 같은 코드
		User user = (User)authentication.getPrincipal();
		model.addAttribute("signWriteInfo", signService.getSingWriteInfo(Integer.parseInt(user.getUsername())));
		model.addAttribute("nowDate", DateUtil.getNowDateToString().substring(0, 10));
		model.addAttribute("itemList", signService.getItemList());
		//===========조직도 정보=============
		//지역 목록 조회 
		List<OrganizationVO> organizationList = deptService.getLocList();	 
		//모든 지역 정보를 조회 
		for(OrganizationVO organizationVO : organizationList) {
			//지역에 속한 모든 부서 목록 조회 
			List<OrgDeptVO> deptList = deptService.getDeptListForOrg(organizationVO.getLoc());
			
			organizationVO.setOrgDeptList(deptList);
		}		
		model.addAttribute("organizationList", organizationList);
		
		return "content/sign/purchase_order_form";
	}
	
	//쓰이는지 확인!!!!!!!!!!!!
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
	public String insertSign(SignDocVO signDocVO, String approverNoStr, String referrerNoStr) {
		//기존 데이터가 있다면 삭제(임시저장)
		if(signDocVO.getDocNo() != 0) {
			signService.delAnnualLeave(signDocVO.getDocNo());
		}
		
		
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
		signDocVO.setSignVOList(signList);
		//참조라인 가공
		String[] referrerNoArr = referrerNoStr.split(",");
		List<ReferrerVO> referrerList = new ArrayList<>();
		for(int i=0; i < referrerNoArr.length; i++) {
			ReferrerVO referrerVO = new ReferrerVO();
			referrerVO.setReferrerNo(Integer.parseInt(referrerNoArr[i]));
			referrerVO.setDocNo(docNo);
			referrerList.add(referrerVO);
		}
		signDocVO.setReferrerVOList(referrerList);
		//날짜 + 시간 데이터 가공(2023-05-22 09:00:00 ~)
		//String startDate = docAnnualLeaveVO.getStartDate() + " " + docAnnualLeaveVO.getStartTime();
		
		//결재문서번호 데이터 넣기
		signDocVO.setDocNo(docNo);
		signDocVO.setDocType(1);
		signDocVO.getDocAnnualLeaveVO().setDocNo(docNo);
		System.out.println(signDocVO);
		signService.insertDocAnnualLeave(signDocVO);
		
		
		return "redirect:/sign/signMain";
	}
	
	//구매신청서 작성
	@ResponseBody
	@PostMapping("/insertPurchaseorderAjax")
	public void insertPurchaseorderAjax(@RequestBody Map<String, Object> mapData, SignDocVO signDocVO) {
		//System.out.println(mapData);
		//기존 데이터가 있다면 삭제
		
		//1. 데이터 세팅
		ObjectMapper mapper = new ObjectMapper();
		//1-1 signDoc
		signDocVO = mapper.convertValue(mapData.get("sgn_doc"), SignDocVO.class);
		
		//1-2 sgn_arr
		SignVO[] signArr = mapper.convertValue(mapData.get("sgn_arr"), SignVO[].class);
		List<SignVO> signVOList = Arrays.asList(signArr);
		
		signDocVO.setSignVOList(signVOList);
		//1-3 referrer_arr
		ReferrerVO[] referrerArr = mapper.convertValue(mapData.get("referrer_arr"), ReferrerVO[].class);
		List<ReferrerVO> referrerVOList = Arrays.asList(referrerArr);
		
		signDocVO.setReferrerVOList(referrerVOList);
		//1-4 purchase_order
		DocPurchaseOrderVO docPurchaseOrderVO = mapper.convertValue(mapData.get("doc_purchase_order"), DocPurchaseOrderVO.class);
		
		signDocVO.setDocPurchaseOrderVO(docPurchaseOrderVO);
		//1-5 buy
		BuyVO buyVO = mapper.convertValue(mapData.get("buy"), BuyVO.class);
		
		signDocVO.getDocPurchaseOrderVO().setBuyVO(buyVO);
		//1-6 buyDetail
		BuyDetailVO[] buyDetailArr = mapper.convertValue(mapData.get("buy_detail_arr"), BuyDetailVO[].class);
		List<BuyDetailVO> buyDetailVOList = Arrays.asList(buyDetailArr);
		
		signDocVO.getDocPurchaseOrderVO().getBuyVO().setBuyDetailVOList(buyDetailVOList);
		System.out.println(signDocVO);
		
		
		// 기존 데이터가 있다면 삭제(임시저장문서)
		if (signDocVO.getDocNo() != 0) {
			signService.delPurchaseOrder(signDocVO.getDocNo());
		}
		
		// docNo, buyNo 값 세팅
		int docNo = signService.getNextDocNo();
		int buyNo = signService.getNextBuyNo();
		signDocVO.setDocNo(docNo);
		signVOList.get(0).setDocNo(docNo);
		docPurchaseOrderVO.setDocNo(docNo);
		buyVO.setBuyNo(buyNo);
		buyVO.setDocNo(docNo);
		buyDetailVOList.get(0).setBuyNo(buyNo);
		
		
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		System.out.println(signDocVO);
		signDocVO.getSignVOList();
		//2. 쿼리 실행
		signService.insertDocPurchaseOrder(signDocVO);
	}
	@ResponseBody
	@PostMapping("/delSgnDocAjax")
	public void delSgnDocAjax(SignDocVO signDocVO) {
		if(signDocVO.getDocType() == 1) {
			signService.delAnnualLeave(signDocVO.getDocNo());
		}else if(signDocVO.getDocType() == 2) {
			signService.delPurchaseOrder(signDocVO.getDocNo());
		}else if(signDocVO.getDocType() == 3) {
		}
	}
	
	//결재문서 상세조회
	@ResponseBody
	@PostMapping("/getSignDocDetailAjax")
	public Map<String, SignDocVO> getSignDocDetailAjax(SignDocVO signDocVO) {
		Map<String, SignDocVO> data = new HashMap<>();
		//docType에 따라 쿼리 실행
		String keyName = "";
		if(signDocVO.getDocType() == 1) {
			keyName = "docAnnualLeave";
			signDocVO = signService.getDetailDocAnnualLeave(signDocVO.getDocNo());
		}else if(signDocVO.getDocType() == 2) {
			keyName = "docPurchaseOrder";
			signDocVO = signService.getDetailDocPurchaseOrder(signDocVO.getDocNo());
		}else if(signDocVO.getDocType() == 3) {
			keyName = "";
			signDocVO = null;
		}
		data.put(keyName, signDocVO);
		return data;
	}
	//'결재' 또는 '반려' 클릭 시 실행
	@ResponseBody
	@PostMapping("/updateSignResultAjax")
	public void updateSignResultAjax(SignVO signVO) {
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		System.out.println("controller 실행~~~~~~~~~~~~~");
		
		signService.updateSignResult(signVO);
		//모든 결재자가 결재했을 경우 구매결재여부 1(승인)으로 변경
		signService.updateBuyApproval(signVO);
			
		SignDocVO signDocVO = new SignDocVO();
		signDocVO.setDocNo(signVO.getDocNo());
		//결재결과가 '결재'고 다음 결재자가 없다면 문서 상태를 '결재완료'로 변경
		System.out.println("두번째 실행~~~~~~~~~~");
		if(signVO.getSgnResult() == 1 && signService.getNextApproverNo(signVO.getDocNo()) == 0) {
			signDocVO.setSgnStatus(2);
			signService.updateSignStatus(signDocVO);
		//결재결과가 '반려'이면 문서상태를 '반려'로 변경
		}else if(signVO.getSgnResult() == 0) {
			signDocVO.setSgnStatus(3);
			signService.updateSignStatus(signDocVO);
		}
	}
	
	
	
	
	
	
}
