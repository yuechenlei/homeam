package com.xiaoqingxin.homeam.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiaoqingxin.homeam.beans.CustomerReceiptQueryBean;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.model.CustomerReceipt;
import com.xiaoqingxin.homeam.service.CustomerReceiptService;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Wu Liangxing
 */
@Controller
@RequestMapping("/customerReceipt")
public class CustomerReceiptController {
    private static final Logger logger = LoggerFactory.getLogger(CustomerReceiptController.class);
	
	private CustomerReceiptService crService;

	public CustomerReceiptController(CustomerReceiptService crService) {
		super();
		this.crService = crService;
	}

	@GetMapping("/toCustomerReceipt")
	public String toCustomerReceipt() {
		return "/customerReceipt/customerReceipt-index.html";
	}
	
	@GetMapping("/toAdd")
	public String toAdd() {
		return "/customerReceipt/customerReceipt-add.html";
	}
	
	@GetMapping("/toQuery")
	public String toQuery() {
		return "/customerReceipt/customerReceipt-query.html";
	}
	
	/** Kundenbeleg 条目添加  */
	@PostMapping("/add")
	public String add(@ModelAttribute CustomerReceipt customerReceipt) {
		if(null==customerReceipt) {
			throw new RuntimeException("CustomerReceipt is null");
		}
		
		crService.save(customerReceipt);
        
		return "/customerReceipt/customerReceipt-addResult.html";
	}
	
	/** 查询  */
	@PostMapping("/query")
	public String query(@ModelAttribute CustomerReceiptQueryBean customerReceiptQueryBean,Model model) {
		int page = customerReceiptQueryBean.getPage();
		int size = customerReceiptQueryBean.getSize();
		
		Paged<CustomerReceipt> paged = crService.getPage(page, size, customerReceiptQueryBean);
		
		Page<CustomerReceipt> crPage = paged.getPage();
		if (!crPage.isEmpty()) {
			for (Iterator<CustomerReceipt> iterator = crPage.iterator(); iterator.hasNext();) {
				CustomerReceipt cr = (CustomerReceipt) iterator.next();
				logger.info("Method=query{},customerReceipt=",cr);
				
			}
		}
		
        model.addAttribute("paged", paged);
		
		return "/customerReceipt/customerReceipt-queryResult.html";
	}
	
	/** 删除一条数据 */
	@PostMapping("/deleteOne/{id}")
	@ResponseBody
	public Map<String,Boolean> crDeleteOne(@PathVariable Long id) {
		
		crService.deleteById(id);
		
		Map<String, Boolean> result = new HashMap<>();
		result.put("success",true);
		
		return result;
	}
	
	/** 修改  */
	@PostMapping("/modify")
	@ResponseBody
	public Map<String,Object> modify(@ModelAttribute CustomerReceipt cReceipt){
		
		cReceipt = crService.update(cReceipt);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String transactionDate = sdf.format(cReceipt.getTransactionDate());
		String creatDate = sdf.format(cReceipt.getCreatDate());
		String lastModifyDate = sdf.format(cReceipt.getLastModifyDate());
		
		// 把bean转为Map
		Map<String,Object> resultMap = new ObjectMapper().convertValue(cReceipt, new TypeReference<Map<String, Object>>() {});
		resultMap.put("transactionDate", transactionDate);
		resultMap.put("creatDate", creatDate);
		resultMap.put("lastModifyDate", lastModifyDate);
		resultMap.put("success", true);
		
		return resultMap;
	}
	
	/** 查询 by id  */
	@RequestMapping("/query/{id}")
	public String queryById(@PathVariable Long id,Model model) {
		CustomerReceipt cr = null;
		
		Optional<CustomerReceipt> op = crService.findById(id);
		if(op.isPresent()) {
			cr = op.get();
		}
		
        model.addAttribute("cr", cr);
		
		return "/customerReceipt/customerReceipt-queryResult-one.html";
	}
        
        
}
