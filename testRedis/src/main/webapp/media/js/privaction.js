var action = function () {
	
	// 分页
	var handlePagination = function(pageNum) {
        
        var pIndex = GetQueryString("pIndex");
        
        if (pIndex == null){
        	
        	pIndex = 1;
        
        }
            
        $('#pager').bootpag({
        	
            total: pageNum,
            
            page: pIndex,
            
            maxVisible: 6 
            
            
        }).on('page', function(event, num){
        	
        	var parameters = getQueryParameters(num);
        	
            window.location.href='/sysManager/actionlist?' + parameters;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var queryDirectoryId = GetQueryString('queryDirectoryId');// 所属父级
    	
        var queryAction = GetQueryString('queryAction');// Action路径
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (queryDirectoryId != null && queryDirectoryId != "-1"){
        	
            paraStr += "&queryDirectoryId=" + queryDirectoryId;
        
        }
        
        if (queryAction != null && queryAction != ""){
        	
            paraStr += "&queryAction=" + queryAction;
        
        }
        
        return paraStr;
		
	}
	
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	
        	// 分页
        	handlePagination(pageNum);
        	
        	$('#privAction').validate({
        	   
	            errorElement: 'span', // 错误提示的标签
	            errorClass: 'help-block', // 错误提示的样式
	            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	            
	            // 要验证的信息
	            rules: {
	            	
	            	directoryId: {
	                    required: true,
	                    number: true
	                },
	            	
	                action: {
	            		required: true,
	            		maxlength: 50
	                },
	                
	                actionName: {
	                    required: false,
	                    maxlength: 15
	                }
	                
	            },

	            // 错误提示信息
	            messages: {
	            	
	            	directoryId: {
	            		required: '所属父级菜单必选',
	            		number: '请填写正确的所属父级菜单'
	                },
	            	
	                action: {
	            		required: 'Action路径必填',
	            		maxlength: $.format('Action路径最大长度:{0}')
	                },
	                
	                actionName: {
	                	required: 'Action功能描述必填',
	            		maxlength: $.format('Action功能描述最大长度:{0}')
	                }
	                
	            },

	            // 验证不通过
	            highlight: function (element) { 
	            	
	                $(element).closest('.control-group').addClass('error'); 
	                
	            },

	            // 验证通过
	            success: function (label) {
	            	
	                label.closest('.control-group').removeClass('error');
	                
	                label.remove();
	                
	            },

	            // 错误提示位置
	            errorPlacement: function (error, element) {
	            	
	            	error.appendTo(element.parent());
	            	
	            },

	        });

           	// Acton信息框点击保存
			$('#save').click(function(){
				
                if ($('#privAction').validate().form()) {
                	
                	formSubmit();
                	
                }
                
                return false;
                
			});
			
			// Action信息框点击关闭
			$('#closeSave').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#privActionInfo').modal('hide');
                
			});
			
			// Action信息框点击右上角X
			$('#closeX').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#privActionInfo').modal('hide');
                
			});
			
			// 删除时确定按钮
			$('#doDel').click(function(){
				
                $('#delPrompt').modal('hide');
                
                delPrivAction();
                
			});
			
			// AJAX提交要保存的信息
	        var formSubmit = function() {
	        	
				$.ajax({
					
					type : 'POST',
					
					url : '/sysManager/saveprivAction',
					
					data : $('#privAction').serializeArray(),
					
					dataType : 'JSON',
					
					async : false, 
					
					success: function(data) {
						
						var ecode = data.ecode;
						
						var emsg = data.emsg;
						
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							
							$('#error').html(emsg).css('display','block'); // 错误信息显示
							
						} else {
							
							// 清空表单
							$('#privAction')[0].reset();
							
							var pIndex = GetQueryString("pIndex");
							
							var parameters = getQueryParameters(pIndex);
							
							// 刷新页面
							window.location.href='/sysManager/actionlist?' + parameters;

						}
						
					},
					
					error: function(e) { 
						
						$('#privActionInfo').modal('show');
						
						$('#error').show(); // 错误信息显示
						
					} 
					
				});
				
        	};
        	
        	// AJAX删除Action信息
        	var delPrivAction = function (){
        		
        		var id = $('input[name="delPrivActionId"]').val();
        		
        		$.ajax({
        			
        			type : 'POST',
        			
        			url : '/sysManager/delprivaction',
        			
        			data : 'privActionId='+id,
        			
        			dataType : 'JSON',
        			
        			success: function(data) {
        				
        				var ecode = data.ecode;
        				
        				var emsg = data.emsg;
        				
        				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
        					
        					$('#errorMsg').html(emsg);
        					
        					$('#errorModal').modal('show'); // 显示错误
        					
        				} else {
        					
        					var pIndex = GetQueryString("pIndex");
							
							var parameters = getQueryParameters(pIndex);
        					
        					// 刷新页面
        					window.location.href='/sysManager/actionlist?' + parameters;
        					
        				}
        				
        			},
        			
        			error: function(e) { 
        				
        				$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
        				
        				$('#errorModal').modal('show');
        				
        				return;
        				
        			} 
        			
        		});
        		
        	};
	        
        }
    
    };

}();

var goModify = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应角色信息，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$.ajax({
		
		type : 'POST',
		
		url : '/sysManager/getprivactioninfo',
		
		data : 'privActionId='+id,
		
		dataType : 'JSON',
		
		success: function(data) {
			
			var ecode = data.ecode;
			
			var emsg = data.emsg;
			
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				
				$('#errorMsg').html(emsg);
				
				$('#errorModal').modal('show'); // 显示错误
				
			} else {
				
				// 填充数据
				$('input[name="privActionId"]').val(id);
				
				$('select[name="directoryId"]').val(data.adata.directoryId);
				
				$('input[name="action"]').val(data.adata.action);
				
				$('input[name="actionName"]').val(data.adata.actionName);
				
				$('#privActionInfo').modal('show'); // 显示Action信息编辑框
				
			}
			
		},
		
		error: function(e) { 
			
			$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
			
			$('#errorModal').modal('show');
			
			return;
			
		} 
		
	});
    
};

var toAddPrivAction = function(){
	
	$('#privAction')[0].reset();// 清空表单
	
	$('#privActionInfo').modal('show');
	
};

var doDelete = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应Action信息，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$('input[name="delPrivActionId"]').val(id);
	
	$('#delPrompt').modal('show');
	
};
