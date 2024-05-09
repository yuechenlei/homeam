package com.xiaoqingxin.homeam.service;

import java.util.Optional;

import com.xiaoqingxin.homeam.beans.CustomerReceiptQueryBean;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.model.CustomerReceipt;

/**
 * 
 * @Description: Kundenbeleg 服务接口
 * @author: Wu Liangxing
 * @date: 2024年4月25日
 */
public interface CustomerReceiptService {
	
	/** 获取分页信息
	 *  @param pageNumber 当前页码
	 *  @param size 每页数量
	 *  @param receiptQueryBean 查询bean
	 *   */
	public Paged<CustomerReceipt> getPage(int pageNumber, int size,CustomerReceiptQueryBean crQueryBean);
	
	
	public void save(CustomerReceipt customerReceipt);
	
	public CustomerReceipt update(CustomerReceipt customerReceipt);
	
	public void deleteById(Long id);
	
	public Optional<CustomerReceipt> findById(Long id);

}
