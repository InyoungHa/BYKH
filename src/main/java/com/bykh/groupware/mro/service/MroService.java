package com.bykh.groupware.mro.service;

import java.util.List;

import com.bykh.groupware.mro.vo.CategoryVO;
import com.bykh.groupware.mro.vo.ItemVO;

public interface MroService {
	List<CategoryVO> getCateList();
	List<ItemVO> getItemListForAdmin(ItemVO itemVO);
	List<ItemVO> getItemListForEmp();
	int updateItem(ItemVO itemVO);
	int delItem(int itemNo);
	int addItem(ItemVO itemVO);
	int getItemCntForMroManage(ItemVO itemVO);
 }
