package com.xiaoqingxin.homeam.model;

import com.xiaoqingxin.homeam.enums.PayBy;
import com.xiaoqingxin.homeam.enums.PaymentMethodEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Wu Liangxing
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
class PaymentMethod implements Serializable{
    private static final long serialVersionUID = 1L;

	@Column(name="pay_by")
	@Enumerated(EnumType.STRING)
	private PayBy payBy;
	
	@Column(name="payment_Method_E")
	@Enumerated(EnumType.STRING)
	private PaymentMethodEnum paymentMethodE;
}
