package com.xiaoqingxin.homeam.beans;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

/**
 * 
 * @Description: 客户小票查询bean
 * @author: Wu Liangxing
 * @date: 2024年4月13日
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerReceiptQueryBean implements Serializable{
    private static final long serialVersionUID = 1L;
    
	@Nullable
	private Integer terminalId;
	
	@Nullable
	private String paymentMethod;
	
	@Nullable
	private BigDecimal amountV;
	
	@Nullable
	private BigDecimal amountB;
	
	@Nullable
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date transactionDateStart;
	
	@Nullable
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date transactionDateEnd;
	
	/** 页码 */
	@Nullable
	private Integer page = 1;
	
	/** 每页数量 */
	@Nullable
	private Integer size = 10;
	
	@Nullable
	private String[] sort;
}
