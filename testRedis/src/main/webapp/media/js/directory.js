var directory = function () {
	
	// 分页
	var handlePagination = function(pageNum, addr) {
        
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
        	
            window.location.href=addr +'?' + parameters;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var queryDirectoryName = GetQueryString('queryDirectoryName');// 菜单名称
    	
        var queryDarentNavigator = GetQueryString('queryDarentNavigator');// 所属父级
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (queryDirectoryName != null && queryDirectoryName != ""){
        	
            paraStr += "&queryDirectoryName=" + queryDirectoryName;
        
        }
        
        if (queryDarentNavigator != null && queryDarentNavigator != "-1"){
        	
            paraStr += "&queryDarentNavigator=" + queryDarentNavigator;
        
        }
        
        return paraStr;
		
	}
	
    return {
        //main function to initiate the module
        init: function (pageNum,addr) {
        	
        	// 分页
        	handlePagination(pageNum, addr);
        	
        	$('#directory').validate({
        	   
	            errorElement: 'span', // 错误提示的标签
	            errorClass: 'help-block', // 错误提示的样式
	            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	            
	            // 要验证的信息
	            /*rules: {
	            	
	            	directoryName: {
	            		required: true,
	            		maxlength: 15
	                },
	                
	                directoryCode: {
	                    required: false,
	                    maxlength: 25
	                },
	                
	                directoryPriority: {
	                	required: true,
		                number: true
	                },
	                
	                parentNavigator: {
	                    required: true,
	                    number: true
	                },
	                
	                consoleUrl: {
	                    required: false,
	                    maxlength: 30
	                }
	                
	            },*/

	            // 错误提示信息
	            /*messages: {
	            	
	            	directoryName: {
	            		required: '菜单名称必填',
	            		maxlength: $.format('菜单名称最大长度:{0}')
	                },
	                
	                directoryCode: {
	            		maxlength: $.format('菜单编码最大长度:{0}')
	                },
	                
	                directoryPriority: {
	            		required: '菜单优先级必填',
	            		number: '请填写正确的优先级'
	                },
	                
	                parentNavigator: {
	                	required: '父级菜单必选',
	            		number: '请选择正确的父级菜单'
	                },
	                
	                consoleUrl: {
	            		maxlength: $.format('访问路径最大长度:{0}')
	                }
	                
	            },*/

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

           	// 菜单信息框点击保存
			$('#save').click(function(){
                if ($('#directory').validate().form()) {
                	
                	formSubmit();
                	
                }
                
                return false;
                
			});
			
			// 菜单信息框点击关闭
			$('#closeSave').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#directoryInfo').modal('hide');
                
			});
			
			// 菜单信息框点击右上角X
			$('#closeX').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#directoryInfo').modal('hide');
                
			});
			
			// 删除时确定按钮
			$('#doDel').click(function(){
				
                $('#delPrompt').modal('hide');
                
                delDirectory();
                
			});
			
			// AJAX提交要保存的信息
	        var formSubmit = function() {
	        	
				$.ajax({
					
					type : 'POST',
					
					url : '/sysManager/savedirectory',
					
					data : $('#directory').serializeArray(),
					
					dataType : 'JSON',
					
					async : false, 
					
					success: function(data) {
						
						var ecode = data.ecode;
						
						var emsg = data.emsg;
						
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							
							$('#error').html(emsg).css('display','block'); // 错误信息显示
							
						} else {
							
							// 清空表单
							$('#directory')[0].reset();
							
							var pIndex = GetQueryString("pIndex");
							
							var parameters = getQueryParameters(pIndex);
							
							// 刷新页面
							window.location.href='/sysManager/directorylist?' + parameters;

						}
						
					},
					
					error: function(e) { 
						
						if (e.responseText=='norole') {
        					
        					window.location.href='/norole';
        					
        				}else {
        					
        					$('#directoryInfo').modal('show');
    						
    						$('#error').show(); // 错误信息显示
    						
        				}
						
					} 
					
				});
				
        	};
        	
        	// AJAX删除菜单
        	var delDirectory = function (){
        		
        		var id = $('input[name="delDirectoryId"]').val();
        		
        		$.ajax({
        			
        			type : 'POST',
        			
        			url : '/sysManager/deldirectory',
        			
        			data : 'directoryId='+id,
        			
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
        					window.location.href='/sysManager/directorylist?' + parameters;
        					
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
		
		url : '/sysManager/getdirectoryinfo',
		
		data : 'directoryId='+id,
		
		dataType : 'JSON',
		
		success: function(data) {
			
			var ecode = data.ecode;
			
			var emsg = data.emsg;
			
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				
				$('#errorMsg').html(emsg);
				
				$('#errorModal').modal('show'); // 显示错误
				
			} else {
				
				// 填充数据
				$('input[name="directoryId"]').val(id);
				
				$('input[name="directoryName"]').val(data.adata.directoryName);
				
				$('input[name="directoryCode"]').val(data.adata.directoryCode);
				
				$('input[name="directoryPriority"]').val(data.adata.directoryPriority);
				
				$('select[name="parentNavigator"]').val(data.adata.parentNavigator);
				
				$('input[name="consoleUrl"]').val(data.adata.consoleUrl);
				
				$('#directoryInfo').modal('show'); // 显示菜单信息编辑框
				
			}
			
		},
		
		error: function(e) { 
			
			$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
			
			$('#errorModal').modal('show');
			
			return;
			
		} 
		
	});
    
};

var toAddDirectory = function(){
	
	$('#directory')[0].reset();// 清空表单
	
	$('#directoryInfo').modal('show');
	
};


var doDelete = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应菜单信息，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$('input[name="delDirectoryId"]').val(id);
	
	$('#delPrompt').modal('show');
	
};
