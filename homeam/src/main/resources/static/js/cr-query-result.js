/**
 * 客服小票查询结果js
 */
 
        // 删除预处理
	    function crDeleteOne(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return false;
	    	
	    	$("#crModalBody").text("确定删除吗？ id="+id);
	    	$("#crModelConfirm").attr("onclick","doCrDeleteOne("+id+")");
	    	$("#showModelButton").click();
	    }
	    
	    // 执行删除
	    function doCrDeleteOne(id){
	    	$("#crModelConfirm").attr("onclick","");
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/customerReceipt/deleteOne/"+id,
	    		  data: "",
	    		  dataType: "json",
	    		  success: function(result){
					   if(result.success){
						  afterDoCrDeleteOne(id);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("删除失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    	
	    }
	    
	    // 删除后处理
	    function afterDoCrDeleteOne(id){
	    	$("#tr"+id).addClass("text-danger");
	    	$("#tr"+id).hide(1200);
	    }
	    
	     // 修改预处理
	    function crModify(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#crModifyCancel"+id).show();
	    	$("#crModifyConfirm"+id).show();
	    	$("#crModify"+id).hide();
	    	$("#crDeleteOne"+id).hide();
	    	
	    	$("#tbody_cr").children().css("display","none");
	    	$("#tr"+id).css("display","table-row");
	    	$("#thead_unit").show();
	    	$("#unit"+id).show();
	    	// $("#cr_result_table").attr("style","width:210%;");
	    	
	    	// 取旧值
	    	var terminalIdOld = $("#terminalId"+id).text();
	    	var transactionNumberOld = $("#transactionNumber"+id).text();
	    	var receiptNumberOld = $("#receiptNumber"+id).text();
	    	var taxNumberOld = $("#taxNumber"+id).text();
	    	var paymentMethodOld = $("#paymentMethod"+id).text();
	    	var amountOld = $("#amount"+id).attr("data-text");
	    	var unitOld = $("#unit"+id).text();
	    	var companyIdOld = $("#companyId"+id).attr("data-id");
	    	    companyIdOld = (companyIdOld == '0'|| companyIdOld===undefined)?'':companyIdOld;
	    	var transactionDateOld = $("#transactionDate"+id).text();
	    	var creatDateOld = $("#creatDate"+id).text();
	    	var lastModifyDateOld = $("#lastModifyDate"+id).text();
	    	
	    	// 时区问题处理
	    	var tzoffsetOfTr = new Date(transactionDateOld).getTimezoneOffset()*60000;
	    	var tzoffsetOfCr = new Date(creatDateOld).getTimezoneOffset()*60000;
	    	const transactionDateOldFormat = new Date(new Date(transactionDateOld)-tzoffsetOfTr).toISOString().substring(0, 19);
	    	const creatDateOldFormat = new Date(new Date(creatDateOld)-tzoffsetOfCr).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#terminalId"+id).html('<input type="text" id="terminalIdInput'+id+'" value="'+terminalIdOld+'" style="width:100%" />');
	    	$("#transactionNumber"+id).html('<input type="text" id="transactionNumberInput'+id+'" value="'+transactionNumberOld+'" style="width:100%" />');
	    	$("#receiptNumber"+id).html('<input type="text" id="receiptNumberInput'+id+'" value="'+receiptNumberOld+'" style="width:100%"/>');
	    	$("#taxNumber"+id).html('<input type="text" id="taxNumberInput'+id+'" value="'+taxNumberOld+'" style="width:100%"/>');
	    	
	    	$("#paymentMethod"+id).html('<input type="text" id="paymentMethodInput'+id+'" value="'+paymentMethodOld+'" list="paymentMethodList" style="width:100%"/>'
	    	                        +'<datalist id="paymentMethodList"><option value="Cash">Bargeld</option><option value="GiroCard">GiroCard</option>'
	    	                        +'<option value="CreditCard">CreditCard</option><option value="NFC">NFC</option><option value="Advance">Vorkasse</option>'
	    	                        +'<option value="Financing">Finanzierung</option><option value="PayPal">PayPal</option><option value="Giropay">Giropay</option>'
	    	                        +'<option value="Online">Online</option><option value="other">other</option></datalist>');
	    	$("#amount"+id).html('<input type="number" id="amountInput'+id+'" value="'+amountOld+'" step="0.01"  min="0.00" style="width:100%"/>');
	    	$("#unit"+id).html('<input type="text" id="unitInput'+id+'" value="'+unitOld+'" style="width:100%"/>');
	    	$("#companyId"+id).html('<input type="text" id="companyIdInput'+id+'" value="'+companyIdOld+'" style="width:100%" />');
	    	$("#transactionDate"+id).html('<input type="datetime-local" id="transactionDateInput'+id+'" value="'+transactionDateOldFormat+'" step="1" />');
	    	$("#creatDate"+id).html('<input type="datetime-local" id="creatDateInput'+id+'" value="'+creatDateOldFormat+'" step="1" />');
	    	$("#lastModifyDate"+id).text('');
	    	
	    	// 为 取消修改 做准备
	    	$("#crModifyCancel"+id).attr("onclick","crModifyCancel('"+id+"',event,'"+terminalIdOld+"','"+transactionNumberOld+"','"+receiptNumberOld+"','"+taxNumberOld+
	    	                             "','"+paymentMethodOld+"','"+amountOld+"','"+unitOld+"','"+companyIdOld+"','"+transactionDateOld+"','"+creatDateOld+"','"+lastModifyDateOld+"')");
	    	
	    }
	    
	    // 取消修改
	    function crModifyCancel(id,event,terminalIdOld,transactionNumberOld,receiptNumberOld,taxNumberOld,paymentMethodOld,
	                            amountOld,unitOld,companyIdOld,transactionDateOld,creatDateOld,lastModifyDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return false;
	    	
	    	$("#crModifyCancel"+id).hide();
	    	$("#crModifyConfirm"+id).hide();
	    	$("#crModify"+id).show();
	    	$("#crDeleteOne"+id).show();
	    	
	    	$("#tbody_cr").children().removeAttr("style");
	    	$("#thead_unit").hide();
	    	$("#unit"+id).hide();
	    	// $("#cr_result_table").attr("style","width:210%;");
	    	
	    	$("#terminalId"+id).text(terminalIdOld);
	    	$("#transactionNumber"+id).text(transactionNumberOld);
	    	$("#receiptNumber"+id).text(receiptNumberOld);
	    	$("#taxNumber"+id).text(taxNumberOld);
	    	$("#paymentMethod"+id).text(paymentMethodOld);
	    	$("#amount"+id).text(amountOld+unitOld);
	    	$("#unit"+id).text(unitOld);
	    	$("#companyId"+id).text(companyIdOld);
	    	if(companyIdOld=="" || companyIdOld===undefined ){
		        $("#companyId"+id).text("");
	        }else{
		        $("#companyId"+id).html("<a href='/companyInfo/query/"+companyIdOld+"' target='_blank'>点击查看</a>");
	        }
	    	$("#transactionDate"+id).text(transactionDateOld);
	    	$("#creatDate"+id).text(creatDateOld);
	    	$("#lastModifyDate"+id).text(lastModifyDateOld);
	    	
	    }
	    
	    // 确定修改
	    function crModifyConfirm(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return false;
	    	
	    	// 取值
	    	var terminalId = $("#terminalIdInput"+id).val();
	    	var transactionNumber = $("#transactionNumberInput"+id).val();
	    	var receiptNumber = $("#receiptNumberInput"+id).val();
	    	var taxNumber = $("#taxNumberInput"+id).val();
	    	var paymentMethod = $("#paymentMethodInput"+id).val();
	    	var amount = $("#amountInput"+id).val();
	    	var unit = $("#unitInput"+id).val();
	    	var companyId = $("#companyIdInput"+id).val();
	    	var transactionDate = $("#transactionDateInput"+id).val();
	    	var creatDate = $("#creatDateInput"+id).val();
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var cReceiptJson = {"id":id,"terminalId":terminalId,"transactionNumber":transactionNumber,"receiptNumber":receiptNumber,"taxNumber":taxNumber,
	    	                   "paymentMethod":paymentMethod,"amount":amount,"unit":unit,"companyId":companyId,"transactionDate":transactionDate,
			                   "creatDate":creatDate};
	    	var formData = new FormData();
	    	for ( var key in cReceiptJson ) {
	    		formData.append(key, cReceiptJson[key]);
	    	}
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/customerReceipt/modify",
	    		  data: formData,      // 要发送的数据
	    		  contentType:false,   // 默认为 application/x-www-form-urlencoded; charset=UTF-8
	    		  processData:false,   // 默认为true，会把数据解析为query字符串，对应于contentType的默认值
	    		  dataType: "json",    // 要接收的数据类型
	    		  success: function(result){
					   if(result.success){
						  afterCrModifyConfirm(result);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("修改失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    }
	    
	    // 修改后处理
	    function afterCrModifyConfirm(result){
	    	var id = result.id;
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	// 修改页面显示
	    	$("#terminalId"+id).text(result.terminalId);
	    	$("#transactionNumber"+id).text(result.transactionNumber);
	    	$("#receiptNumber"+id).text(result.receiptNumber);
	    	$("#taxNumber"+id).text(result.taxNumber);
	    	$("#paymentMethod"+id).text(result.paymentMethod);
	    	$("#amount"+id).text(result.amount+result.unit);
	    	$("#amount"+id).attr("data-text",result.amount);
	    	$("#unit"+id).text(result.unit);
	    	$("#transactionDate"+id).text(result.transactionDate);
	    	$("#creatDate"+id).text(result.creatDate);
	    	$("#lastModifyDate"+id).text(result.lastModifyDate);
	    	var companyId = result.companyId;
	    	if(companyId==null || companyId==""){
		        $("#companyId"+id).text("");
		        $("#companyId"+id).attr("data-id","0");
	        }else{
		        $("#companyId"+id).html("<a href='/companyInfo/query/"+companyId+"' target='_blank'>点击查看</a>");
	            $("#companyId"+id).attr("data-id",companyId);
	        }
	    	
	    	$("#tr"+id).addClass("table-secondary");
	    	
	    	$("#crModifyCancel"+id).hide();
	    	$("#crModifyConfirm"+id).hide();
	    	$("#crModify"+id).show();
	    	$("#crDeleteOne"+id).show();
	    	
	    	$("#tbody_cr").children().removeAttr("style");
	    	$("#thead_unit").hide();
	    	$("#unit"+id).hide();
	    	// $("#cr_result_table").attr("style","width:210%;");
	    	
	    }
	    
	    // 换页
	    function changePage(pageNumber,event){
		    event.preventDefault();
	    	if(pageNumber<1) return false;
	    	
	    	// 处理时区问题
	    	var tds = $("#transactionDateStart").val();
	    	var tde = $("#transactionDateEnd").val();
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
	    	
	    	$("#crQueryForm").submit();
	
	    	
	    }
 
 