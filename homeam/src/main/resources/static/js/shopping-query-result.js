/**
 * 小票查询结果js(全部)
 */
        // 删除预处理
	    function receiptDeleteOne(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#receiptModalBody").text(id);
	    	$("#modelConfirm").attr("onclick","doReceiptDeleteOne("+id+")");
	    	$("#showModelButton").click();
	    }
	    
	    // 执行删除
	    function doReceiptDeleteOne(id){
	    	$("#modelConfirm").attr("onclick","");
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/shopping/receiptDeleteOne/"+id,
	    		  data: "",
	    		  dataType: "json",
	    		  success: function(result){
					   if(result.success){
						  afterDoReceiptDeleteOne(id);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("删除失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    	
	    }
	    
	    // 删除后处理
	    function afterDoReceiptDeleteOne(id){
	    	$("#tr"+id).addClass("text-danger");
	    	$("#tr"+id).hide(1200);
	    }
	    
	    // 修改预处理
	    function receiptModify(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#receiptModifyCancel"+id).show();
	    	$("#receiptModifyConfirm"+id).show();
	    	$("#receiptModify"+id).hide();
	    	$("#receiptDeleteOne"+id).hide();
	    	
	    	$("#tbody_receipt").children().css("display","none");
	    	$("#tr"+id).css("display","table-row");
	    	//$("#shopping_result_table").attr("style","width:150%;");
	    	
	    	$("#thead_unitOfPrice").show();
	    	$("#thead_unit").show();
	    	$("#thead_unitOfWeight").show();
	    	$("#unitOfPrice"+id).show();
	    	$("#unit"+id).show();
	    	$("#unitOfWeight"+id).show();
	    	
	    	// 取旧值
	    	var realNameOld = $("#realName"+id).text();
	    	var packNameOld = $("#packName"+id).text();
	    	var productNameOld = $("#productName"+id).text();
	    	
	    	var unitPriceOld = $("#unitPrice"+id).attr("data-text");
	    	var unitOfPriceOld;
	    	if(unitPriceOld==null||unitPriceOld==""||unitPriceOld===undefined){
				unitPriceOld = "";
				unitOfPriceOld = "";
			}else{
				unitOfPriceOld = $("#unitOfPrice"+id).text();
			}
	    	var totalPriceOld = $("#totalPrice"+id).attr("data-text");
	    	var unitOld = $("#unit"+id).text();
	    	
	    	var weightOld = $("#weight"+id).attr("data-text");
	    	var unitOfWeightOld
	    	if(weightOld==null||weightOld==""||weightOld===undefined){
				weightOld = "";
				unitOfWeightOld = "";
			}else{
				unitOfWeightOld = $("#unitOfWeight"+id).text();
			}
	    	var quantityOld = $("#quantity"+id).text();
	    	var vatOld = $("#vat"+id).text();
	    	
	    	var couponOld = $("#coupon"+id).text();
	    	var discountOld = $("#discount"+id).text();
	    	var payBackOld = $("#payBack"+id).text();
	    	var categoryOld = $("#category"+id).text();
	    	var subCategoryOld = $("#subCategory"+id).text();
	    	var marketNameOld = $("#marketName"+id).text();
	    	var customerReceiptIdOld = $("#customerReceiptId"+id).attr("data-id");
	    	    customerReceiptIdOld = (customerReceiptIdOld == '0')?'':customerReceiptIdOld;
	    	// var transactionDateOld = $("#transactionDate"+id).text();
	    	var transactionDateOld = $("#transactionDate"+id).text();
	    	var creatDateOld = $("#creatDate"+id).text();
	    	var lastModifyDateOld = $("#lastModifyDate"+id).text();
	    	
	    	
	    	// 时区问题处理
	    	var tzoffsetOfTr = new Date(transactionDateOld).getTimezoneOffset()*60000;
	    	var tzoffsetOfCr = new Date(creatDateOld).getTimezoneOffset()*60000;
	    	const transactionDateOldFormat = new Date(new Date(transactionDateOld)-tzoffsetOfTr).toISOString().substring(0, 19);
	    	const creatDateOldFormat = new Date(new Date(creatDateOld)-tzoffsetOfCr).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#realName"+id).html('<input type="text" id="realNameInput'+id+'" value="'+realNameOld+'" style="width:100%" />');
	    	$("#packName"+id).html('<input type="text" id="packNameInput'+id+'" value="'+packNameOld+'" style="width:100%" />');
	    	$("#productName"+id).html('<input type="text" id="productNameInput'+id+'" value="'+productNameOld+'" style="width:100%" />');
	    	
	    	$("#unitPrice"+id).html('<input type="number" id="unitPriceInput'+id+'" value="'+unitPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#unitOfPrice"+id).html('<input type="text" id="unitOfPriceInput'+id+'" value="'+unitOfPriceOld+'" style="width:100%" />');
	    	$("#totalPrice"+id).html('<input type="number" id="totalPriceInput'+id+'" value="'+totalPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#unit"+id).html('<input type="text" id="unitInput'+id+'" value="'+unitOld+'" style="width:100%" />');
	    	$("#weight"+id).html('<input type="number" id="weightInput'+id+'" value="'+weightOld+'" step="0.001"  min="0.001" max="999" style="width:100%"/>');
	    	$("#unitOfWeight"+id).html('<input type="text" id="unitOfWeightInput'+id+'" value="'+unitOfWeightOld+'" style="width:100%" />');
	    	$("#quantity"+id).html('<input type="number" id="quantityInput'+id+'" value="'+quantityOld+'" step="1"  min="1" max="999" style="width:100%"/>');
	    	$("#vat"+id).html('<input type="number" id="vatInput'+id+'" value="'+vatOld+'" step="0.01"  min="0.00" max="999" style="width:100%"/>');
	    	
	    	$("#coupon"+id).html('<input type="number" id="couponInput'+id+'" value="'+couponOld+'" step="0.01"  min="0.00" max="1" style="width:100%"/>');
	    	$("#discount"+id).html('<input type="number" id="discountInput'+id+'" value="'+discountOld+'" step="0.01"  min="0.00" max="1" style="width:100%"/>');
	    	$("#payBack"+id).html('<input type="number" id="payBackInput'+id+'" value="'+payBackOld+'" step="0.01"  min="0.00" max="1" style="width:100%"/>');
	    	$("#customerReceiptId"+id).html('<input type="text" id="customerReceiptIdInput'+id+'" value="'+customerReceiptIdOld+'" style="width:100%" />');
	    	$("#marketName"+id).html('<input type="text" id="marketNameInput'+id+'" value="'+marketNameOld+'" style="width:100%" />');
	    	
	    	$("#transactionDate"+id).html('<input type="datetime-local" id="transactionDateInput'+id+'" value="'+transactionDateOldFormat+'" step="1" />');
	    	$("#creatDate"+id).html('<input type="datetime-local" id="creatDateInput'+id+'" value="'+creatDateOldFormat+'" step="1" />');
	    	$("#lastModifyDate"+id).text('');
	    	
	    	$("#category"+id).html($("#categoryModel").clone());
	    	$("#category"+id).children("select").attr("id","categoryInput"+id);
	    	$("#categoryInput"+id).val(""+categoryOld);
	    	subCategoryInput(""+id,categoryOld,subCategoryOld);
	    	
	    	// 为category添加change事件
	    	$("#category"+id).change(function(){
	    		var selectedVal = $("#category"+id+" :selected").val();
	    		categoryChange(id,selectedVal);      
	        });
	    	
	    	// 为 取消修改 做准备
	    	$("#receiptModifyCancel"+id).attr("onclick","receiptModifyCancel('"+id+"',event,'"+realNameOld+"','"+packNameOld+"','"
	    	        +productNameOld+"','"+unitPriceOld+"','"+unitOfPriceOld+"','"+totalPriceOld+"','"+unitOld+"','"+weightOld+"','"+unitOfWeightOld+
	    	        "','"+quantityOld+"','"+vatOld+"','"+categoryOld+"','"+subCategoryOld+"','"+couponOld+"','"+discountOld+"','"+payBackOld+"','"+
	    	        marketNameOld+"','"+customerReceiptIdOld+"','"+transactionDateOld+"','"+creatDateOld+"','"+lastModifyDateOld+"')");
	    	
	    }
	    
	    // 取消修改
	    function receiptModifyCancel(id,event,realNameOld,packNameOld,productNameOld,unitPriceOld,unitOfPriceOld,totalPriceOld,unitOld,weightOld,
	    		                     unitOfWeightOld,quantityOld,vatOld,categoryOld,subCategoryOld,couponOld,discountOld,payBackOld,
	    		                     marketNameOld,customerReceiptIdOld,transactionDateOld,creatDateOld,lastModifyDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#receiptModifyCancel"+id).hide();
	    	$("#receiptModifyConfirm"+id).hide();
	    	$("#receiptModify"+id).show();
	    	$("#receiptDeleteOne"+id).show();
	    	
	    	$("#tbody_receipt").children().removeAttr("style");
	    	//$("#shopping_result_table").attr("style","width:210%;");
	    	
	    	$("#thead_unitOfPrice").hide();
	    	$("#thead_unit").hide();
	    	$("#thead_unitOfWeight").hide();
	    	$("#unitOfPrice"+id).hide();
	    	$("#unit"+id).hide();
	    	$("#unitOfWeight"+id).hide();
	    	
	    	$("#realName"+id).text(realNameOld);
	    	$("#packName"+id).text(packNameOld);
	    	$("#productName"+id).text(productNameOld);
	    	$("#unitPrice"+id).text(unitPriceOld+unitOfPriceOld);
	    	$("#unitOfPrice"+id).text(unitOfPriceOld);
	    	$("#totalPrice"+id).text(totalPriceOld+unitOld);
	    	$("#unit"+id).text(unitOld);
	    	$("#weight"+id).text(weightOld+unitOfWeightOld);
	    	$("#unitOfWeight"+id).text(unitOfWeightOld);
	    	
	    	$("#quantity"+id).text(quantityOld);
	    	$("#vat"+id).text(vatOld);
	    	$("#category"+id).text(categoryOld);
	    	$("#subCategory"+id).text(subCategoryOld);
	    	$("#coupon"+id).text(couponOld);
	    	$("#discount"+id).text(discountOld);
	    	$("#payBack"+id).text(payBackOld);
	    	$("#marketName"+id).text(marketNameOld);
	    	
	    	if(customerReceiptIdOld==""){
		        $("#customerReceiptId"+id).text("");
	        }else{
		        $("#customerReceiptId"+id).html("<a href='/customerReceipt/query/"+customerReceiptIdOld+"' target='_blank'>点击查看</a>");
	        }
	    	
	    	
	    	//if(companyInformationIdOld==""){
		    //    $("#companyInformationId"+id).text("");
	        //}else{
		    //    $("#companyInformationId"+id).html("<a href='/companyInfo/query/"+companyInformationIdOld+"' target='_blank'>点击查看</a>");
	       // }
	    	
	    	$("#transactionDate"+id).text(transactionDateOld);
	    	$("#creatDate"+id).text(creatDateOld);
	    	$("#lastModifyDate"+id).text(lastModifyDateOld);
	    	
	    }
	    
	    // 确定修改
	    function receiptModifyConfirm(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return false;
	    	
	    	// 取值
	    	var realName = $("#realNameInput"+id).val();
	    	var packName = $("#packNameInput"+id).val();
	    	var productName = $("#productNameInput"+id).val();
	    	
	    	var unitPrice = $("#unitPriceInput"+id).val();
	    	var unitOfPrice = $("#unitOfPriceInput"+id).val();
	    	var totalPrice = $("#totalPriceInput"+id).val();
	    	var unit = $("#unitInput"+id).val();
	    	var weight = $("#weightInput"+id).val();
	    	var unitOfWeight = $("#unitOfWeightInput"+id).val();
	    	var quantity = $("#quantityInput"+id).val();
	    	var vat = $("#vatInput"+id).val();
	    	
	    	var coupon = $("#couponInput"+id).val();
	    	var discount = $("#discountInput"+id).val();
	    	var payBack = $("#payBackInput"+id).val();
	    	var category = $("#categoryInput"+id).val();
	    	var subCategory = $("#subCategoryInput"+id).val();
	    	var marketName = $("#marketNameInput"+id).val();
	    	var customerReceiptId = $("#customerReceiptIdInput"+id).val();
	    	//var companyInformationId = $("#companyInformationIdInput"+id).val();
	    	var transactionDate = $("#transactionDateInput"+id).val();
	    	var creatDate = $("#creatDateInput"+id).val();
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var receiptJson = {"id":id,"realName":realName,"packName":packName,"productName":productName,"unitPrice":unitPrice,"unitOfPrice":unitOfPrice,
   			                   "totalPrice":totalPrice,"unit":unit,"weight":weight,"unitOfWeight":unitOfWeight,"quantity":quantity,"vat":vat,"coupon":coupon,
			                   "discount":discount,"payBack":payBack,"category":category,"subCategory":subCategory,"marketName":marketName,
			                   "customerReceiptId":customerReceiptId,"transactionDate":transactionDate,"creatDate":creatDate};
	    	var formData = new FormData();
	    	for ( var key in receiptJson ) {
	    		formData.append(key, receiptJson[key]);
	    	}
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/shopping/receiptModify",
	    		  data: formData,      // 要发送的数据
	    		  contentType:false,   // 默认为 application/x-www-form-urlencoded; charset=UTF-8
	    		  processData:false,   // 默认为true，会把数据解析为query字符串，对应于contentType的默认值
	    		  dataType: "json",    // 要接收的数据类型
	    		  success: function(result){
					   if(result.success){
						  afterReceiptModifyConfirm(result);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("修改失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    }
	    
	    // 修改后处理
	    function afterReceiptModifyConfirm(result){
	    	var id = result.id;
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	// 修改页面显示
	    	$("#realName"+id).text(result.realName);
	    	$("#packName"+id).text(result.packName);
	    	$("#productName"+id).text(result.productName);
	    	
	    	if(result.unitPrice==null || result.unitPrice==""){
				$("#unitPrice"+id).text("");
	    	    $("#unitPrice"+id).attr("data-text","");
	    	    $("#unitOfPrice"+id).text("");
			}else{
				$("#unitPrice"+id).text(result.unitPrice+result.unitOfPrice);
	    	    $("#unitPrice"+id).attr("data-text",result.unitPrice);
	    	    $("#unitOfPrice"+id).text(result.unitOfPrice);
			}
	    	$("#totalPrice"+id).text(result.totalPrice+result.unit);
	    	$("#totalPrice"+id).attr("data-text",result.totalPrice);
	    	$("#unit"+id).text(result.unit);
	    	if(result.weight==null || result.weight==""){
				$("#weight"+id).text("");
	    	    $("#weight"+id).attr("data-text","");
	    	    $("#unitOfWeight"+id).text("");
			}else{
				$("#weight"+id).text(result.weight+result.unitOfWeight);
	    	    $("#weight"+id).attr("data-text",result.weight);
	    	    $("#unitOfWeight"+id).text(result.unitOfWeight);
			}
	    	$("#quantity"+id).text(result.quantity);
	    	$("#vat"+id).text(result.vat);
	    	
	    	$("#coupon"+id).text(result.coupon);
	    	$("#discount"+id).text(result.discount);
	    	$("#payBack"+id).text(result.payBack);
	    	$("#category"+id).text(result.category);
	    	$("#subCategory"+id).text(result.subCategory);
	    	$("#marketName"+id).text(result.marketName);
	    	
	    	var customerReceiptId = result.customerReceiptId;
	    	if(customerReceiptId==null || customerReceiptId==""){
		        $("#customerReceiptId"+id).text("");
		        $("#customerReceiptId"+id).attr("data-id","0");
	        }else{
		        $("#customerReceiptId"+id).html("<a href='/customerReceipt/query/"+customerReceiptId+"' target='_blank'>点击查看</a>");
	            $("#customerReceiptId"+id).attr("data-id",customerReceiptId);
	        }
	    	
	    	//var companyInformationId = result.companyInformationId;
	    	//if(companyInformationId==null || companyInformationId ==""){
		    //    $("#companyInformationId"+id).text("");
		    //    $("#companyInformationId"+id).attr("data-id","0");
	       // }else{
		   //     $("#companyInformationId"+id).html("<a href='/companyInfo/query/"+companyInformationId+"' target='_blank'>点击查看</a>");
	       //     $("#companyInformationId"+id).attr("data-id",companyInformationId);
	       // }
	        
	    	$("#transactionDate"+id).text(result.transactionDate);
	    	$("#creatDate"+id).text(result.creatDate);
	    	$("#lastModifyDate"+id).text(result.lastModifyDate);
	    	
	    	$("#tr"+id).addClass("table-secondary");
	    	
	    	$("#receiptModifyCancel"+id).hide();
	    	$("#receiptModifyConfirm"+id).hide();
	    	$("#receiptModify"+id).show();
	    	$("#receiptDeleteOne"+id).show();
	    	
	    	$("#tbody_receipt").children().removeAttr("style");
	    	//$("#shopping_result_table").attr("style","width:210%;");
	    	
	    	$("#thead_unitOfPrice").hide();
	    	$("#thead_unit").hide();
	    	$("#thead_unitOfWeight").hide();
	    	$("#unitOfPrice"+id).hide();
	    	$("#unit"+id).hide();
	    	$("#unitOfWeight"+id).hide();
	    	
	    }
	     
	     // 修改时，子类别显示
	     function subCategoryInput(id,categoryOld,subCategoryOld){
	    	if(id==null||id==""||id==undefined) return;
	  		switch(categoryOld){
	  		    case "Food": $("#subCategory"+id).html($("#FoodSubCategory").clone());
	  		                 $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	  		                 $("#subCategoryInput"+id).val(""+subCategoryOld);
	  		                 $("#subCategoryInput"+id).removeClass();
	  		                 break;
	  		    case "Clothing": $("#subCategory"+id).html($("#ClothingSubCategory").clone());
	                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
		                         $("#subCategoryInput"+id).val(""+subCategoryOld);
		                         $("#subCategoryInput"+id).removeClass();
	                             break;
	  		    case "Cooking": $("#subCategory"+id).html($("#CookingSubCategory").clone());
	                            $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
		                        $("#subCategoryInput"+id).val(""+subCategoryOld);
		                        $("#subCategoryInput"+id).removeClass();
	                            break;
	  		    case "Household": $("#subCategory"+id).html($("#HouseholdSubCategory").clone());
	                              $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
		                          $("#subCategoryInput"+id).val(""+subCategoryOld);
		                          $("#subCategoryInput"+id).removeClass();
	                              break;
	  		    case "Transportation": $("#subCategory"+id).html($("#TransportationSubCategory").clone());
                                       $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                       $("#subCategoryInput"+id).val(""+subCategoryOld);
                                       $("#subCategoryInput"+id).removeClass();
                                       break;
	  		    case "Electronics": $("#subCategory"+id).html($("#ElectronicsSubCategory").clone());
                                    $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                    $("#subCategoryInput"+id).val(""+subCategoryOld);
                                    $("#subCategoryInput"+id).removeClass();
                                    break;
	  		    case "Pack": $("#subCategory"+id).html($("#PackSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		    case "Tool": $("#subCategory"+id).html($("#ToolSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		    case "Book": $("#subCategory"+id).html($("#BookSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		    case "Garden": $("#subCategory"+id).html($("#GardenSubCategory").clone());
                               $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                               $("#subCategoryInput"+id).val(""+subCategoryOld);
                               $("#subCategoryInput"+id).removeClass();
                               break;
	  		    case "BabyAndChild": $("#subCategory"+id).html($("#BabyAndChildSubCategory").clone());
                                     $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                     $("#subCategoryInput"+id).val(""+subCategoryOld);
                                     $("#subCategoryInput"+id).removeClass();
                                     break;
	  		    case "Care": $("#subCategory"+id).html($("#CareSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		  
	  		  }
	    }
	    
	    // 当类别改变时，子类别随之改变
	    function categoryChange(id,selectedVal){
	    	switch(selectedVal){
  		    case "Food": $("#subCategory"+id).html($("#FoodSubCategory").clone());
  		                 $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
  		                 $("#subCategoryInput"+id).removeClass();
  		                 break;
  		    case "Clothing": $("#subCategory"+id).html($("#ClothingSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	                         $("#subCategoryInput"+id).removeClass();
                             break;
  		    case "Cooking": $("#subCategory"+id).html($("#CookingSubCategory").clone());
                            $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	                        $("#subCategoryInput"+id).removeClass();
                            break;
  		    case "Household": $("#subCategory"+id).html($("#HouseholdSubCategory").clone());
                              $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	                          $("#subCategoryInput"+id).removeClass();
                              break;
  		    case "Transportation": $("#subCategory"+id).html($("#TransportationSubCategory").clone());
                                   $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                   $("#subCategoryInput"+id).removeClass();
                                   break;
  		    case "Electronics": $("#subCategory"+id).html($("#ElectronicsSubCategory").clone());
                                $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                $("#subCategoryInput"+id).removeClass();
                                break;
  		    case "Pack": $("#subCategory"+id).html($("#PackSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		    case "Tool": $("#subCategory"+id).html($("#ToolSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		    case "Book": $("#subCategory"+id).html($("#BookSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		    case "Garden": $("#subCategory"+id).html($("#GardenSubCategory").clone());
                           $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                           $("#subCategoryInput"+id).removeClass();
                           break;
  		    case "BabyAndChild": $("#subCategory"+id).html($("#BabyAndChildSubCategory").clone());
                                 $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                 $("#subCategoryInput"+id).removeClass();
                                 break;
  		    case "Care": $("#subCategory"+id).html($("#CareSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		  
  		  }
	    }
	    
	    
	    // 换页
	    function changePage(pageNumber,event){
		    event.preventDefault();
	    	if(pageNumber<1) return false;
	    	// console.log("changePage,pageNumber="+pageNumber);
	    	
	    	var tds = $("#transactionDateStart").val();
	    	var tde = "" + $("#transactionDateEnd").val();
	    	var tzoffset = (new Date()).getTimezoneOffset() * 60000;
	    	
	    	if(tds!=null && tds!=""){
		       const transactionDateStart = new Date(new Date(tds)-tzoffset).toISOString().substring(0, 19);
	           $("#transactionDateStart").val(transactionDateStart);
	        }else{$("#transactionDateStart").val("");}
	        
	    	if(tde!=null && tde!=""){
		       const transactionDateEnd = new Date(new Date(tde)-tzoffset).toISOString().substring(0, 19);
		       $("#transactionDateEnd").val(transactionDateEnd);
	        }else{$("#transactionDateEnd").val("");}
	    	
	    	$("#page").val(pageNumber);
	    	
	    	$("#receiptQueryForm").submit();
	
	    	
	    }
	    
	    
	    function showMain(){
		$("#showMain").val("true");
		
		var page = $("#page_ul").find(".active").children().text();
		if(page==null || page==undefined || page==""){
			$("#page").val(1);
		}else{
			$("#page").val(page);
		}
		
		$("#receiptQueryForm").submit();
		
		return true;
		
	   }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    