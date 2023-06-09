package com.bykh.groupware.User.controller;




import java.util.ArrayList;
import java.util.List;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.dept.service.DeptService;
import com.bykh.groupware.dept.vo.BranchLocationInfoVO;
import com.bykh.groupware.dept.vo.OrgDeptVO;
import com.bykh.groupware.dept.vo.OrganizationVO;

import com.bykh.groupware.emp.service.EmpService;

import com.bykh.groupware.emp.vo.EImgVO;
import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.sign.service.SignService;
import com.bykh.groupware.User.service.UserService;
import com.bykh.groupware.User.vo.UserVO;
import com.bykh.groupware.util.DateUtil;
import com.bykh.groupware.util.MailService;
import com.bykh.groupware.util.MailVO;
import com.bykh.groupware.util.UploadUtil;



import jakarta.annotation.Resource;

@Controller
@RequestMapping("/user")
public class UserController {
	@Resource(name = "attendanceService")
	private  AttendanceService attendanceService;
	@Resource(name = "empService")
	private  EmpService empService;
	@Resource(name="deptService")
	private DeptService deptService;
	@Resource(name="userService")
	private UserService userService;
	@Resource(name="signService")
	private SignService signService;
	@Resource(name="mailService")
	private MailService mailService;
	
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	//로그인 페이지
	@GetMapping("/log")
	public String login() {
		
		return "content/login";
	}
	
	//메인페이지이동
	@GetMapping("/main")
	public String main(Model model, AttendanceVO attendanceVO, Authentication authentication) {
		String nowDate = DateUtil.getNowDateToString(); //오늘날짜설정
		if(attendanceVO.getCurDate() == null) {
			attendanceVO.setCurDate(nowDate);
		}	
		
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());
				
		//이름 조회
		model.addAttribute("selectName",attendanceService.selectName(empno));

		//ToDoList 조회
		model.addAttribute("toDoCotent",userService.selectToDoList(empno));
		
		//공지 목록 조회
		model.addAttribute("noticeList", userService.getMainBoard("BOARD_MENU_002"));
		
		//자료실 목록 조회
		model.addAttribute("archiveList", userService.getMainBoard("BOARD_MENU_001"));
		
		//결재문서 조회
		model.addAttribute("sgnDocList", signService.getMainSignDocList(empno));
		
		//부서/위치 조회
		model.addAttribute("selectDept", userService.selectDept(empno));
		
		//사원이미지 조회
		model.addAttribute("selectAttImg", userService.selectAttImg(empno));
			
