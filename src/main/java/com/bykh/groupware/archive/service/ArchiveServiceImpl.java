package com.bykh.groupware.archive.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("archiveService")
public class ArchiveServiceImpl implements ArchiveService{
	@Autowired
	private SqlSessionTemplate sqlSession;

}
