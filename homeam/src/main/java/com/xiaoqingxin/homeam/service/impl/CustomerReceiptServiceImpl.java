package com.xiaoqingxin.homeam.service.impl;

import java.math.BigDecimal;
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

import com.xiaoqingxin.homeam.beans.CustomerReceiptQueryBean;
import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.beans.Paging;
import com.xiaoqingxin.homeam.model.CustomerReceipt;
import com.xiaoqingxin.homeam.repository.CustomerReceiptRepository;
import com.xiaoqingxin.homeam.service.CustomerReceiptService;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class CustomerReceiptServiceImpl implements CustomerReceiptService{
	
	private CustomerReceiptRepository crRepository;
	
	public CustomerReceiptServiceImpl(CustomerReceiptRepository crRepository) {
		super();
		this.crRepository = crRepository;
	}

	@Override
	public Paged<CustomerReceipt> getPage(int pageNumber, int size, CustomerReceiptQueryBean crQueryBean) {
		
		PageRequest request = PageRequest.of(pageNumber - 1, size, Sort.by("id").ascending());
        
	    Page<CustomerReceipt> crPage = crRepository.findAll(getSpecification(crQueryBean),request);
	        
	    return new Paged<CustomerReceipt>(crPage, Paging.of(crPage.getTotalPages(), pageNumber, size));
	}

	@Override
	public void save(CustomerReceipt customerReceipt) {
		
		Date date = new Date();
        customerReceipt.setCreatDate(date);
        customerReceipt.setLastModifyDate(date);
        
        crRepository.save(customerReceipt);
	}
	
	@Override
	public CustomerReceipt update(CustomerReceipt customerReceipt) {
		
		customerReceipt.setLastModifyDate(new Date());
		
		return crRepository.save(customerReceipt);
	}

	@Override
	public void deleteById(Long id) {
		crRepository.deleteById(id);
	}

	@Override
	public Optional<CustomerReceipt> findById(Long id) {
		
		return crRepository.findById(id);
	}
	
	/** Jpa 动态查询  */
	private Specification<CustomerReceipt> getSpecification(CustomerReceiptQueryBean crQueryBean){
		
		return new Specification<CustomerReceipt>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<CustomerReceipt> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> andPredicates = new ArrayList<Predicate>();
				
				Integer terminalId = crQueryBean.getTerminalId();
				String paymentMethod = crQueryBean.getPaymentMethod();
				BigDecimal amountV = crQueryBean.getAmountV();
				BigDecimal amountB = crQueryBean.getAmountB();
				Date transactionDateStart = crQueryBean.getTransactionDateStart();
				Date transactionDateEnd = crQueryBean.getTransactionDateEnd();
				
				if(null!=terminalId && StringUtils.hasText(terminalId.toString())) {
					andPredicates.add(criteriaBuilder.equal(root.get("terminalId"),terminalId));
				}
				
				if(StringUtils.hasText(paymentMethod)) {
					andPredicates.add(criteriaBuilder.equal(root.get("paymentMethod"),paymentMethod));
				}
				
				if (null != amountV && StringUtils.hasText(amountV.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("amount"), amountV));
				}
				
				if (null != amountB && StringUtils.hasText(amountB.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("amount"), amountB));
				}
				
				if (null != transactionDateStart && StringUtils.hasText(transactionDateStart.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("transactionDate"), transactionDateStart));
				}
				
				if (null != transactionDateEnd && StringUtils.hasText(transactionDateEnd.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("transactionDate"), transactionDateEnd));
				}
				
				return criteriaBuilder.and(andPredicates.toArray(new Predicate[andPredicates.size()]));
			}
		};
	}

	

}
