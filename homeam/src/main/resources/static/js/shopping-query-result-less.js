/**
 * 小票查询结果js(主要)
 */
        // 删除预处理
	    function receiptDeleteOne(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
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
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	$("#receiptModifyCancel"+id).show();
	    	$("#receiptModifyConfirm"+id).show();
	    	$("#receiptModify"+id).hide();
	    	$("#receiptDeleteOne"+id).hide();
	    	
	    	$("#tbody_receipt").children().css("display","none");
	    	$("#tr"+id).css("display","table-row");
	    	//$("#shopping_result_table").attr("style","width:210%;");
	    	
	    	$("#thead_unitOfPrice").show();
	    	$("#thead_unit").show();
	    	$("#thead_unitOfWeight").show();
	    	$("#unitOfPrice"+id).show();
	    	$("#unit"+id).show();
	    	$("#unitOfWeight"+id).show();
	    	
	    	// 取旧值
	    	var productNameOld = $("#productName"+id).text();
	    	
	    	var unitPriceOld = $("#unitPrice"+id).attr("data-text");
	    	var unitOfPriceOld;
	    	if(unitPriceOld==null||unitPriceOld==""||unitPriceOld==undefined){
				unitPriceOld = "";
				unitOfPriceOld = "";
			}else{
				unitOfPriceOld = $("#unitOfPrice"+id).text();
			}
	    	var totalPriceOld = $("#totalPrice"+id).attr("data-text");
	    	var unitOld = $("#unit"+id).text();
	    	var weightOld = $("#weight"+id).attr("data-text");
	    	var unitOfWeightOld
	    	if(weightOld==null||weightOld==""||weightOld==undefined){
				weightOld = "";
				unitOfWeightOld = "";
			}else{
				unitOfWeightOld = $("#unitOfWeight"+id).text();
			}
	    	var quantityOld = $("#quantity"+id).text();
	    	var vatOld = $("#vat"+id).text();
	    	var marketNameOld = $("#marketName"+id).text();
	    	var customerReceiptIdOld = $("#customerReceiptId"+id).attr("data-id");
	    	    customerReceiptIdOld = (customerReceiptIdOld == '0')?'':customerReceiptIdOld;
	    	var transactionDateOld = $("#transactionDate"+id).text();
	    	
	    	// 时区问题处理
	    	var tzoffset = new Date(transactionDateOld).getTimezoneOffset() * 60000
	    	const transactionDateOldFormat = new Date(new Date(transactionDateOld)-tzoffset).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#productName"+id).html('<input type="text" id="productNameInput'+id+'" value="'+productNameOld+'" style="width:100%" />');
	    	$("#unitPrice"+id).html('<input type="number" id="unitPriceInput'+id+'" value="'+unitPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#unitOfPrice"+id).html('<input type="text" id="unitOfPriceInput'+id+'" value="'+unitOfPriceOld+'" style="width:100%" />');
	    	$("#totalPrice"+id).html('<input type="number" id="totalPriceInput'+id+'" value="'+totalPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#unit"+id).html('<input type="text" id="unitInput'+id+'" value="'+unitOld+'" style="width:100%" />');
	    	$("#weight"+id).html('<input type="number" id="weightInput'+id+'" value="'+weightOld+'" step="0.001"  min="0.001" max="999" style="width:100%"/>');
	    	$("#unitOfWeight"+id).html('<input type="text" id="unitOfWeightInput'+id+'" value="'+unitOfWeightOld+'" style="width:100%" />');
	    	$("#quantity"+id).html('<input type="number" id="quantityInput'+id+'" value="'+quantityOld+'" step="1"  min="1" max="999" style="width:100%"/>');
	    	$("#vat"+id).html('<input type="number" id="vatInput'+id+'" value="'+vatOld+'" step="0.01"  min="0.00" max="999" style="width:100%"/>');
	    	$("#customerReceiptId"+id).html('<input type="text" id="customerReceiptIdInput'+id+'" value="'+customerReceiptIdOld+'" style="width:100%" />');
	    	$("#marketName"+id).html('<input type="text" id="marketNameInput'+id+'" value="'+marketNameOld+'" style="width:100%" />');
	    	$("#transactionDate"+id).html('<input type="datetime-local" id="transactionDateInput'+id+'" value="'+transactionDateOldFormat+'" step="1" />');
	    	
	    	// 为 取消修改 做准备
	    	$("#receiptModifyCancel"+id).attr("onclick","receiptModifyCancel('"+id+"',event,'"+productNameOld+"','"+unitPriceOld+"','"+unitOfPriceOld+"','"+
	    	        totalPriceOld+"','"+unitOld+"','"+weightOld+"','"+unitOfWeightOld+"','"+quantityOld+"','"+vatOld+"','"+marketNameOld+"','"+
	    	        customerReceiptIdOld+"','"+transactionDateOld+"')");
	    	
	    }
	    
	    // 取消修改
	    function receiptModifyCancel(id,event,productNameOld,unitPriceOld,unitOfPriceOld,totalPriceOld,unitOld,weightOld,
	    		                     unitOfWeightOld,quantityOld,vatOld,marketNameOld,customerReceiptIdOld,transactionDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
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
	    	
	    	$("#productName"+id).text(productNameOld);
	    	$("#unitPrice"+id).text(unitPriceOld+unitOfPriceOld);
	    	$("#unitOfPrice"+id).text(unitOfPriceOld);
	    	$("#totalPrice"+id).text(totalPriceOld+unitOld);
	    	$("#unit"+id).text(unitOld);
	    	$("#weight"+id).text(weightOld+unitOfWeightOld);
	    	$("#unitOfWeight"+id).text(unitOfWeightOld);
	    	
	    	$("#quantity"+id).text(quantityOld);
	    	$("#vat"+id).text(vatOld);
	    	$("#marketName"+id).text(marketNameOld);
	    	
	    	if(customerReceiptIdOld==""){
		        $("#customerReceiptId"+id).text("");
	        }else{
		        $("#customerReceiptId"+id).html("<a href='/customerReceipt/query/"+customerReceiptIdOld+"' target='_blank'>点击查看</a>");
	        }
	    	
	    	$("#transactionDate"+id).text(transactionDateOld);
	    	
	    }
	    
	    // 确定修改
	    function receiptModifyConfirm(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return false;
	    	
	    	// 取值
	    	var productName = $("#productNameInput"+id).val();
	    	var unitPrice = $("#unitPriceInput"+id).val();
	    	var unitOfPrice = $("#unitOfPriceInput"+id).val();
	    	var totalPrice = $("#totalPriceInput"+id).val();
	    	var unit = $("#unitInput"+id).val();
	    	var weight = $("#weightInput"+id).val();
	    	var unitOfWeight = $("#unitOfWeightInput"+id).val();
	    	var quantity = $("#quantityInput"+id).val();
	    	var vat = $("#vatInput"+id).val();
	    	var marketName = $("#marketNameInput"+id).val();
	    	var customerReceiptId = $("#customerReceiptIdInput"+id).val();
	    	var transactionDate = $("#transactionDateInput"+id).val();
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var receiptJson = {"id":id,"productName":productName,"unitPrice":unitPrice,"unitOfPrice":unitOfPrice,
	    	                   "totalPrice":totalPrice,"unit":unit,"weight":weight,"unitOfWeight":unitOfWeight,"quantity":quantity,
	    	                   "vat":vat,"marketName":marketName,"customerReceiptId":customerReceiptId,"transactionDate":transactionDate};
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
	    	$("#marketName"+id).text(result.marketName);
	    	var customerReceiptId = result.customerReceiptId;
	    	if(customerReceiptId==null || customerReceiptId==""){
		        $("#customerReceiptId"+id).text("");
		        $("#customerReceiptId"+id).attr("data-id","0");
	        }else{
		        $("#customerReceiptId"+id).html("<a href='/customerReceipt/query/"+customerReceiptId+"' target='_blank'>点击查看</a>");
	            $("#customerReceiptId"+id).attr("data-id",customerReceiptId);
	        }
	    	$("#transactionDate"+id).text(result.transactionDate);
	    	
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
	    
	    
	    function showTotal(){
		$("#showMain").val("false");
		
		var page = $("#page_ul").find(".active").children().text();
		if(page==null || page==undefined || page==""){
			$("#page").val(1);
		}else{
			$("#page").val(page);
		}
		
		$("#receiptQueryForm").submit();
		
		return true;
		
	   }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    