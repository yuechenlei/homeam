/**
 * 通信地址JS
 */
 
        // 删除预处理
	    function maDeleteOne(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#maModalBody").text("确定删除吗？id="+id);
	    	$("#maModalConfirm").attr("onclick","doMaDeleteOne("+id+")");
	    	$("#showModelButton").click();
	    }
	    
	    // 执行删除
	    function doMaDeleteOne(id){
	    	$("#maModalConfirm").attr("onclick","");
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/mailingAddress/deleteOne/"+id,
	    		  data: "",
	    		  dataType: "json",
	    		  success: function(result){
					   if(result.success){
						  afterDoMaDeleteOne(id);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("删除失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    	
	    }
	    
	    // 删除后处理
	    function afterDoMaDeleteOne(id){
	    	$("#tr"+id).addClass("text-danger");
	    	$("#tr"+id).hide(1200);
	    }
 
        // 修改预处理
	    function maModify(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#maModifyCancel"+id).show();
	    	$("#maModifyConfirm"+id).show();
	    	$("#maModify"+id).hide();
	    	$("#maDeleteOne"+id).hide();
	    	//$("#ma_result_table").attr("style","width:120%;");
	    	
	    	// 取旧值
	    	var vorNameOld = $("#vorName"+id).text();
	    	var nachNameOld = $("#nachName"+id).text();
	    	var streetNameOld = $("#streetName"+id).text();
	    	var streetNumberOld = $("#streetNumber"+id).text();
	    	var postalCodeOld = $("#postalCode"+id).text();
	    	var cityOld = $("#city"+id).text();
	    	var creatDateOld = $("#creatDate"+id).text();
	    	var lastModifyDateOld = $("#lastModifyDate"+id).text();
	    	
	    	// 时区问题处理
	    	var tzoffset = (new Date(creatDateOld)).getTimezoneOffset() * 60000;  // 毫秒数
	    	const creatDateOldFormat = new Date(new Date(creatDateOld)-tzoffset).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#vorName"+id).html('<input type="text" id="vorNameInput'+id+'" value="'+vorNameOld+'"  style="width:100%"/>');
	    	$("#nachName"+id).html('<input type="text" id="nachNameInput'+id+'" value="'+nachNameOld+'" style="width:100%"/>');
	    	$("#streetName"+id).html('<input type="text" id="streetNameInput'+id+'" value="'+streetNameOld+'" style="width:100%"/>');
	    	$("#streetNumber"+id).html('<input type="text" id="streetNumberInput'+id+'" value="'+streetNumberOld+'" style="width:100%"/>');
	    	$("#postalCode"+id).html('<input type="text" id="postalCodeInput'+id+'" value="'+postalCodeOld+'"  style="width:100%"/>');
	    	$("#city"+id).html('<input type="text" id="cityInput'+id+'" value="'+cityOld+'"  style="width:100%"/>');
	    	$("#creatDate"+id).html('<input type="datetime-local" id="creatDateInput'+id+'" value="'+creatDateOldFormat+'" step="1" />');
	    	$("#lastModifyDate"+id).text('');
	    	
	    	
	    	// 为 取消修改 做准备
	    	$("#maModifyCancel"+id).attr("onclick","maModifyCancel('"+id+"',event,'"+vorNameOld+"','"+nachNameOld+"','"+streetNameOld+"','"
	    	                        +streetNumberOld+"','"+postalCodeOld+"','"+cityOld+"','"+creatDateOld+"','"+lastModifyDateOld+"')");
	    	
	    }
	    
	    // 取消修改
	    function maModifyCancel(id,event,vorNameOld,nachNameOld,streetNameOld,streetNumberOld,postalCodeOld,cityOld,
	                            creatDateOld,lastModifyDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#maModifyCancel"+id).hide();
	    	$("#maModifyConfirm"+id).hide();
	    	$("#maModify"+id).show();
	    	$("#maDeleteOne"+id).show();
	    	//$("#ma_result_table").attr("style","width:110%;");
	    	
	    	$("#vorName"+id).text(vorNameOld);
	    	$("#nachName"+id).text(nachNameOld);
	    	$("#streetName"+id).text(streetNameOld);
	    	$("#streetNumber"+id).text(streetNumberOld);
	    	$("#postalCode"+id).text(postalCodeOld);
	    	$("#city"+id).text(cityOld);
	    	$("#creatDate"+id).text(creatDateOld);
	    	$("#lastModifyDate"+id).text(lastModifyDateOld);
	    	
	    }
	    
	    // 确定修改
	    function maModifyConfirm(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return false;
	    	
	    	// 取值
	    	var vorName = $("#vorNameInput"+id).val();
	    	var nachName = $("#nachNameInput"+id).val();
	    	var streetName = $("#streetNameInput"+id).val();
	    	var streetNumber = $("#streetNumberInput"+id).val();
	    	var postalCode = $("#postalCodeInput"+id).val();
	    	var city = $("#cityInput"+id).val();
	    	var creatDateOld = new Date($("#creatDateInput"+id).val());
	    	
	    	// 时区问题处理(同时解决了'秒'为零的问题)
	    	var tzoffset = (new Date()).getTimezoneOffset() * 60000
	    	const creatDate = new Date(new Date(creatDateOld)-tzoffset).toISOString().substring(0, 19);
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var maJson = {"id":id,"vorName":vorName,"nachName":nachName,"streetName":streetName,
	    	                   "streetNumber":streetNumber,"postalCode":postalCode,"city":city,
   			                   "creatDate":creatDate};
	    	var formData = new FormData();
	    	for ( var key in maJson ) {
	    		formData.append(key, maJson[key]);
	    	}
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/mailingAddress/modify",
	    		  data: formData,      // 要发送的数据
	    		  contentType:false,   // 默认为 application/x-www-form-urlencoded; charset=UTF-8
	    		  processData:false,   // 默认为true，会把数据解析为query字符串，对应于contentType的默认值
	    		  dataType: "json",    // 要接收的数据类型
	    		  success: function(result){
					   if(result.success){
						  afterMaModifyConfirm(result);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("修改失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    }
	    
	    // 修改后处理
	    function afterMaModifyConfirm(result){
	    	var id = result.id;
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	// 修改页面显示
	    	$("#vorName"+id).text(result.vorName);
	    	$("#nachName"+id).text(result.nachName);
	    	$("#streetName"+id).text(result.streetName);
	    	$("#streetNumber"+id).text(result.streetNumber);
	    	$("#postalCode"+id).text(result.postalCode);
	    	$("#city"+id).text(result.city);
	    	$("#creatDate"+id).text(result.creatDate);
	    	$("#lastModifyDate"+id).text(result.lastModifyDate);
	    	
	    	$("#tr"+id).addClass("table-secondary");
	    	
	    	$("#maModifyCancel"+id).hide();
	    	$("#maModifyConfirm"+id).hide();
	    	$("#maModify"+id).show();
	    	$("#maDeleteOne"+id).show();
	    	//$("#ma_result_table").attr("style","width:110%;");
	    	
	    }
 
 
        // 换页
	    function changePage(pageNumber,event){
		    event.preventDefault();
	    	if(pageNumber<1) return false;
	    	
	    	
	    	$("#page").val(pageNumber);
	    	
	    	$("#maQueryForm").submit();
	
	    	
	    }
 
 
 
 
 
 
 