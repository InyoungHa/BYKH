package com.bykh.groupware.User.service;

import java.util.List;

import com.bykh.groupware.User.vo.UserVO;
import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.notice.vo.BoardVO;

public interface UserService {
	
	//  메인 TOdolIST 내용저장
	void insertToDoListAjax(UserVO userVO);
	
	// 메인 TOdoList 내용조회
	List<UserVO> selectToDoList(int empno);
	
	// 메인 부서/위치 조회
	UserVO selectDept(int empno);
	
	//메인 사원이미지 조회
	UserVO selectAttImg(int empno);
	
	//메인 TodoList 삭제 
	void deleteToDoListAjax(UserVO userVO);
	
	//toDo코드 조회
	String selectToDoCode();
	
	//메인 공지사항 목록
	List<BoardVO> getMainBoard();
	
	
	//항목별 관리자 리스트 조회
	List<EmpVO> getEmpRoleList(String role);
	
	//권한 추가
	void updateRole(EmpVO empVO);
	
	//권한 중복 조회
	int roleCheck(EmpVO empVO);
	
	//권한 삭제
	void deleteRole(EmpVO empVO);
	
}


