package com.bykh.groupware.emp.controller;





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

import com.bykh.groupware.util.UploadUtil;


import jakarta.annotation.Resource;


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
		
		//사원 비밀번호 암호화
		String encodedPw=encoder.encode(empVO.getEpw());
		empVO.setEpw(encodedPw);
		
		//사원등록
		empService.insertEmp(empVO);
		
		return "redirect:/emp/empManage";
	}
	
	@ResponseBody //사원 상세 정보 모달 띄우기
	@PostMapping("/getEmpDetailAjax")
	public Map<String, Object> getEmpDetailAjax(int empno) {
		
		//System.out.println("~~~~~~~~!!!!!!!!!!!!!!!!"+ empService.selectEmpDetail(empno));
		
		Map<String, Object> resultMap = new HashMap<>();
		
		//부서 정보 조회
		List<DeptVO> depList = deptService.selectDeptListIsUse();
		resultMap.put("deptList", depList);
		
		//사원 정보
		EmpVO empDetail = empService.selectEmpDetail(empno);
		resultMap.put("empDetail", empDetail);
		
		
		return resultMap;
	}
	
	//사원 상세정보 등록
	@ResponseBody
	@PostMapping("/regEmpDetailAjax")
	public void regEmpImgAjax(EmpVO empVO, MultipartFile empImg) {
		System.out.println(empVO);
		
		//ajax로 파일 데이터 보낼 때는 originFileName만 들고 오면 안 되고 파일 데이터 자체를 받아와야 하는데
		//그게 json이랑 map 객체로 하기 어려워서ㅠㅠ 
		//자바스크립트에서 ajax로 formData 객체 보내고 컨트롤러에서 VO로 받는 걸로 바꿨어요
		//하다 보니까 좀 많이 바뀐 것 같아서 ㅠㅠ
		//일단 최대한 원래 코드 살리는 쪽으로 바꿔봤어요
		
		//사진 업로드
		if(empImg != null) {
			//사진 업로드하고 객체 반환함
			EImgVO eImgVO = UploadUtil.uploadFile(empImg);
			
			//반환 받은 객체에 empno 데이터 추가
			eImgVO.setEmpno(empVO.getEmpno());
			
			//쿼리에 필요한 데이터 다 있음(originFileName, attachedFileName, empno)
			System.out.println(eImgVO);
			
			//그 객체로 insert 쿼리 실행
			empService.insertEmpImg(eImgVO);
		}
		
		
		//사원 상세 정보 업데이트
		
		// 사무실 전화번호
		String officeTel = (String)empVO.getOfficeTel();
		
		if(officeTel != null && !officeTel.isEmpty()) {
			officeTel = officeTel.replaceAll("[\\s-]", "");
			
			  if (officeTel.length() == 10) {				  
		            
		            officeTel = officeTel.substring(0, 2) + "-" +
		                        officeTel.substring(2, 6) + "-" +
		                        officeTel.substring(6);
		        } else if (officeTel.length() == 11) {
		            
		            officeTel = officeTel.substring(0, 3) + "-" +
		                        officeTel.substring(3, 7) + "-" +
		                        officeTel.substring(7);
		        }
			  
			 empVO.setOfficeTel(officeTel);
		}
		
		// 휴대전화번호
		String phoneTel = (String)empVO.getPhoneTel();
		
		if(phoneTel != null && !phoneTel.isEmpty()) {
			phoneTel = phoneTel.substring(0,3) + "-" + phoneTel.substring(3, 7) + "-" + phoneTel.substring(7);
			
			empVO.setPhoneTel(phoneTel);
		}
		
		System.out.println(empVO);
		empService.updateEmpDetail(empVO);
		
		
//		//사진 데이터 insert
//		int empno=Integer.parseInt(regDetail.get("empno").toString()); //empno
//		
//		String originFileName=(String)regDetail.get("originFileName"); //origin
//		String attachedFileName=(String)regDetail.get("originFileName"); //origin
//		
//		if(originFileName !=null && !originFileName.isEmpty()) {
//			EImgVO eImgVO = UploadUtil.uploadFile(empImg);			
//			eImgVO.setEmpno(empno);		
//			eImgVO.setOriginFileName(originFileName);
//			eImgVO.setAttachedFileName(eImgVO.getAttachedFileName());
//			//eImgVO.setAttachedFileName(attachedFileName);
//			empService.insertEmpImg(eImgVO);			
//		}	
//		
//		//사무실 전화번호 
//		String officeTel=(String) regDetail.get("officeTel");
//		
//		if(officeTel != null && !officeTel.isEmpty()) {
//			officeTel = officeTel.replaceAll("[\\s-]", "");
//			
//			  if (officeTel.length() == 10) {				  
//		            
//		            officeTel = officeTel.substring(0, 2) + "-" +
//		                        officeTel.substring(2, 6) + "-" +
//		                        officeTel.substring(6);
//		        } else if (officeTel.length() == 11) {
//		            
//		            officeTel = officeTel.substring(0, 3) + "-" +
//		                        officeTel.substring(3, 7) + "-" +
//		                        officeTel.substring(7);
//		        }
//			  
//			 regDetail.put("officeTel",officeTel);
//		}
//		
//		//휴대전화번호
//		String phoneTel = (String)regDetail.get("phoneTel");
//		
//		if(phoneTel != null && !phoneTel.isEmpty()) {
//			phoneTel = phoneTel.substring(0,3) + "-" + phoneTel.substring(3, 7) + "-" + phoneTel.substring(7);
//			regDetail.put("phoneTel",phoneTel);
//		}
//		
//		empService.updateEmpDetail(regDetail); 
	}
	
	
}

