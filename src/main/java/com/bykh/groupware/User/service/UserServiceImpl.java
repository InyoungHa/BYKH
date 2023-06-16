package com.bykh.groupware.User.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.User.vo.UserVO;
import com.bykh.groupware.notice.vo.BoardVO;


@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//메인 todoList 내용 저장
	@Override
	public void insertToDoList(UserVO userVO) {
		sqlSession.insert("userMapper.insertToDoList", userVO);
	}

	//메인 todoList 내용 조회
	@Override
	public List<UserVO> selectToDoList(int empno) {
		return 	sqlSession.selectList("userMapper.selectToDoList",empno);
	}
	
	//메인 todoList 내용 삭제
	@Override
	public void deleteToDoList(UserVO userVO) {
		sqlSession.delete("userMapper.deleteToDoList", userVO);
	}

	//ToDoCode 조회
	@Override
	public String selectToDoCode() {
		return sqlSession.selectOne("userMapper.selectToDoCode");
	}

	//메인 공지 목록
	@Override
	public List<BoardVO> getMainBoard() {
		return sqlSession.selectList("boardMapper.getMainBoard");
	}



	


	

	

	


	
}
