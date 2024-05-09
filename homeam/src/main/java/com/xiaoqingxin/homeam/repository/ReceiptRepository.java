package com.xiaoqingxin.homeam.repository;

import com.xiaoqingxin.homeam.model.Receipt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Wu Liangxing
 */
@Repository
public interface ReceiptRepository extends  JpaRepository<Receipt, Long>,JpaSpecificationExecutor<Receipt>{
	
    
}
