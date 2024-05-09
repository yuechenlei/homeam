package com.xiaoqingxin.homeam.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.model.CompanyInformation;
import com.xiaoqingxin.homeam.service.CompanyInfoService;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Wu Liangxing
 */
@Controller
@RequestMapping("/companyInfo")
public class CompanyInfoController {
    private static final Logger logger = LoggerFactory.getLogger(CompanyInfoController.class);
	
	private CompanyInfoService companyInfoService;
	
	public CompanyInfoController(CompanyInfoService companyInfoService) {
		super();
		this.companyInfoService = companyInfoService;
	}

	@GetMapping("/toCompanyInfo")
	public String toCompanyInformation() {
		return "/companyInfo/companyInfo-index.html";
	}
	
	@GetMapping("/toAdd")
	public String toAdd() {
		return "/companyInfo/companyInfo-add.html";
	}
	
	@GetMapping("/toQuery")
	public String toQuery() {
		return "/companyInfo/companyInfo-query.html";
	}
	
	/** 条目添加  */
	@PostMapping("/add")
	public String add(@ModelAttribute CompanyInformation companyInformation) {
		if(null==companyInformation) {
			throw new RuntimeException("companyInformation is null");
		}
		logger.info("Method=add{},companyInformation=",companyInformation);
        
        companyInfoService.save(companyInformation);
        
        
		return "/companyInfo/companyInfo-addResult.html";
	}
	
	/** 信息查询  */
	@PostMapping("/query")
	public String query(@RequestParam(required = false) String name,
			            @RequestParam(required = false,defaultValue = "1") Integer page,Model model) {
		
		int size = 10;
		
		Paged<CompanyInformation> paged = companyInfoService.getPage(page, size, name);
		
		model.addAttribute("paged", paged);
		
		return "/companyInfo/companyInfo-queryResult.html";
	}
	
	/** 删除一条数据 */
	@PostMapping("/deleteOne/{id}")
	@ResponseBody
	public Map<String,Boolean> deleteOne(@PathVariable Integer id) {
		
		companyInfoService.deleteById(id);
		
		Map<String, Boolean> result = new HashMap<>();
		result.put("success",true);
		
		return result;
		
	}
	
	/** 修改  */
	@PostMapping("/modify")
	@ResponseBody
	public Map<String,Object> modify(@ModelAttribute CompanyInformation companyInfo){
		
		companyInfo = companyInfoService.update(companyInfo);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatDate = sdf.format(companyInfo.getCreatDate());
		String lastModifyDate = sdf.format(companyInfo.getLastModifyDate());
		
		// 把bean转为Map
		Map<String,Object> resultMap = new ObjectMapper().convertValue(companyInfo, new TypeReference<Map<String, Object>>() {});
		resultMap.put("creatDate", creatDate);
		resultMap.put("lastModifyDate", lastModifyDate);
		resultMap.put("success", true);
		
		return resultMap;
	}
	
	/** 查询 by id  */
	@RequestMapping("/query/{id}")
	public String queryById(@PathVariable Integer id,Model model) {
		CompanyInformation companyInfo = null;
		
		Optional<CompanyInformation> op = companyInfoService.findById(id);
		if(op.isPresent()) {
			companyInfo = op.get();
		}else {
			return "/companyInfo/companyInfo-queryResult-one.html";
		}
		
        model.addAttribute("companyInfo", companyInfo);
		
		return "/companyInfo/companyInfo-queryResult-one.html";
	}
        
        
}
