package com.xiaoqingxin.homeam.service;



import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.beans.ReceiptQueryBean;
import com.xiaoqingxin.homeam.model.Receipt;

/**
 * 
 * @Description: 客户小票服务接口
 * @author: Wu Liangxing
 * @date: 2024年4月25日
 */
public interface ReceiptService {
	
	
	/** 获取分页信息
	 *  @param pageNumber 当前页码
	 *  @param size 每页数量
	 *  @param receiptQueryBean 查询bean
	 */
	public Paged<Receipt> getPage(int pageNumber, int size,ReceiptQueryBean receiptQueryBean);
	
	
	/** 新增或更新
	 *  @param receipt 
	 *   */
	public Receipt saveOrUpdate(Receipt receipt);
	
	public void save(Receipt receipt);
	
	public void deleteById(Long id);
	
	
	
	
}
