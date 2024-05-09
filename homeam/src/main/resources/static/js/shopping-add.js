/**
 * 购物小票新增js
 */
 
       /** 表单验证 */
	   $(function(){
		   var form = $("#receiptAddForm");
		   form.submit(function( event ) {
			   
			   var i = 0;
			   if($("#market_name").val().trim()==""){
				   $("#market_name").nextAll(".invalid-feedback").text("必须输入商店名称！");
				   i++;
			   }
			   if($("#productName").val().trim()==""){
				   $("#productName").nextAll(".invalid-feedback").text("请输入小票上的产品名称！");
				   i++;
			   }
			   if($("#totalPrice").val().trim()==""){
				   $("#totalPrice").nextAll(".invalid-feedback").text("总价是必须的！");
				   i++;
			   }
			   if($("#unit").val().trim()==""){
				   $("#unit").nextAll(".invalid-feedback").text("例：€");
				   i++;
			   }
			   if($("#vat").val().trim()==""){
				   $("#vat").nextAll(".invalid-feedback").text("请填写增值税");
				   i++;
			   }
			   if($("#coupon").val().trim()==""){
				   $("#coupon").nextAll(".invalid-feedback").text("没有优惠的情况下，值为1");
				   i++;
			   }
			   if($("#discount").val().trim()==""){
				   $("#discount").nextAll(".invalid-feedback").text("没有优惠的情况下，值为1");
				   i++;
			   }
			   if($("#payBack").val().trim()==""){
				   $("#payBack").nextAll(".invalid-feedback").text("没有优惠的情况下，值为1");
				   i++;
			   }
			   if($("#category :selected").val()==""){
				   $("#category").nextAll(".invalid-feedback").text("请选择类别！");
				   i++;
			   }
			   if($("#transactionDate").val()==""){
				   $("#transactionDate").nextAll(".invalid-feedback").text("交易日期是必须的！");
				   i++;
			   }
			   if($("#customerReceiptId").val().trim()==""){
				   $("#customerReceiptId").nextAll(".invalid-feedback").text("BelegId");
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
	
	
	  /** 类别显示 */
	  $("#category").change(function(){
		  var selectedVal = $("#category :selected").val();
		  switch(selectedVal){
		    case "Food": $("#subCategoryDiv").html(""); 
		                 $("#FoodSubCategory").clone().appendTo($("#subCategoryDiv"));
		                 $("#subCategoryDiv").append('<label for="FoodSubCategory" id="subCategoryLabel">子类别</label>');
		                 $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
		                 break;
		    case "Clothing": $("#subCategoryDiv").html(""); 
		                     $("#ClothingSubCategory").clone().appendTo($("#subCategoryDiv"));
                             $("#subCategoryDiv").append('<label for="ClothingSubCategory" id="subCategoryLabel">子类别</label>');
                             $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                             break;
		    case "Cooking": $("#subCategoryDiv").html(""); 
                            $("#CookingSubCategory").clone().appendTo($("#subCategoryDiv"));
                            $("#subCategoryDiv").append('<label for="CookingSubCategory" id="subCategoryLabel">子类别</label>');
                            $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                            break;
		    case "Household": $("#subCategoryDiv").html(""); 
                              $("#HouseholdSubCategory").clone().appendTo($("#subCategoryDiv"));
                              $("#subCategoryDiv").append('<label for="HouseholdSubCategory" id="subCategoryLabel">子类别</label>');
                              $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                              break;
		    case "Transportation": $("#subCategoryDiv").html(""); 
                                   $("#TransportationSubCategory").clone().appendTo($("#subCategoryDiv"));
                                   $("#subCategoryDiv").append('<label for="TransportationSubCategory" id="subCategoryLabel">子类别</label>');
                                   $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                                   break;
		    case "Electronics": $("#subCategoryDiv").html(""); 
                                $("#ElectronicsSubCategory").clone().appendTo($("#subCategoryDiv"));
                                $("#subCategoryDiv").append('<label for="ElectronicsSubCategory" id="subCategoryLabel">子类别</label>');
                                $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                                break;
		    case "Pack": $("#subCategoryDiv").html(""); 
                         $("#PackSubCategory").clone().appendTo($("#subCategoryDiv"));
                         $("#subCategoryDiv").append('<label for="PackSubCategory" id="subCategoryLabel">子类别</label>');
                         $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                         break;
		    case "Tool": $("#subCategoryDiv").html(""); 
                         $("#ToolSubCategory").clone().appendTo($("#subCategoryDiv"));
                         $("#subCategoryDiv").append('<label for="ToolSubCategory" id="subCategoryLabel">子类别</label>');
                         $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                         break;
		    case "Book": $("#subCategoryDiv").html(""); 
                         $("#BookSubCategory").clone().appendTo($("#subCategoryDiv"));
                         $("#subCategoryDiv").append('<label for="BookSubCategory" id="subCategoryLabel">子类别</label>');
                         $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                         break;
		    case "Garden": $("#subCategoryDiv").html(""); 
                           $("#GardenSubCategory").clone().appendTo($("#subCategoryDiv"));
                           $("#subCategoryDiv").append('<label for="GardenSubCategory" id="subCategoryLabel">子类别</label>');
                           $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                           break;
		    case "BabyAndChild": $("#subCategoryDiv").html(""); 
                                 $("#BabyAndChildSubCategory").clone().appendTo($("#subCategoryDiv"));
                                 $("#subCategoryDiv").append('<label for="BabyAndChildSubCategory" id="subCategoryLabel">子类别</label>');
                                 $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                                 break;
		    case "Care": $("#subCategoryDiv").html(""); 
                         $("#CareSubCategory").clone().appendTo($("#subCategoryDiv"));
                         $("#subCategoryDiv").append('<label for="CareSubCategory" id="subCategoryLabel">子类别</label>');
                         $("#subCategoryDiv").append('<div class="invalid-feedback">Please provide a valid subCategory.</div>');
                         break;
		  
		  }
	  });
	  
	  /** 清理 */
	  function receiptReset(event){
		event.preventDefault();
		
		$("#receiptAddForm").removeClass("was-validated");
		$("#realName").val("");
		$("#packName").val("");
		$("#productName").val(""); 
		$("#unitPrice").val("");
		$("#unitOfPrice").val("");
		$("#totalPrice").val("");
		$("#weight").val("");
		$("#unitOfWeight").val("");
		$("#quantity").val(1);
		
		return true;
	}
	
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  