package com.bykh.groupware.mro.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.mro.service.MroService;
import com.bykh.groupware.mro.vo.ItemVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/mro")
public class MroController {
	@Resource(name = "mroService")
	private MroService mroService;
	
	@RequestMapping("/mroManage")
	public String mroManage(Model model, ItemVO itemVO) {
		
		//페이지 정보 세팅
		itemVO.setTotalDataCnt(mroService.getItemCntForMroManage(itemVO));
		itemVO.setNowPage(itemVO.getNowPage());
		itemVO.setPageInfo();
		
		model.addAttribute("itemList", mroService.getItemListForAdmin(itemVO));
		model.addAttribute("cateList", mroService.getCateList());
		return "content/mro/mro_manage";
	}
	
	@PostMapping("/addItem")
	public String addItem(ItemVO itemVO) {
		mroService.addItem(itemVO);
		return "redirect:/mro/mroManage";
	}
	
	@PostMapping("/updateItem")
	public String updateItem(ItemVO itemVO) {
		mroService.updateItem(itemVO);
		return "redirect:/mro/mroManage";
	}
	
	@RequestMapping("/mroEmp")
	public String mroEmp(Model model, ItemVO itemVO){
		model.addAttribute("itemList", mroService.getItemListForEmp(itemVO));
		model.addAttribute("cateList", mroService.getCateList());
		return "content/mro/mro_emp";
	}
	
	@ResponseBody
	@PostMapping("/searchItemListAjax")
	public List<ItemVO> searchItemListAjax(ItemVO itemVO){
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
		System.out.println(itemVO);
		return mroService.getItemListForEmp(itemVO);
	}
	/*
	 * @ResponseBody
	 * 
	 * @PostMapping("/searchItemListAjax") public Map<String, List<ItemVO>>
	 * searchItemListAjax(ItemVO itemVO){ Map<String, List<ItemVO>> data = new
	 * HashMap<>(); data.put("searchItemList",
	 * mroService.getItemListForEmp(itemVO)); return data; }
	 */
	
}
