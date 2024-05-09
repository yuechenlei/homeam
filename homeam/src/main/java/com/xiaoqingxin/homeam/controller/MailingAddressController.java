package com.xiaoqingxin.homeam.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiaoqingxin.homeam.beans.MailingAddressQueryBean;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.model.MailingAddress;
import com.xiaoqingxin.homeam.service.MailingAddressService;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 
 * @Description: 通信地址控制器
 * @author: Wu Liangxing
 * @date: 2024年4月17日
 */
@Controller
@RequestMapping("/mailingAddress")
public class MailingAddressController {
	
	private MailingAddressService maService;
	
	
	public MailingAddressController(MailingAddressService maService) {
		super();
		this.maService = maService;
	}

	@GetMapping("/toMailingAddress")
	public String toMailingAddress() {
		return "/mailingAddress/mailingAddress-index.html";
	}
	
	@GetMapping("/toAdd")
	public String toAdd() {
		return "/mailingAddress/mailingAddress-add.html";
	}
	
	@GetMapping("/toQuery")
	public String toQuery() {
		return "/mailingAddress/mailingAddress-query.html";
	}
	
	
	/** 小票条目添加  */
	@PostMapping("/add")
	public String add(@ModelAttribute MailingAddress mailingAddress) {
		if(null==mailingAddress) {
			throw new RuntimeException("mailingAddress is null");
		}
        
        maService.save(mailingAddress);
        
		return "/mailingAddress/mailingAddress-addResult.html";
	}
	
	
	/** 组合查询  */
	@PostMapping("/query")
	public String query(@ModelAttribute("maQueryBean") MailingAddressQueryBean maQueryBean,Model model) {
		
		int page = maQueryBean.getPage();
		int size = maQueryBean.getSize();
		Paged<MailingAddress> paged = maService.getPage(page, size, maQueryBean);
		
		// Page<MailingAddress> receiptPage = paged.getPage();
		
		model.addAttribute("paged", paged);
		
		return "/mailingAddress/mailingAddress-queryResult.html";
	}
	
	
	/** 删除一条数据 */
	@PostMapping("/deleteOne/{id}")
	@ResponseBody
	public Map<String,Boolean> deleteOne(@PathVariable Integer id) {
		
		maService.deleteById(id);
		
		Map<String, Boolean> result = new HashMap<>();
		result.put("success",true);
		
		return result;
	}
	
	
	/** 修改  */
	@PostMapping("/modify")
	@ResponseBody
	public Map<String,Object> modify(@ModelAttribute MailingAddress mailingAddress) {
		
		mailingAddress = maService.update(mailingAddress);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatDate = sdf.format(mailingAddress.getCreatDate());
		String lastModifyDate = sdf.format(mailingAddress.getLastModifyDate());
		
		// 把bean转为Map
		Map<String,Object> resultMap = new ObjectMapper().convertValue(mailingAddress, new TypeReference<Map<String, Object>>() {});
		resultMap.put("creatDate", creatDate);
		resultMap.put("lastModifyDate", lastModifyDate);
		resultMap.put("success", true);
		
		return resultMap;
	}
	
	/** 查询 by id  */
	@RequestMapping("/query/{id}")
	public String queryById(@PathVariable Integer id,Model model) {
		MailingAddress ma = null;
		
		Optional<MailingAddress> op = maService.findById(id);
		if(op.isPresent()) {
			ma = op.get();
		}
		
        model.addAttribute("ma", ma);
		
		return "/mailingAddress/mailingAddress-queryResult-one.html";
	}
    
}
