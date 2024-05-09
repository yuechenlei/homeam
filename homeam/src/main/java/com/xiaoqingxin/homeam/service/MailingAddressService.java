package com.xiaoqingxin.homeam.service;

import java.util.Optional;

import com.xiaoqingxin.homeam.beans.MailingAddressQueryBean;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.model.MailingAddress;

public interface MailingAddressService {
	
	/** 获取分页信息
	 *  @param pageNumber 当前页码
	 *  @param size 每页数量
	 *  @param receiptQueryBean 查询bean
	 *   */
	public Paged<MailingAddress> getPage(int pageNumber, int size,MailingAddressQueryBean maQueryBean);
	
	public void save(MailingAddress mailingAddress);
	
	public MailingAddress update(MailingAddress mailingAddress);
	
	public void deleteById(Integer id);
	
	public Optional<MailingAddress> findById(Integer id);

}
