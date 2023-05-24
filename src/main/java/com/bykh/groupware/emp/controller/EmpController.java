package com.bykh.groupware.emp.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.bykh.groupware.dept.service.DeptService;
import com.bykh.groupware.emp.service.EmpService;
import com.bykh.groupware.emp.vo.EmpVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/emp")
public class EmpController {

	@Resource(name="empService")
	private EmpService empService;
	@Resource(name="deptService")
	private DeptService deptService;
	

	
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
		
		//사원등록
		empService.insertEmp(empVO);
		
		return "redirect:/emp/empManage";
	}
	
	/*
	 * @ResponseBody // 키워드로 사원 조회
	 * 
	 * @PostMapping("/getSearchAjax") public List<EmpVO>
	 * getSearchAjax(@RequestParam("type") String type,
	 * 
	 * @RequestParam("keyword") String keyword, EmpVO empVO) {
	 * 
	 * 
	 * 
	 * int totalCnt=empService.getEmpListCnt(); empVO.setTotalDataCnt(totalCnt);
	 * System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+totalCnt);
	 * 
	 * List<EmpVO> empList = empService.selectEmpList(empVO);
	 * 
	 * return empList;
	 * 
	 * }
	 */
	
}
