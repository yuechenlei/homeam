package com.xiaoqingxin.homeam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Wu Liangxing
 */
@Controller
public class HomepageController {
    @GetMapping("/")
	public String homepage(Model model) {
		model.addAttribute("msg","启动成功!!!");
		System.out.println("****************** 启动成功!!! *****************");
		return "index.html";
	}
	
    @GetMapping("/admin")
	public String adminpage(Model model) {
		model.addAttribute("msg","启动成功!!!");
		System.out.println("****************** 直接进入管理员页面!!! *****************");
		return "administration.html";
	}
        
}
