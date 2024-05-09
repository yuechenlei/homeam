package com.xiaoqingxin.homeam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Wu Liangxing
 */
@Controller
@RequestMapping("/incomeAndExpense")
public class IncomeAndExpenseController {
    @GetMapping("/toIncomeAndExpense")
	public String toIncomeAndExpense(Model model) {
		model.addAttribute("msg","启动成功!!!");
		return "/incomeAndExpense/incomeAndExpense-index.html";
	}
        
}
