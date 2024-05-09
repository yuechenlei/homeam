/**
 * 
 */
 
       // 表单验证
	   $(function(){
		   var form = $("#companyInfoAddForm");
		   form.submit(function( event ) {
			   
			   if($("#market_name").val().trim()==""){
				   $("#market_name").nextAll(".invalid-feedback").text("必须输入商店名称！");
				   event.preventDefault();
				   form.addClass("was-validated");
			   }else{
				   return ture;  // 执行提交
			   }
		   });
		   
	   });
	   
	   
	   function companyInfoReset(){
		
		$("#companyInfoAddForm").removeClass("was-validated");
		
		return true;
	}
	
	