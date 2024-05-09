package com.xiaoqingxin.homeam.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.beans.ReceiptQueryBean;
import com.xiaoqingxin.homeam.model.Receipt;
import com.xiaoqingxin.homeam.service.ReceiptService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * @Description: 购物小票前端控制器
 * @author: Wu Liangxing
 * @date: 2024年4月12日
 */
@Controller
@RequestMapping("/shopping")
public class ShoppingController {
    private static final Logger logger = LoggerFactory.getLogger(ShoppingController.class);
	
	private ReceiptService receiptService;
	
	public ShoppingController(ReceiptService receiptService) {
		super();
		this.receiptService = receiptService;
	}

	@GetMapping("/toShopping")
	public String toShopping() {
		return "/shopping/shopping-index.html";
	}
	
	@GetMapping("/add")
	public String toAdd() {
		return "/shopping/shopping-add.html";
	}
	
	@GetMapping("/query")
	public String toQuery() {
		return "/shopping/shopping-query.html";
	}
	
	/** 小票条目添加  */
	@PostMapping("/receiptAdd")
	public String receiptAdd(@ModelAttribute Receipt receipt) {
		if(null==receipt) {
			throw new RuntimeException("receipt is null");
		}
		logger.info("Method=receiptAdd{},receipt=",receipt);
        
        Date date = new Date();
        receipt.setCreatDate(date);
        receipt.setLastModifyDate(date);
        
        receiptService.save(receipt);
        
        
		return "/shopping/shopping-addResult.html";
	}
	
	/** 小票组合查询  */
	@PostMapping("/receiptQuery")
	public String receiptQuery(@ModelAttribute ReceiptQueryBean receiptQueryBean,Model model) {
		
		int page = receiptQueryBean.getPage();
		int size = receiptQueryBean.getSize();
		
		Paged<Receipt> paged = receiptService.getPage(page, size, receiptQueryBean);
		
		model.addAttribute("paged", paged);
		
		if (!receiptQueryBean.getShowMain()) {
			return "/shopping/shopping-queryResult.html";
		}
		
		return "/shopping/shopping-queryResult-less.html";
	}
	
	/** 删除一条小票数据 */
	@PostMapping("/receiptDeleteOne/{id}")
	@ResponseBody
	public Map<String,Boolean> receiptDeleteOne(@PathVariable Long id) {
		logger.info("Method=receiptDeleteOne{},id=",id);
		receiptService.deleteById(id);
		
		Map<String, Boolean> result = new HashMap<>();
		result.put("success",true);
		
		return result;
	}
	
	/** 小票修改  */
	@PostMapping("/receiptModify")
	@ResponseBody
	public Map<String,Object> receiptModify(@ModelAttribute Receipt receipt) {
		
		Receipt realReceipt = receiptService.saveOrUpdate(receipt);
		receipt = null;
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String transactionDate = sdf.format(realReceipt.getTransactionDate());
		String creatDate = sdf.format(realReceipt.getCreatDate());
		String lastModifyDate = sdf.format(realReceipt.getLastModifyDate());
		
		// 把bean转为Map
		Map<String,Object> resultMap = new ObjectMapper().convertValue(realReceipt, new TypeReference<Map<String, Object>>() {});
		
		resultMap.put("transactionDate", transactionDate);
		resultMap.put("creatDate", creatDate);
		resultMap.put("lastModifyDate", lastModifyDate);
		resultMap.put("success", true);
		
		return resultMap;
	}
	
	
	
//	@RequestMapping("/receiptAdd")
//	public String receiptAdd(@RequestParam HashMap<Object, String> receiptMap) {
//		
//		if(null==receiptMap || receiptMap.isEmpty()) {
//			throw new RuntimeException("receiptMap为空");
//		}
//		
//		Receipt receipt = new Receipt();
//		receipt.setRealName(receiptMap.get("realName"));
//		receipt.setPackName(receiptMap.get("packName"));
//		receipt.setProductName(receiptMap.get("productName"));
//		receipt.setQuantity(Short.parseShort(receiptMap.get("quantity")));
//		receipt.setWeight(new BigDecimal(receiptMap.get("weight")));
//		
//        System.out.println("receiptMap="+receiptMap.toString());
//		return "/shopping/shopping-receiptAdd.html";
//	}
        
        
}
