package com.bykh.groupware.resource.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {
	@Autowired
	private SqlSessionTemplate sqlSession;


	

	
}
