package com.bykh.groupware.mro.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bykh.groupware.mro.vo.CategoryVO;
import com.bykh.groupware.mro.vo.ItemVO;

@Service("mroService")
public class MroServiceImpl implements MroService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<CategoryVO> getCateList() {
		return sqlSession.selectList("mroMapper.getCateList");
	}
	
	@Override
	public List<ItemVO> getItemListForAdmin(ItemVO itemVO) {
		return sqlSession.selectList("mroMapper.getItemListForAdmin", itemVO);
	}

	@Override
	public int updateItem(ItemVO itemVO) {
		return sqlSession.update("mroMapper.updateItem", itemVO);
	}

	@Override
	public int delItem(int itemNo) {
		return sqlSession.delete("mroMapper.delItem", sqlSession);
	}

	@Override
	public int addItem(ItemVO itemVO) {
		return sqlSession.insert("mroMapper.addItem", itemVO);
	}

	
	
	
}
