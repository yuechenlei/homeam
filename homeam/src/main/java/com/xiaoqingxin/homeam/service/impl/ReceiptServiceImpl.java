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

import com.xiaoqingxin.homeam.beans.Paged;
import com.xiaoqingxin.homeam.beans.Paging;
import com.xiaoqingxin.homeam.beans.ReceiptQueryBean;
import com.xiaoqingxin.homeam.model.Receipt;
import com.xiaoqingxin.homeam.repository.ReceiptRepository;
import com.xiaoqingxin.homeam.service.ReceiptService;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service("ReceiptService")
public class ReceiptServiceImpl implements ReceiptService{
	
	private ReceiptRepository receiptRepository;

	public ReceiptServiceImpl(ReceiptRepository receiptRepository) {
		super();
		this.receiptRepository = receiptRepository;
	}

	@Override
	public Paged<Receipt> getPage(int pageNumber, int size, ReceiptQueryBean receiptQueryBean) {
		// 从第1页开始,显示10条,根据id升序排列
        PageRequest request = PageRequest.of(pageNumber - 1, size, Sort.by("id").ascending());
        
        Page<Receipt> receiptPage = receiptRepository.findAll(getSpecification(receiptQueryBean),request);
        
        return new Paged<Receipt>(receiptPage, Paging.of(receiptPage.getTotalPages(), pageNumber, size));
	}

	@Override
	public Receipt saveOrUpdate(Receipt receipt) {

		// Save
		if (null == receipt.getId()) return receiptRepository.saveAndFlush(receipt);
		
		// Exception
		Optional<Receipt> optional = receiptRepository.findById(receipt.getId());
		if (!optional.isPresent()) throw new RuntimeException("不明存储请求，receiptId="+receipt.getId());
		
		// Update
		Receipt realReceipt = optional.get();
		if (StringUtils.hasText(receipt.getRealName())) realReceipt.setRealName(receipt.getRealName());
		if (StringUtils.hasText(receipt.getPackName())) realReceipt.setPackName(receipt.getPackName());
		realReceipt.setProductName(receipt.getProductName());
		realReceipt.setUnitPrice(receipt.getUnitPrice());
		realReceipt.setUnitOfPrice(receipt.getUnitOfPrice());
		realReceipt.setTotalPrice(receipt.getTotalPrice());
		realReceipt.setUnit(receipt.getUnit());
		realReceipt.setWeight(receipt.getWeight());
		realReceipt.setUnitOfWeight(receipt.getUnitOfWeight());
		realReceipt.setQuantity(receipt.getQuantity());
		realReceipt.setVat(receipt.getVat());
		if (null != receipt.getCoupon()) realReceipt.setCoupon(receipt.getCoupon());
		if (null != receipt.getDiscount()) realReceipt.setDiscount(receipt.getDiscount());
		if (null != receipt.getPayBack()) realReceipt.setPayBack(receipt.getPayBack());
		if (null != receipt.getSubCategory()) realReceipt.setSubCategory(receipt.getSubCategory());
		if (null != receipt.getCategory()) realReceipt.setCategory(receipt.getCategory());
		realReceipt.setMarketName(receipt.getMarketName());
		realReceipt.setCustomerReceiptId(receipt.getCustomerReceiptId());
		realReceipt.setTransactionDate(receipt.getTransactionDate());
		if (null != receipt.getCreatDate()) realReceipt.setCreatDate(receipt.getCreatDate());
		realReceipt.setLastModifyDate(new Date());
		receipt = null;
		
		return receiptRepository.saveAndFlush(realReceipt);
	}
	
	
	/** Jpa 动态查询  */
	private Specification<Receipt> getSpecification(ReceiptQueryBean receiptQueryBean){
		
		return new Specification<Receipt>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Receipt> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> andPredicates = new ArrayList<Predicate>();
				List<Predicate> orPredicates = new ArrayList<Predicate>();
				
				String category = receiptQueryBean.getCategory();
				String subCategory = receiptQueryBean.getSubCategory();
				String name = receiptQueryBean.getName();
				BigDecimal totalPriceX = receiptQueryBean.getTotalPriceX();
				BigDecimal totalPriceD = receiptQueryBean.getTotalPriceD();
				String marketName = receiptQueryBean.getMarketName();
				Date transactionDateStart = receiptQueryBean.getTransactionDateStart();
				Date transactionDateEnd = receiptQueryBean.getTransactionDateEnd();
				
				if(StringUtils.hasText(subCategory)) {
					andPredicates.add(criteriaBuilder.equal(root.get("subCategory"),subCategory));
				}else if (StringUtils.hasText(category)) {
					andPredicates.add(criteriaBuilder.equal(root.get("category"),category));
				}
				
				if (StringUtils.hasText(name)) {
					orPredicates.add(criteriaBuilder.equal(root.get("realName"),name));
					orPredicates.add(criteriaBuilder.equal(root.get("packName"),name));
					orPredicates.add(criteriaBuilder.equal(root.get("productName"),name));
				}
				
				if (null != totalPriceX && StringUtils.hasText(totalPriceX.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("totalPrice"), totalPriceX));
				}
				
				if (null != totalPriceD && StringUtils.hasText(totalPriceD.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("totalPrice"), totalPriceD));
				}
				
				if (StringUtils.hasText(marketName)) {
					andPredicates.add(criteriaBuilder.equal(root.get("marketName"),marketName));
				}
				
				if (null != transactionDateStart && StringUtils.hasText(transactionDateStart.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("transactionDate"), transactionDateStart));
				}
				
				if (null != transactionDateEnd && StringUtils.hasText(transactionDateEnd.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("transactionDate"), transactionDateEnd));
				}
				
				if (!orPredicates.isEmpty()) {
					Predicate orPredicate = criteriaBuilder.or(orPredicates.toArray(new Predicate[orPredicates.size()]));
					andPredicates.add(orPredicate);
				}
				return criteriaBuilder.and(andPredicates.toArray(new Predicate[andPredicates.size()]));
			}
		};
	}

	@Override
	public void save(Receipt receipt) {
		Date date = new Date();
        receipt.setCreatDate(date);
        receipt.setLastModifyDate(date);
        
        receiptRepository.save(receipt);
		
	}

	@Override
	public void deleteById(Long id) {
		receiptRepository.deleteById(id);
		
	}

}
