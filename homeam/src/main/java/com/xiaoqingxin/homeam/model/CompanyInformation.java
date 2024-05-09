package com.xiaoqingxin.homeam.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * 
 * @Description: Gesellschaft Information
 * @author: Wu Liangxing
 * @date: 2024年4月15日
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CompanyInformation")
@Table(name = "company_information")
public class CompanyInformation implements Serializable {

    private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    /**
     * 企业名字 Vollständiger Name
     */
    @Column(name = "name")
    private String name;

    /**
     * Telefon
     */
    @Column(name = "telephone_number")
    private String telephoneNumber;

    @Column(name = "web_site")
    private String webSite;

    /**
     * Öffnungszeiten
     */
    @Column(name = "open_time")
    private String openTime;

    /**
     * 通信地址Id Anschrift
     */
    @Column(name = "mailing_address_id")
    private Integer mailingAddressId;

    /**
     * 此条数据创建日期
     */
    @Column(name = "creat_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date creatDate;

    /**
     * 此条数据最后修改日期
     */
    @Column(name = "last_modify_date")
    private Date lastModifyDate;

}
