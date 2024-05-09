package com.xiaoqingxin.homeam.enums;

/**
 * Bezahlverfahren
 * @author Wu Liangxing
 */
public enum PaymentMethodEnum {
    // Rechnung  Online-Bezahlsysteme Lastschrifteinzug
	
	Cash,         // Bargeld
	GiroCard,     // Girocard
	CreditCard,   // Kreditkarte
	NFC,          // Kontaktlos
	Advance,      // Vorkasse
	Financing,    // Finanzierung
	PayPal,
	Giropay,
	Online;
}
