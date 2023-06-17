package com.bykh.groupware.dept.controller;

import java.util.List;
import java.util.Map;

import org.springframework.expression.spel.ast.Literal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.dept.service.DeptService;
import com.bykh.groupware.dept.vo.DeptVO;
import com.bykh.groupware.dept.vo.OrgDeptVO;
import com.bykh.groupware.dept.vo.OrganizationVO;
import com.bykh.groupware.emp.vo.EmpVO;

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

	//조직도 페이지로 이동
	@GetMapping("/organizationManage")
	public String organizationManage(Model model) {
		
		
		 //지역 목록 조회 
		List<OrganizationVO> organizationList = deptService.getLocList();
		 
		 //모든 지역 정보를 조회 
		for(int i = 0 ; i < organizationList.size() ; i++) {
			OrganizationVO organizationVO = organizationList.get(i);
		  
			 //지역에 속한 모든 부서 목록 조회 
			List<OrgDeptVO> deptList = deptService.getDeptListForOrg(organizationVO.getLoc());
		  
			//모든 부서에 포함된 모든 직원 조회 
			for (int j = 0; j < deptList.size(); j++) {
				int deptno = deptList.get(j).getDeptno();
				List<EmpVO> empList = deptService.getEmpListForOrg(deptno);
				deptList.get(j).setEmpList(empList);
			}
			organizationList.get(i).setOrgDeptList(deptList);
		}
		
		//데이터 조회
		//System.out.println(organizationList.toString());
		
		//조직도 데이터
		model.addAttribute("organizationList", organizationList);		
		
		return "content/dept/organiazion_manage";
	}

	//조직도 페이지 사원 정보 띄우기 ajax
	@ResponseBody
	@PostMapping("/getDeptEmpAjax")
	public List<EmpVO> getDeptEmpAjax(int deptno) {
		
		return deptService.getEmpListForOrg(deptno);
	}
	
	@ResponseBody //지사에 등록된 부서 띄우기 
	@PostMapping("/getDeptListAjax")
	public List<OrgDeptVO> getDeptListAjax(String loc) {
		//System.out.println(loc);
		return deptService.getDeptListForOrg(loc);
		
	}

	
	@ResponseBody //부서 수정_ 중복 확인 ajax
	@PostMapping("/isDuplicateModifyDenameAjax")
	public boolean isDuplicateModifyDenameAjax(String loc, String dename, String modifyDename) {
		//부서 중복 확인
		DeptVO deptVO = new DeptVO();
		deptVO.setLoc(loc);
		deptVO.setDename(dename);
		deptVO.setModifyDename(modifyDename);
		
	
		
		System.out.println(deptService.isDuplicateModifyDename(deptVO));
		
		return  deptService.isDuplicateModifyDename(deptVO);			
	}
	
	
	@ResponseBody //부서 수정
	@PostMapping("/updateDenameAjax")
	public void updateDenameAjax(@RequestBody Map<String, Object> modifyData) {
		
	    String loc =(String) modifyData.get("loc");
	    String dename =(String) modifyData.get("dename");
	    int deptno = (Integer)modifyData.get("deptno");
	    String modifyDename = (String)modifyData.get("modifyDename");
	    
	    System.out.println("!!!!!!!!!!!!11"+loc);
	    System.out.println("!!!!!!!!!!!!11"+dename);
	    System.out.println("!!!!!!!!!!!!11"+dename);
	    System.out.println("!!!!!!!!!!!!11"+modifyDename);
	    
	    DeptVO deptVO = new DeptVO();
	    deptVO.setLoc(loc);
	    deptVO.setDename(dename);
	    deptVO.setDeptno(deptno);
	    deptVO.setModifyDename(modifyDename);
	    
	    //부서명 수정 쿼리
	    deptService.updateDename(deptVO);
	    
	}
}


























