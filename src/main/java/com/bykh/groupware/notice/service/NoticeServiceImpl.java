package com.bykh.groupware.notice.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	

}