		return "content/user/main";

	}
	
	//toDOList 저장
	@ResponseBody
	@PostMapping("/insertToDoListAjax")
	public void insertToDoListAjax(String toDoCode,  Authentication authentication, UserVO userVO) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());	
		userVO.setEmpno(empno);		


		 userService.insertToDoListAjax(userVO);
		 
		 
	}
		

	//toDoList 삭제
	@ResponseBody
	@PostMapping("/deleteToDoListAjax")
	public void deleteToDoListAjax(@RequestParam String toDoCode,  Authentication authentication, UserVO userVO) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());	
		userVO.setEmpno(empno);
		userVO.setToDoCode(toDoCode);
		
		
		 userService.deleteToDoListAjax(userVO);
	}
	
	 //비번 변경전 비번 확인
    @GetMapping("/checkEPwPage")
    public String checkPwdView(){
        return "content/user/check_e_pw_page";
    }
    
    
    
    //비번 확인 ajax
    @ResponseBody
    @PostMapping("/checkPwdAjax")
    public Boolean checkPassword(String checkPassword, Authentication authentication){
    	
  
    	//입력한 비밀번호 가져와서 암호화 처리 
		//String inputPw = encoder.encode(checkPw);
		//System.out.println("@@input에 입력한 비번 : " + inputPw);
		//암호화 된 비밀번호와 일치하는지 확인 
		// 무조건 () 안의 앞에는 암호화 되지 않은 입력값이 와야함!! 
		// ex)encoder.matches("1234", ss);//true, false
        
        String inputPw = encoder.encode(checkPassword); // 입력한 비밀번호
        System.out.println("입력한 비번: "+inputPw);
        
        int empno =(Integer.parseInt(authentication.getName()));
        System.out.println("로그인한 사번 :"+empno);
        
        String epw = empService.getEpw(empno); //원래 비밀번호
        System.out.println("원래 비번: "+epw);
        
       Boolean result = encoder.matches(checkPassword,epw); //입력한 비번이랑 원래 비번 비교
       
       return result;
    
    }
    
    //비밀번호 변경 페이지로 이동
    @GetMapping("/changeEPW")
    public String pwChangePage() {
    	
    	return "content/user/change_e_pw";
    }
    
    //비밀번호 변경 ajax
    @ResponseBody
    @PostMapping("/changeEPWAjax") 
    public boolean changeEPWAjax(String changePassword, Authentication authentication) {
    	
    	System.out.println("변경할 비번!!!!!!!!!!" + changePassword);
    	
    	
    	
    	//변경할 비번
    	String changePw = encoder.encode(changePassword);
    	System.out.println("입력한 변경 비번 : "+ changePw);
    	
    	//로그인한 사번
    	int empno =Integer.parseInt(authentication.getName());
    	
    	//원래 비밀번호랑 같은 비번인지 확인
    	String epw =empService.getEpw(empno);
    	
    	Boolean result = encoder.matches(changePassword,epw); //입력한 비번이랑 원래 비번 비교
    	
    	Boolean resultStr;
    	if(result) {
    		resultStr =false;
    	}else {
    		EmpVO empVO = new EmpVO();
    		empVO.setEmpno(empno);
    		empVO.setEpw(changePw);
    		
    		//비밀번호 변경 쿼리
    		empService.updateEpw(empVO);
    		resultStr = true;
    	}
    	
    	    	
    	return resultStr;
    }
    
    //비밀번호 찾기 페이지로 이동
    @GetMapping("/findEPWForm")
    public String findEPWForm() {
    	
    	return "content/user/find_e_pw";
    }
    
    //메일로 임시비밀번호 받기
    @ResponseBody
    @PostMapping("/getEmailEPWAjax")
    public boolean getEmailEPWAjax(@RequestParam int empno, @RequestParam String ename) {
    	System.out.println("!!!!!!!!!!!!!"+empno);
    	System.out.println("!!!!!!!!!!!!!"+ename);
    	
    	EmpVO empVO = new EmpVO();
    	
    	empVO.setEmpno(empno);
    	empVO.setEname(ename);
    	
    	//empno, ename 일치하면 e_email select
    	String eMail = empService.getEmailEpw(empVO);
    	System.out.println(eMail);
    	
    	//e_email이 null이 아니면 임시비번으로 update (empno, ename이 일치함)
    	if(eMail != null) {
    		//임시비밀번호로 비번 변경
    		//임시 비번 생성
    		String imsiPw =mailService.createRandomPw();
    		
    		//임시 비번 암호호
    		String encodeImsiPw= encoder.encode(imsiPw);
    		
    		//암호화된 임시 비번 적용
    		empVO.setEpw(encodeImsiPw);
    		
    		//비번 update 쿼리
    		empService.updateImsiEpw(empVO);
    		
    		//임시 비밀번호 메일 보내기 설정
    		MailVO mailVO = new MailVO();
    		mailVO.setTitle("임시 비밀번호가 발송되었습니다.");
    		
    		List<String> eMailList = new ArrayList<>();
    		eMailList.add(eMail);
    		mailVO.setRecipientList(eMailList);
    		mailVO.setContent("임시 비밀번호는 "+imsiPw +" 입니다. 임시 비밀번호로 로그인 부탁드립니다.");
    		
    		
    		mailService.sendSimpleEmail(mailVO);
    		    		
    	}
    	
    	return eMail != null? true : false;
    }
    
    
	
	//마이 페이지로 이동
	@GetMapping("/myPageForm")
	public String myPage(Model model, EmpVO empVO, Authentication authentication) {
		
		User user =(User)authentication.getPrincipal();
		int empno =Integer.parseInt(user.getUsername());
		
		
		EmpVO empDetail=empService.selectSelfEmpDetail(empno);
		//System.out.println("###############"+empDetail);

		//휴대전화 번호
		String phoneTel=empDetail.getPhoneTel();
		
		if(phoneTel !=null) {
			String[] phoneNumParts = phoneTel.split("-");
			String firstPhone = phoneNumParts[0];
			String numberPhone = phoneNumParts[1]+phoneNumParts[2];
			
			
			
			model.addAttribute("firstPhone", firstPhone);
			model.addAttribute("numberPhone", numberPhone);			
		}
		
		
		//사무실 번호
		String officeTel = empDetail.getOfficeTel();
		
		if(officeTel != null) {
			String[] officeNumParts = officeTel.split("-");
			String firstOffice = officeNumParts[0];
			String numberOffice = officeNumParts[1]+officeNumParts[2];
			
			model.addAttribute("firstOffice", firstOffice);
			model.addAttribute("numberOffice", numberOffice);
			
		}
			
		
		
		//개인 정보 상세 조회
		model.addAttribute("empDetail",empService.selectSelfEmpDetail(empno));
		
		//사용중인 부서 조회쿼리
		model.addAttribute("deptListIsUse", deptService.selectDeptListIsUse());
		
		
		
		return "content/user/myPage";
	}
	
	@ResponseBody
	@PostMapping("/regSelfEmpDetailAjax") //마이페이지 수정, 사진등록
	public void regSelfEmpDetailAjax(EmpVO empVO, MultipartFile empImg) {
		System.out.println("%%%%%%%%%%%%%%%%%"+empVO);
			
		//사진 업로드
		if(empImg != null) {			
				EImgVO eImgVO = UploadUtil.uploadFile(empImg);
				
				//반환 받은 객체에 empno 데이터 추가
				eImgVO.setEmpno(empVO.getEmpno());
				
				//쿼리에 필요한 데이터 다 있음(originFileName, attachedFileName, empno)
				System.out.println(eImgVO);
				
				//그 객체로 insert 쿼리 실행
				empService.insertOrUpdateE_Img(eImgVO);			
		}
		

		
		//사원 상세 정보 업데이트		
		// 사무실 전화번호
		String officeTel = (String) empVO.getOfficeTel();

		if (officeTel != null && !officeTel.isEmpty()) {
			officeTel = officeTel.replaceAll("[\\s-]", "");

			if (officeTel.length() == 10) {

				officeTel = officeTel.substring(0, 2) + "-" + officeTel.substring(2, 6) + "-" + officeTel.substring(6);
			} else if (officeTel.length() == 11) {

				officeTel = officeTel.substring(0, 3) + "-" + officeTel.substring(3, 7) + "-" + officeTel.substring(7);
			}

			empVO.setOfficeTel(officeTel);
		}

		// 휴대전화번호
		String phoneTel = (String) empVO.getPhoneTel();

		if (phoneTel != null && !phoneTel.isEmpty()) {
			phoneTel = phoneTel.substring(0, 3) + "-" + phoneTel.substring(3, 7) + "-" + phoneTel.substring(7);

			empVO.setPhoneTel(phoneTel);
		}

		empService.updateSelfEmpDetail(empVO);				
	}
	
	
	//지도 페이지로 이동
	@GetMapping("/branchMap")
	public String branchMap(Model model) {
		
		return "content/user/branchMap";
	}
	
	@ResponseBody //테이블_ 지도 그리기
	@PostMapping("/getBranchInfoAjax")
	public BranchLocationInfoVO getBranchInfoAjax(String branchCode) {
		System.out.println(deptService.selectBranchLocation(branchCode));
		
		return deptService.selectBranchLocation(branchCode);
		
	}
	
	//사원용 조직도
	@GetMapping("/organizationMap")
	public String organizationMap(Model model) {
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
		
		model.addAttribute("organizationList", organizationList);
		
		return "content/user/organization_map";
	}
	
	//권한 관리 페이지 이동
	@GetMapping("/roleManage")
	public String roleManage(Model model) {
		//지역 목록 조회 
		List<OrganizationVO> organizationList = deptService.getLocList();
	 
		//모든 지역 정보를 조회 
		for(OrganizationVO organizationVO : organizationList) {
			//지역에 속한 모든 부서 목록 조회 
			List<OrgDeptVO> deptList = deptService.getDeptListForOrg(organizationVO.getLoc());
			
			organizationVO.setOrgDeptList(deptList);
		}
		
		model.addAttribute("organizationList", organizationList);
		
		return "content/user/role_manage";
	}
	
	//부서별 사원 정보 조회 (권한 관리 조직도)
	@ResponseBody
	@PostMapping("/getDeptEmpListAjax")
	public List<EmpVO> getDeptEmpList(int deptno) {
		
		return deptService.getEmpListForOrg(deptno);
	}
	
	//항목별 관리자 리스트 조회
	@ResponseBody
	@PostMapping("/getEmpRoleListAjax")
	public List<EmpVO> getEmpRoleList(String eRole) {
		return userService.getEmpRoleList(eRole);
	}
	
	//권한 중복 조회
	@ResponseBody
	@PostMapping("/roleCheckAjax")
	public int roleCheck(EmpVO empVO) {
		return userService.roleCheck(empVO);
	}
	
	//권한 추가
	@ResponseBody
	@PostMapping("/updateRoleAjax")
	public EmpVO updateRole(EmpVO empVO) {
		userService.updateRole(empVO);
		
		return userService.getRoleEmp(empVO);
	}
	
	//권한 삭제
	@ResponseBody
	@PostMapping("/deleteRoleAjax")
	public void deleteRole(EmpVO empVO) {
		userService.deleteRole(empVO);
	}
	
	//관리자 문의 페이지로 이동
	@GetMapping("/userAsk")
	public String userAsk() {
		
		return "content/user/userAsk";
	}

	//사원 조회
	@ResponseBody
	@PostMapping("/searchEmpAjax")
	public List<EmpVO> searchEmp(EmpVO empVO, Model model) {
	
		System.out.println(empVO);
		/*
		 * int totalDataCnt = empService.getHeaderEmpListCnt(empVO);
		 * empVO.setTotalDataCnt(totalDataCnt);
		 */
		//사원 조회 쿼리
		return empService.selectForHeader(empVO);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
