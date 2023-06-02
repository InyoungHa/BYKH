package com.bykh.groupware.emp.controller;




import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.bykh.groupware.dept.service.DeptService;
import com.bykh.groupware.dept.vo.DeptVO;
import com.bykh.groupware.emp.service.EmpService;
import com.bykh.groupware.emp.vo.EImgVO;
import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.util.ConstVariable;
import com.bykh.groupware.util.UploadUtil;

import groovyjarjarantlr4.v4.misc.EscapeSequenceParsing.Result;
import jakarta.annotation.Resource;
import oracle.sql.Mutable;

@Controller
@RequestMapping("/emp")
public class EmpController {

	@Resource(name="empService")
	private EmpService empService;
	@Resource(name="deptService")
	private DeptService deptService;
	@Autowired
	private PasswordEncoder encoder;
	

	
	//사원 관리 페이지
	@RequestMapping("/empManage")
	public String empManage(Model model, EmpVO empVO) {
		
		//전체 데이터 수 세팅
		int totalDataCnt = empService.getEmpListCnt(empVO);
		empVO.setTotalDataCnt(totalDataCnt);
		
		//페이징 정보 세팅
		empVO.setPageInfo();		
		
		//사용중인 부서 조회쿼리
		model.addAttribute("deptListIsUse", deptService.selectDeptListIsUse());
		
		//사원 조회 쿼리
		model.addAttribute("empList", empService.selectEmpList(empVO));
		
		return "content/emp/emp_manage";
	}
	
	@PostMapping("/regEmpForm")//사원 등록_간편
	public String regEmpAjax(EmpVO empVO) {
		
		String encodedPw=encoder.encode(empVO.getEpw());
		empVO.setEpw(encodedPw);
		
		//사원등록
		empService.insertEmp(empVO);
		
		return "redirect:/emp/empManage";
	}
	
	@ResponseBody //사원 상세 정보 모달 띄우기
	@PostMapping("/getEmpDetailAjax")
	public Map<String, Object> getEmpDetailAjax(int empno) {
		
		System.out.println("~~~~~~~~!!!!!!!!!!!!!!!!"+ empService.selectEmpDetail(empno));
		
		Map<String, Object> resultMap = new HashMap<>();
		
		//부서 정보 조회
		List<DeptVO> depList = deptService.selectDeptListIsUse();
		resultMap.put("deptList", depList);
		
		//사원 정보
		EmpVO empDetail = empService.selectEmpDetail(empno);
		resultMap.put("empDetail", empDetail);
		
		
		return resultMap;
	}
	
	//사원 사진 등록
	@ResponseBody
	@PostMapping("/regEmpDetailAjax")
	public void regEmpImgAjax(MultipartFile empImg, @RequestBody Map<String, Object> regDetail) {
		
		System.out.println("!!!!!!!!!!!!!!!!"+regDetail.get("empno"));
		System.out.println("!!!!!!!!!!!!!!!!"+regDetail.toString());
		
		//사진 데이터 insert
		String originFileName=(String)regDetail.get("originFileName");
		
		if(originFileName !=null && !originFileName.isEmpty()) {
			EImgVO attachedFile = UploadUtil.uploadFile(empImg);
			attachedFile.setOriginFileName(originFileName);
			empService.insertEmpImg(attachedFile);
			
		}		
		
		//update 데이터		
		empService.updateEmpDetail(regDetail);		
		
	}
	
	
}
