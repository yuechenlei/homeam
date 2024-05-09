package com.xiaoqingxin.homeam.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @Description: 小票 Kassenbon Kassenzettel
 * @author: Wu Liangxing
 * @date: 2024年4月12日
 */
@Entity(name = "Receipt")
@Table(name = "receipt")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Receipt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Long id;

    /**
     * 日常称呼的名字
     */
    @Column(name = "real_name",length=100)
    private String realName;

    /**
     * 产品包装上的名字
     */
    @Column(name = "pack_name",length=100)
    private String packName;

    /**
     * 小票上打印的名字
     */
    @Column(name = "product_name",nullable = false,length=100)
    private String productName;

    /**
     * 单价
     */
    @Column(name = "unit_price",precision=8,scale=2)
    private BigDecimal unitPrice;

    /**
     * 单价的单位
     */
    @Column(name = "unit_of_prices",length=20)
    private String unitOfPrice;
    
    /**
     * 总价
     */
    @Column(name = "total_price",precision=8,scale=2,nullable = false)
    private BigDecimal totalPrice;
    
    /**
     * 总价的单位
     */
    @Column(name = "unit",nullable = false,length=10)
    private String unit;
    
    /**
     * 重量
     */
    @Column(name = "weight",precision=6,scale=3)
    private BigDecimal weight;
    
    /**
     * 重量的单位
     */
    @Column(name = "unit_of_weight",length=10)
    private String unitOfWeight;
    
    /**
     * 购买的数量
     */
    @Column(name = "quantity")
    private Short quantity;

    /**
     * 增值税 Mehrwertsteuer value-added tax
     */
    @Column(name = "vat",nullable = false,precision=3,scale=2)
    private BigDecimal vat;
    
    /**
     * 类别
     */
    @Column(name = "category",nullable = false,length=50)
    private String category;
    
    /**
     * 子类别
     */
    @Column(name = "sub_category",nullable = false,length=50)
    // @Enumerated(EnumType.STRING)
    private String subCategory;

    /**
     * 优惠劵 Coupon-Ersparnisse
     */
    @Column(name = "coupon",precision=3,scale=2)
    private BigDecimal coupon;

    /**
     * 打折促销活动 Aktion Rabatt
     */
    @Column(name = "discount",precision=3,scale=2)
    private BigDecimal discount;

    /**
     * 会员积分反馈卡
     */
    @Column(name = "pay_back",precision=3,scale=2)
    private BigDecimal payBack;

    /**
     * 超市名字
     */
    @Column(name = "market_name",nullable = false,length=50)
    private String marketName;

    /**
     * 客户单据Id KundenbelegId
     */
    @Column(name = "customer_receipt_id",nullable = false)
    private Long customerReceiptId;

    /**
     * 账单交易日期
     */
    @Column(name = "transaction_date",nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date transactionDate;

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
