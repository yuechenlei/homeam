package com.xiaoqingxin.homeam.service;

import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.model.CompanyInformation;

import java.util.Optional;

import org.springframework.stereotype.Service;

/**
 *
 * @author Wu Liangxing
 */
@Service
public interface CompanyInfoService {

    /**
     * 获取分页信息
     *
     * @param pageNumber 当前页码
     * @param size 每页数量
     * @param receiptQueryBean 查询bean
	 *
     */
    public Paged<CompanyInformation> getPage(int pageNumber, int size, String name);
    
    public CompanyInformation save(CompanyInformation companyInformation);
    
    public CompanyInformation update(CompanyInformation companyInformation);
    
    public void deleteById(Integer id);
    
    public Optional<CompanyInformation> findById(Integer id);

}
