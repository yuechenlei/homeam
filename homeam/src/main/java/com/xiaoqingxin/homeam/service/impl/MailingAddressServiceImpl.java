package com.xiaoqingxin.homeam.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.xiaoqingxin.homeam.beans.MailingAddressQueryBean;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.beans.Paging;
import com.xiaoqingxin.homeam.model.MailingAddress;
import com.xiaoqingxin.homeam.repository.MailingAddressRepository;
import com.xiaoqingxin.homeam.service.MailingAddressService;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class MailingAddressServiceImpl implements MailingAddressService{
	
	private MailingAddressRepository maRepo;

	public MailingAddressServiceImpl(MailingAddressRepository maRepo) {
		super();
		this.maRepo = maRepo;
	}
	
	/** 获取分页信息
	 *  @param pageNumber 当前页码
	 *  @param size 每页数量
	 *  @param receiptQueryBean 查询bean
	 *   */
	public Paged<MailingAddress> getPage(int pageNumber, int size,MailingAddressQueryBean maQueryBean) {
		
        PageRequest request = PageRequest.of(pageNumber - 1, size, Sort.by("id").ascending());
        
        Page<MailingAddress> maPage = maRepo.findAll(getSpecification(maQueryBean),request);
        
        return new Paged<MailingAddress>(maPage, Paging.of(maPage.getTotalPages(), pageNumber, size));
    }
	
	

	@Override
	public void save(MailingAddress mailingAddress) {
		
		 Date date = new Date();
	     mailingAddress.setCreatDate(date);
	     mailingAddress.setLastModifyDate(date);
	        
	     maRepo.save(mailingAddress);
		
	}

	@Override
	public MailingAddress update(MailingAddress mailingAddress) {
		
		mailingAddress.setLastModifyDate(new Date());
		return maRepo.save(mailingAddress);
	}

	@Override
	public void deleteById(Integer id) {
		
		maRepo.deleteById(id);
		
	}

	@Override
	public Optional<MailingAddress> findById(Integer id) {
		
		return maRepo.findById(id);
	}
	
	
	/** Jpa 动态查询  */
	private Specification<MailingAddress> getSpecification(MailingAddressQueryBean maQueryBean){
		
		return new Specification<MailingAddress>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<MailingAddress> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> andPredicates = new ArrayList<Predicate>();
				List<Predicate> orPredicates = new ArrayList<Predicate>();
				
				String name = maQueryBean.getName();
				String streetName = maQueryBean.getStreetName();
				Integer postalCode = maQueryBean.getPostalCode();
				String city = maQueryBean.getCity();
				
				if(StringUtils.hasText(name)) {
					orPredicates.add(criteriaBuilder.like(root.get("vorName"),name));
					orPredicates.add(criteriaBuilder.like(root.get("nachName"),name));
				}
				
				if(StringUtils.hasText(streetName)) {
					andPredicates.add(criteriaBuilder.equal(root.get("streetName"),streetName));
				}
				
				if (null != postalCode && StringUtils.hasText(postalCode.toString())) {
					andPredicates.add(criteriaBuilder.equal(root.get("postalCode"), postalCode));
				}
				
				if(StringUtils.hasText(city)) {
					andPredicates.add(criteriaBuilder.equal(root.get("city"),city));
				}
				
				if (!orPredicates.isEmpty()) {
					Predicate orPredicate = criteriaBuilder.or(orPredicates.toArray(new Predicate[orPredicates.size()]));
					andPredicates.add(orPredicate);
				}
				return criteriaBuilder.and(andPredicates.toArray(new Predicate[andPredicates.size()]));
			}
		};
	}


}
