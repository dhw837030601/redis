var staff = function () {
	
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
        	
            window.location.href='/sysManager/stafflist?' + parameters;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var queryStaffName = GetQueryString('queryStaffName');// 用户名
    	
        var queryDepartment = GetQueryString('queryDepartment');// 所属部门
        
        var queryMobile = GetQueryString('queryMobile');// 手机号
        
        var queryActualName = GetQueryString('queryActualName');// 真实姓名
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (queryStaffName != null && queryStaffName != ""){
        	
            paraStr += "&queryStaffName=" + queryStaffName;
        
        }
        
        if (queryDepartment != null && queryDepartment != "-1"){
        	
            paraStr += "&queryDepartment=" + queryDepartment;
        
        }
        
        if (queryMobile != null && queryMobile != ""){
        	
            paraStr += "&queryMobile=" + queryMobile;
            
        }
        if (queryActualName != null && queryActualName != ""){
        	
        	paraStr += "&queryActualName=" + queryActualName;	
        	
        }
        
        return paraStr;
		
	}
	
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	
        	// 分页
        	handlePagination(pageNum);
        	
        	$('#staff').validate({
        	   
	            errorElement: 'span', // 错误提示的标签
	            errorClass: 'help-block', // 错误提示的样式
	            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	            
	            // 要验证的信息
	            rules: {
	            	
	            	accountType: {
	            		required: true,
	                    number: true
	                },
	                
	                departmentId: {
	                    required: true,
	                    number: true
	                },
	                
	                userRoleId: {
	                	required: true,
		                number: true
	                },
	                
	                staffName: {
	                    required: true,
	                    maxlength: 15
	                },
	                
	                passwd: {
	                    required: true,
	                    password: true,
	                    minlength: 6,
	                    maxlength: 50
	                },
	                
	                mobile: {
	                    required: true,
	                    maxlength: 11,
	                    isMobile: true
	                },
	                
	                idCard: {
	                    required: true,
	                    maxlength: 18,
	                    isIdCardNo: true
	                },
	                
	                actualName: {
	                    required: true,
	                    maxlength: 6
	                }
	                
	            },

	            // 错误提示信息
	            messages: {
	            	
	            	accountType: {
	            		required: '角色类型必选',
	            		number: '请选择正确的角色类型'
	                },
	                
	                departmentId: {
	            		required: '所属部门必选',
	            		number: '请选择正确的所属部门'
	                },
	                
	                userRoleId: {
	            		required: '员工角色必选',
	            		number: '请选择正确的员工角色'
	                },
	                
	                staffName: {
	                	required: '请填写员工用户名',
	            		maxlength: $.format('员工用户名最大长度:{0}')
	                },
	                
	                passwd: {
	                	required: '请填写员工登录密码',
	                	password: '密码只能是字母数字下划线组成',
	                	minlength: $.format('员工登录密码最小长度:{0}'),
	            		maxlength: $.format('员工登录密码最大长度:{0}')
	                },
	                
	                mobile: {
	                	required: '请填写员工手机号',
	            		maxlength: $.format('员工手机号最大长度:{0}'),
	            		isMobile: '请填写正确的手机号'
	                },
	                
	                idCard: {
	                	required: '请填写员工身份证号',
	            		maxlength: $.format('身份证号最大长度:{0}'),
	            		isIdCardNo: '请填写正确的身份证号'
	                },
	                
	                actualName: {
	                	required: '请填写员工真实姓名',
	            		maxlength: $.format('员工真实姓名最大长度:{0}')
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

           	// 员工信息框点击保存
			$('#save').click(function(){
				
                if ($('#staff').validate().form()) {
                	
                	$('#staffInfo').modal('hide');
                	
                	formSubmit();
                	
                }
                
                return false;
                
			});
			
			// 员工信息框点击关闭
			$('#closeSave').click(function(){
				
				
				$('#error').html('').css('display','none');
				
                $('#staffInfo').modal('hide');
			});
			
			// 员工信息框点击右上角X
			$('#closeX').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#staffInfo').modal('hide');
                
			});
			
			// 删除时确定按钮
			$('#doDel').click(function(){
				
                $('#delPrompt').modal('hide');
                
                delStaff();
                
			});
			
			// AJAX提交要保存的信息
	        var formSubmit = function() {
	        	
				$.ajax({
					
					type : 'POST',
					
					url : '/sysManager/savestaff',
					
					data : $('#staff').serializeArray(),
					
					dataType : 'JSON',
					
					async : false, 
					
					success: function(data) {
						
						var ecode = data.ecode;
						
						var emsg = data.emsg;
						
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							
							$('#errorMsg').html(emsg); // 错误信息显示
							
							$("#errorModal").modal('show');
							
						} else {
							
							// 清空表单
							$('#staff')[0].reset();
							
							var pIndex = GetQueryString("pIndex");
							
							var parameters = getQueryParameters(pIndex);
							
							// 刷新页面
							window.location.href='/sysManager/stafflist?' + parameters;

						}
						
					},
					
					error: function(e) { 
						
						if (e.responseText=='norole') {
        					
        					window.location.href='/norole';
        					
        				}else {
        					
        					$('#staffInfo').modal('show');
    						
    						$('#error').show(); // 错误信息显示
    						
        				}
						
					} 
					
				});
				
        	};
        	
        	// AJAX删除员工
        	var delStaff = function (){
        		
        		var id = $('input[name="delStaffId"]').val();
        		
        		$.ajax({
        			
        			type : 'POST',
        			
        			url : '/sysManager/delstaff',
        			
        			data : 'staffId='+id,
        			
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
        					window.location.href='/sysManager/stafflist?' + parameters;
        					
        				}
        				
        			},
        			
        			error: function(e) { 
        				
        				if (e.responseText=='norole') {
        					
        					window.location.href='/norole';
        					
        				}else {
        					
        					$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
        					
        					$('#errorModal').modal('show');
        					
        				}
        				
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
		
		url : '/sysManager/getstaffinfo',
		
		data : 'staffId='+id,
		
		dataType : 'JSON',
		
		success: function(data) {
			
			var ecode = data.ecode;
			
			var emsg = data.emsg;
			
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				
				$('#errorMsg').html(emsg);
				
				$('#errorModal').modal('show'); // 显示错误
				
			} else {
				
				// 填充数据
				$('input[name="staffId"]').val(id);
				
				$('select[name="accountType"]').val(data.adata.accountType);
				
				$('select[name="departmentId"]').val(data.adata.departmentId);
				
				$('select[name="userRoleId"]').val(data.adata.userRoleId);
				
				$('input[name="staffName"]').val(data.adata.staffName);
				
				// $('input[name="passwd"]').val(data.adata.passwd);
				$('input[name="passwd"]').val("");
				
				$('input[name="passwd"]').attr('readonly',false);
				
				$('input[name="mobile"]').val(data.adata.mobile);
				
				$('input[name="idCard"]').val(data.adata.idCard);
				
				$('input[name="actualName"]').val(data.adata.actualName);
				
				$('#staffInfo').modal('show'); // 显示员工信息编辑框
				
			}
			
		},
		
		error: function(e) { 
			
			if (e.responseText=='norole') {
				
				window.location.href='/norole';
				
			}else {
				
				$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
				
				$('#errorModal').modal('show');
				
			}
			
		} 
		
	});
    
};

var toAddStaff = function(){
	
	$('#staff')[0].reset();// 清空表单
	
	$('#staffInfo').modal('show');
	
};

var doDelete = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应员工信息，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$('input[name="delStaffId"]').val(id);
	
	$('#delPrompt').modal('show');
	
};
