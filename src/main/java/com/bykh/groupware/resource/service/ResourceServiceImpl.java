package com.bykh.groupware.resource.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.resource.vo.ResourceVO;



@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//예약내역조회
	@Override
	public List<ResourceVO> selectResource(int empno) {
		return sqlSession.selectList("attendanceMapper.selectResource",empno);
	}



	
	


	

	
}
