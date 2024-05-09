package com.xiaoqingxin.homeam.repository;

import com.xiaoqingxin.homeam.model.CompanyInformation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Wu Liangxing
 */
@Repository
public interface CompanyInfoRepository extends JpaRepository<CompanyInformation, Integer>{

    Page<CompanyInformation> findAllByNameLike(String name, Pageable pageable);

    Page<CompanyInformation> findAll(Pageable pageable);
}
