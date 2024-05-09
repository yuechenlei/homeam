package com.xiaoqingxin.homeam.repository;

import com.xiaoqingxin.homeam.model.MailingAddress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Wu Liangxing
 */
@Repository
public interface MailingAddressRepository extends JpaRepository<MailingAddress, Integer>,JpaSpecificationExecutor<MailingAddress>{
    
}
