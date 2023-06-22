package com.bykh.groupware.sales.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/sale")
public class SalesController {

	
	@GetMapping("/salesStatusPerYear")
	public String salesStatusPerYear() {
		
		return "content/sales/sale_status_per_year";
	}
	
}
