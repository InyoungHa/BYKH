package com.bykh.groupware.User.service;

import java.util.List;

import com.bykh.groupware.User.vo.UserVO;
import com.bykh.groupware.notice.vo.BoardVO;

public interface UserService {
	
	//  메인 TOdolIST 내용저장
	void insertToDoList(UserVO userVO);
	
	// 메인 TOdoList 내용조회
	List<UserVO> selectToDoList(int empno);
	
	// 메인 부서/위치 조회
	UserVO selectDept(int empno);
	
	//메인 사원이미지 조회
	UserVO selectAttImg(int empno);
	
	//메인 TodoList 삭제 
	void deleteToDoList(UserVO userVO);
	
	//toDo코드 조회
	String selectToDoCode();
	
	//메인 공지사항 목록
	List<BoardVO> getMainBoard();
	
}


