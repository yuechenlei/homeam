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
 * Anschrift
 *
 * @author Wu Liangxing
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "MailingAddress")
@Table(name = "mailing_address")
public class MailingAddress implements Serializable {

    private static final long serialVersionUID = 1L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Integer id;

    /**
     * 名字
     */
    @Column(name = "vor_name",length=50)
    private String vorName;

    /**
     * 姓氏
     */
    @Column(name = "nach_name",length=50)
    private String nachName;

    /**
     * 街道 Straße
     */
    @Column(name = "street_name",length=100,nullable = false)
    private String streetName;

    /**
     * 街道号码
     */
    @Column(name = "street_number",length=10,nullable = false)
    private String streetNumber;

    /**
     * 邮政编码 Postleitzahl PLZ
     */
    @Column(name = "postal_code",nullable = false)
    private Integer postalCode;

    /**
     * Stadt
     */
    @Column(name = "city",length=30,nullable = false)
    private String city;

    /**
     * 此条数据创建日期
     */
    @Column(name = "creat_date",nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date creatDate;

    /**
     * 此条数据最后修改日期
     */
    @Column(name = "last_modify_date",nullable = false)
    private Date lastModifyDate;

}
