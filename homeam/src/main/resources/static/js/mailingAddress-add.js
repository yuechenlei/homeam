/**
 * 
 */
 
       // 表单验证
	   $(function(){
		   var form = $("#mailingAddressAddForm");
		       form.submit(function( event ) {
			   var i = 0;
			   if($("#streetName").val().trim()==""){
				   $("#streetName").nextAll(".invalid-feedback").text("请输入街道名称！");
				   i++;
			   }
			   if($("#streetNumber").val().trim()==""){
				   $("#streetNumber").nextAll(".invalid-feedback").text("请输入街道号码！");
				   i++;
			   }
			   if($("#postalCode").val().trim()==""){
				   $("#postalCode").nextAll(".invalid-feedback").text("请输入邮政编码！");
				   i++;
			   }
			   if($("#city").val().trim()==""){
				   $("#city").nextAll(".invalid-feedback").text("请输入城市名称！");
				   i++;
			   }
			   
			   if(i>0){
				   event.preventDefault();
				   form.addClass("was-validated");
			   }else{
				   return ture;  // 执行提交
			   }
		   });
		   
	   });
	   
	   
	   function mailingAddressReset(){
		$("#mailingAddressAddForm").removeClass("was-validated");
		return true;
	}
	
	