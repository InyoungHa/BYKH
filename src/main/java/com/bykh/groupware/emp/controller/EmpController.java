package com.bykh.groupware.emp.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	

	
	//사번 관리 페이지
	@GetMapping("/empManage")
	public String empManage(Model model) {
		
		//사번 조회 쿼리
		model.addAttribute("deptList", deptService.selectDeptList());
		
		//사원 조회 쿼리
		model.addAttribute("empList", empService.selectEmpList());
		return "content/emp/emp_manage";
	}
	
	
	
	@ResponseBody
	@PostMapping("/regEmpAjax")
	public List<EmpVO> regEmpAjax(@RequestBody EmpVO empVO) {
		
		//사원 번호 생성_간편
		empService.insertEmp(empVO);
		
		//사원 조회 쿼리
		return empService.selectEmpList();
	}
}
