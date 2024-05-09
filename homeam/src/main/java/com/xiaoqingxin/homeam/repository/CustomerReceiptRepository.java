package com.xiaoqingxin.homeam.repository;

import com.xiaoqingxin.homeam.model.CustomerReceipt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * 
 * @Description: 购物小票数据存储
 * @author: Wu Liangxing
 * @date: 2024年4月12日
 */
@Repository
public interface CustomerReceiptRepository extends JpaRepository<CustomerReceipt, Long>,JpaSpecificationExecutor<CustomerReceipt>{
    
}
