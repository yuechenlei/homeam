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
 * @Description: Kundenbeleg
 * @author: Wu Liangxing
 * @date: 2024年4月12日
 */
@Entity(name = "CustomerReceipt")
@Table(name = "customer_receipt")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerReceipt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Integer id;

    /**
     * 终端ID 可唯一标识一笔交易 TerminalId
     */
    @Column(name = "terminal_id",nullable = false)
    private Integer terminalId;

    /**
     * 交易码 Transaktionsnummer TA-Nr Trace-Nr.
     */
    @Column(name = "transaction_number",nullable = false,length=20)
    private String transactionNumber;

    /**
     * 单据编码 Bon-Nr. Belegnummer BNr
     */
    @Column(name = "receipt_number")
    private Integer receiptNumber;
    
    /**
     * Steuer-Nr Steuer-ID USt-ID 增值税或销售税识别号
     */
    @Column(name = "tax_number",length=20)
    private String taxNumber;

    /**
     * 支付方式 Bezahlverfahren
     */
    //@Embedded
    @Column(name = "payment_method",length=20,nullable = false)
    private String paymentMethod;

    /**
     * 交易金额 Betrag
     */
    @Column(name = "amount",precision=8,scale=2,nullable = false)
    private BigDecimal amount;

    /**
     * 金额单位
     */
    @Column(name = "unit",nullable = false,length=10)
    private String unit;

    /**
     * 公司/超市信息Id
     */
    @Column(name = "company_id")
    private Integer companyId;

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
