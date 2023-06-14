package com.bykh.groupware.User.service;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.User.vo.UserVO;


@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public void insertToDoList(UserVO userVO) {
		sqlSession.insert("userMapper.insertToDoList", userVO);
	}



	


	

	

	


	
}
