package com.bykh.groupware.dept.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.dept.service.DeptService;
import com.bykh.groupware.dept.vo.DeptVO;


import jakarta.annotation.Resource;

@Controller
@RequestMapping("/dept")
public class DeptController {
	@Resource(name="deptService")
	private DeptService deptService;
	
	//부서 관리 페이지
	@GetMapping("/deptManage")
	public String deptManage(Model model, DeptVO deptVO) {
		
		
		
		//부서 목록 조회
		model.addAttribute("deptList", deptService.selectDeptList());
		return "content/dept/dept_manage";
	}
	
	//부서등록 
	@PostMapping("/deptManageDo")
	public String deptManageDo(DeptVO deptVO, Model model) {
		
		deptService.insertDept(deptVO);
		
		return "redirect:/dept/deptManage";
	}
	
	@ResponseBody //부서 중복 확인 ajax
	@PostMapping("/isDuplicateAjax")
	public boolean isDuplicate(String loc, String dename) {
		//부서 중복 확인
		DeptVO deptVO = new DeptVO();
		deptVO.setLoc(loc);
		deptVO.setDename(dename);
		
		return deptService.isDulicateDept(deptVO);				
	}
	
	@ResponseBody //부서 등록 ajax
	@PostMapping("/regDeptAjax")
	public List<DeptVO> regDeptAjax(DeptVO deptVO,String loc, String dename) {
				
		//부서 등록 쿼리
		deptService.insertDept(deptVO);
		
		
		return deptService.selectDeptList();
		
	}
	
	@ResponseBody // 부서 삭제 ajax
	@PostMapping("/deleteDeptAjax")
	public void deleteDeptAjax(int deptno) {
		//부서 삭제 쿼리
		deptService.deleteDept(deptno);
	}
	
	@ResponseBody // 사용여부 변경 ajax
	@PostMapping("/changIsUseAjax")
	public int changIsUseAjax(int deptno) {
		
		//부서 사용여부 변경 쿼리
		return deptService.updateIsUse(deptno);
	}

}
