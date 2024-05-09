/**
 * 客户小票条目添加js
 */
 
       // 表单验证
	   $(function(){
		   $("#customerReceiptAddForm").submit(function( event ) {
			   var i = 0;
			   if($("#terminalId").val().trim()==""){
				   $("#terminalId").nextAll(".invalid-feedback").text("请输入TerminalId！");
				   i++;
			   }
			   if($("#transactionNumber").val().trim()==""){
				   $("#transactionNumber").nextAll(".invalid-feedback").text("请输入交易码！");
				   i++;
			   }
			   if($("#receiptNumber").val().trim()==""){
				   $("#receiptNumber").nextAll(".invalid-feedback").text("请输入客户票据ID！");
				   i++;
			   }
			   if($("#paymentMethod").val().trim()==""){
				   $("#paymentMethod").nextAll(".invalid-feedback").text("请选择付款方式！");
				   i++;
			   }
			   
			   if($("#amount").val().trim()==""){
				   $("#amount").nextAll(".invalid-feedback").text("交易金额是必须的！");
				   i++;
			   }
			   if($("#unit").val().trim()==""){
				   $("#unit").nextAll(".invalid-feedback").text("请输入单位");
				   i++;
			   }
			   
			   if($("#transactionDate").val()==""){
				   $("#transactionDate").nextAll(".invalid-feedback").text("交易日期是必须的！");
				   i++;
			   }
			   
			   if(i>0){
				   event.preventDefault();
				   $("#customerReceiptAddForm").addClass("was-validated");
			   }else{
				   return ture;  // 执行提交
			   }
		   });
		   
	   });
	   
	// 清理
    function customerReceiptReset(){
	    $("#customerReceiptAddForm").removeClass("was-validated");
		return true;
	}
	
	$(function(){
		$("#home_a_text").removeClass("active");
		$("#navbarDropdown").addClass("active");
	});