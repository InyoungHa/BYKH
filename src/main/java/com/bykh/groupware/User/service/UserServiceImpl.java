package com.bykh.groupware.User.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.emp.vo.EmpVO;
import com.bykh.groupware.notice.vo.BoardVO;
import com.bykh.groupware.User.vo.UserVO;


@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//메인 todoList 내용 저장
	@Override
	public void insertToDoListAjax(UserVO userVO) {
		sqlSession.insert("userMapper.insertToDoList", userVO);
	}

	//메인 todoList 내용 조회
	@Override
	public List<UserVO> selectToDoList(int empno) {
		return 	sqlSession.selectList("userMapper.selectToDoList",empno);
	}
	
	//메인 todoList 내용 삭제
	@Override
	public void deleteToDoListAjax(UserVO userVO) {
		sqlSession.delete("userMapper.deleteToDoList", userVO);
	}

	//ToDoCode 조회
	@Override
	public String selectToDoCode() {
		return sqlSession.selectOne("userMapper.selectToDoCode");
	}

	//메인 공지 목록
	@Override
	public List<BoardVO> getMainBoard(String boardMenuCode) {
		return sqlSession.selectList("boardMapper.getMainBoard", boardMenuCode);
	}

	
	//항목별 관리자 리스트 조회
	@Override
	public List<EmpVO> getEmpRoleList(String role) {
		return sqlSession.selectList("userMapper.getEmpRoleList", role);
	}

	//권한 추가
	@Override
	public void updateRole(EmpVO empVO) {
		sqlSession.update("userMapper.updateRole", empVO);
	}

	//권한 중복 조회
	@Override
	public int roleCheck(EmpVO empVO) {
		return sqlSession.selectOne("userMapper.roleCheck", empVO);
	}

	//권한 삭제
	@Override
	public void deleteRole(EmpVO empVO) {
		sqlSession.update("userMapper.deleteRole", empVO);
	}
	
	//권한 추가한 사원 정보 조회
	@Override
	public EmpVO getRoleEmp(EmpVO empVO) {
		return sqlSession.selectOne("userMapper.getRoleEmp", empVO);
	}
		
	
	// 메인 부서/위치 조회
	@Override
	public UserVO selectDept(int empno) {
		return sqlSession.selectOne("userMapper.selectDept", empno);
	}

	//메인 사원이미지 조회
	@Override
	public UserVO selectAttImg(int empno) {
		return sqlSession.selectOne("userMapper.selectAttImg", empno);
	}




	


	

	

	


	
}
