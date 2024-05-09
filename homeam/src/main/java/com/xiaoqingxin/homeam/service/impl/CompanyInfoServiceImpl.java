package com.xiaoqingxin.homeam.service.impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.beans.Paging;
import com.xiaoqingxin.homeam.model.CompanyInformation;
import com.xiaoqingxin.homeam.repository.CompanyInfoRepository;
import com.xiaoqingxin.homeam.service.CompanyInfoService;

@Service
public class CompanyInfoServiceImpl implements CompanyInfoService{
	
	private CompanyInfoRepository companyInfoRepository;

	public CompanyInfoServiceImpl(CompanyInfoRepository companyInfoRepository) {
		super();
		this.companyInfoRepository = companyInfoRepository;
	}
	
	
	 /**
     * 获取分页信息
     *
     * @param pageNumber 当前页码
     * @param size 每页数量
     * @param receiptQueryBean 查询bean
	 *
     */
    public Paged<CompanyInformation> getPage(int pageNumber, int size, String name) {

        PageRequest request = PageRequest.of(pageNumber - 1, size, Sort.by("id").ascending());

        Page<CompanyInformation> companyInfoPage;

        if (!"null".equals(name) && StringUtils.hasText(name)) {
            companyInfoPage = companyInfoRepository.findAllByNameLike(name, request);
        } else {
            companyInfoPage = companyInfoRepository.findAll(request);
        }

        return new Paged<CompanyInformation>(companyInfoPage, Paging.of(companyInfoPage.getTotalPages(), pageNumber, size));
    }


	@Override
	public CompanyInformation save(CompanyInformation companyInformation) {
		
		    Date date = new Date();
	        companyInformation.setCreatDate(date);
	        companyInformation.setLastModifyDate(date);
	        
	       return companyInfoRepository.save(companyInformation);
		
	}

	@Override
	public CompanyInformation update(CompanyInformation companyInformation) {
		companyInformation.setLastModifyDate(new Date());
		return companyInfoRepository.save(companyInformation);
	}
	

	@Override
	public void deleteById(Integer id) {
		companyInfoRepository.deleteById(id);
		
	}


	@Override
	public Optional<CompanyInformation> findById(Integer id) {
		
		return companyInfoRepository.findById(id);
	}



}
