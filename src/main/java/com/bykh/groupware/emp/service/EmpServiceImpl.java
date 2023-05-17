package com.bykh.groupware.emp.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("empService")
public class EmpServiceImpl implements EmpService {

	@Autowired
	private SqlSessionTemplate sqlSession;
}
