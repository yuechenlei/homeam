package com.xiaoqingxin.homeam.repository;

import com.xiaoqingxin.homeam.model.HamUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Wu Liangxing
 */
@Repository
public interface HamUserRepository extends JpaRepository<HamUser, Long>{
    public HamUser findByUsername(String username);
}
