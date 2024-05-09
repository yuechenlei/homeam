/**
 * 
 */
 
        // 删除预处理
	    function companyInfoDeleteOne(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return false;
	    	
	    	$("#companyInfoModalBody").text("确定删除吗？id="+id);
	    	$("#companyInfoModelConfirm").attr("onclick","doCompanyInfoDeleteOne("+id+")");
	    	$("#showModelButton").click();
	    }
	    
	    // 执行删除
	    function doCompanyInfoDeleteOne(id){
	    	$("#companyInfoModelConfirm").attr("onclick","");
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/companyInfo/deleteOne/"+id,
	    		  data: "",
	    		  dataType: "json",
	    		  success: function(result){
					   if(result.success){
						  afterDoCompanyInfoDeleteOne(id);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("删除失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    	
	    }
	    
	    // 删除后处理
	    function afterDoCompanyInfoDeleteOne(id){
	    	$("#tr"+id).addClass("text-danger");
	    	$("#tr"+id).hide(1200);
	    }
	    
	    // 修改预处理
	    function companyInfoModify(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#companyInfoModifyCancel"+id).show();
	    	$("#companyInfoModifyConfirm"+id).show();
	    	$("#companyInfoModify"+id).hide();
	    	$("#companyInfoDeleteOne"+id).hide();
	    	//$("#companyInfo_result_table").attr("style","width:160%;");
	    	
	    	// 取旧值
	    	var nameOld = $("#name"+id).text();
	    	var telephoneNumberOld = $("#telephoneNumber"+id).text();
	    	var webSiteOld = $("#webSite"+id).attr("data-text");
	    	    webSiteOld = (webSiteOld == '0' || webSiteOld===undefined)?'':webSiteOld;
	    	var openTimeOld = $("#openTime"+id).text();
	    	var mailingAddressIdOld = $("#mailingAddressId"+id).text();
	    	var mailingAddressIdOld = $("#mailingAddressId"+id).attr("data-id");
	    	    mailingAddressIdOld = (mailingAddressIdOld == '0')?'':mailingAddressIdOld;
	    	var creatDateOld = $("#creatDate"+id).text();
	    	var lastModifyDateOld = $("#lastModifyDate"+id).text();
	    	
	    	// 时区问题处理
	    	var tzoffset = (new Date(creatDateOld)).getTimezoneOffset() * 60000;
	    	const creatDateOldFormat = new Date(new Date(creatDateOld)-tzoffset).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#name"+id).html('<input type="text" id="nameInput'+id+'" value="'+nameOld+'"  style="width:100%"/>');
	    	$("#telephoneNumber"+id).html('<input type="text" id="telephoneNumberInput'+id+'" value="'+telephoneNumberOld+'"  style="width:100%"/>');
	    	$("#webSite"+id).html('<input type="text" id="webSiteInput'+id+'" value="'+webSiteOld+'"  style="width:100%"/>');
	    	$("#openTime"+id).html('<input type="text" id="openTimeInput'+id+'" value="'+openTimeOld+'"  style="width:100%"/>');
	    	$("#mailingAddressId"+id).html('<input type="text" id="mailingAddressIdInput'+id+'" value="'+mailingAddressIdOld+'"  style="width:100%"/>');
	    	$("#creatDate"+id).html('<input type="datetime-local" id="creatDateInput'+id+'" value="'+creatDateOldFormat+'" step="1" />');
	    	$("#lastModifyDate"+id).text('');
	    	
	    	
	    	// 为 取消修改 做准备
	    	$("#companyInfoModifyCancel"+id).attr("onclick","companyInfoModifyCancel('"+id+"',event,'"+nameOld+"','"+telephoneNumberOld+"','"+webSiteOld+
	    	   "','"+openTimeOld+"','"+mailingAddressIdOld+"','"+creatDateOld+"','"+lastModifyDateOld+"')");
	    	
	    }
	    
	    
	    // 取消修改
	    function companyInfoModifyCancel(id,event,nameOld,telephoneNumberOld,webSiteOld,openTimeOld,mailingAddressIdOld,
	                            creatDateOld,lastModifyDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	$("#companyInfoModifyCancel"+id).hide();
	    	$("#companyInfoModifyConfirm"+id).hide();
	    	$("#companyInfoModify"+id).show();
	    	$("#companyInfoDeleteOne"+id).show();
	    	//$("#companyInfo_result_table").attr("style","width:150%;");
	    	
	    	$("#name"+id).text(nameOld);
	    	$("#telephoneNumber"+id).text(telephoneNumberOld);
	    	$("#webSite"+id).text(webSiteOld);
	    	if(webSiteOld=='' || webSiteOld===undefined || webSiteOld==null){
		        $("#webSite"+id).text("");
	        }else{
		        $("#webSite"+id).html("<a href='"+webSiteOld+"' target='_blank'>"+webSiteOld+"</a>");
	        }
	    	$("#openTime"+id).text(openTimeOld);
	    	if(mailingAddressIdOld==""){
		        $("#mailingAddressId"+id).text("");
	        }else{
		        $("#mailingAddressId"+id).html("<a href='/mailingAddress/query/"+mailingAddressIdOld+"' target='_blank'>点击查看</a>");
	        }
	    	$("#creatDate"+id).text(creatDateOld);
	    	$("#lastModifyDate"+id).text(lastModifyDateOld);
	    	
	    }
	    
	    // 确定修改
	    function companyInfoModifyConfirm(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id===undefined) return false;
	    	
	    	// 取值
	    	var name = $("#nameInput"+id).val();
	    	var telephoneNumber = $("#telephoneNumberInput"+id).val();
	    	var webSite = $("#webSiteInput"+id).val();
	    	var openTime = $("#openTimeInput"+id).val();
	    	var mailingAddressId = $("#mailingAddressIdInput"+id).val();
	    	var creatDate = $("#creatDateInput"+id).val();
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var companyInfoJson = {"id":id,"name":name,"telephoneNumber":telephoneNumber,"webSite":webSite,
	    	                   "openTime":openTime,"mailingAddressId":mailingAddressId,"creatDate":creatDate};
	    	var formData = new FormData();
	    	for ( var key in companyInfoJson ) {
	    		formData.append(key, companyInfoJson[key]);
	    	}
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/companyInfo/modify",
	    		  data: formData,      // 要发送的数据
	    		  contentType:false,   // 默认为 application/x-www-form-urlencoded; charset=UTF-8
	    		  processData:false,   // 默认为true，会把数据解析为query字符串，对应于contentType的默认值
	    		  dataType: "json",    // 要接收的数据类型
	    		  success: function(result){
					   if(result.success){
						  afterCompanyInfoModifyConfirm(result);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("修改失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    }
	    
	    // 修改后处理
	    function afterCompanyInfoModifyConfirm(result){
	    	var id = result.id;
	    	if(id==null||id==""||id===undefined) return;
	    	
	    	// 修改页面显示
	    	$("#name"+id).text(result.name);
	    	$("#telephoneNumber"+id).text(result.telephoneNumber);
	    	var webSite = result.webSite;
	    	if(webSite==null || webSite=="" || webSite===undefined){
		        $("#webSite"+id).text("");
		        $("#webSite"+id).attr("data-text","0");
	        }else{
		        $("#webSite"+id).html("<a href='"+webSite+"' target='_blank'>"+webSite+"</a>");
	            $("#webSite"+id).attr("data-text",webSite);
	        }
	    	$("#openTime"+id).text(result.openTime);
	    	var mailingAddressId = result.mailingAddressId;
	    	if(mailingAddressId==null || mailingAddressId==""){
		        $("#mailingAddressId"+id).text("");
		        $("#mailingAddressId"+id).attr("data-id","0");
	        }else{
		        $("#mailingAddressId"+id).html("<a href='/mailingAddress/query/"+mailingAddressId+"' target='_blank'>点击查看</a>");
	            $("#mailingAddressId"+id).attr("data-id",mailingAddressId);
	        }
	    	$("#creatDate"+id).text(result.creatDate);
	    	$("#lastModifyDate"+id).text(result.lastModifyDate);
	    	
	    	$("#tr"+id).addClass("table-secondary");
	    	
	    	$("#companyInfoModifyCancel"+id).hide();
	    	$("#companyInfoModifyConfirm"+id).hide();
	    	$("#companyInfoModify"+id).show();
	    	$("#companyInfoDeleteOne"+id).show();
	    	// $("#companyInfo_result_table").attr("style","width:150%;");
	    	
	    }
	    
	    