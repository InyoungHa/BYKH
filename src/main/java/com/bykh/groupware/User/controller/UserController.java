package com.bykh.groupware.User.controller;


import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.bykh.groupware.User.service.UserService;
import com.bykh.groupware.User.vo.UserVO;
import com.bykh.groupware.attendance.service.AttendanceService;
import com.bykh.groupware.attendance.vo.AttendanceVO;
import com.bykh.groupware.calendar.vo.CalendarVO;
import com.bykh.groupware.dept.service.DeptService;
import com.bykh.groupware.emp.service.EmpService;
import com.bykh.groupware.emp.vo.EImgVO;
import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.resource.vo.ResourceVO;
import com.bykh.groupware.util.DateUtil;
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
		
		return "content/main";
	}
	
	//toDOList 저장
	@ResponseBody
	@PostMapping("/insertToDoList")
	public void insertToDoList(@RequestParam String toDoContent,  Authentication authentication, UserVO userVO) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());	
		userVO.setEmpno(empno);
		userVO.setToDoContent(toDoContent);
		
	
		 userService.insertToDoList(userVO);
		 
		 
	}
		

	//toDoList 삭제
	@ResponseBody
	@PostMapping("/deleteToDoList")
	public void deleteToDoList(String toDoContent,  Authentication authentication, UserVO userVO) {
		User user = (User)authentication.getPrincipal();
		int empno = Integer.parseInt(user.getUsername());	
		userVO.setEmpno(empno);
		userVO.setToDoContent(toDoContent);
		
		
		 userService.deleteToDoList(userVO);
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
		
		
		
		return "content/myPage";
	}
	
	@ResponseBody
	@PostMapping("/regSelfEmpDetailAjax") //마이페이지 수정, 사진등록
	public void regSelfEmpDetailAjax(EmpVO empVO, MultipartFile empImg) {
		System.out.println("%%%%%%%%%%%%%%%%%"+empVO);
		
		if(empImg != null) {
			EImgVO existingImg = empService.selectE_Img(empVO.getEmpno());
			
			if(existingImg == null) {
				
				//사진 업로드하고 객체 반환함
				EImgVO eImgVO = UploadUtil.uploadFile(empImg);
				
				//반환 받은 객체에 empno 데이터 추가
				eImgVO.setEmpno(empVO.getEmpno());
				
				//쿼리에 필요한 데이터 다 있음(originFileName, attachedFileName, empno)
				//System.out.println(eImgVO);
				
				//그 객체로 insert 쿼리 실행
				empService.insertEmpImg(eImgVO);
			}
			else {
				EImgVO eImgVO = existingImg;
				eImgVO.setOriginFileName(eImgVO.getOriginFileName());
				eImgVO.setAttachedFileName(eImgVO.getAttachedFileName());
				empService.updateEmpImg(eImgVO);
			}
			
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
	

}
