var privRole = function () {
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
            window.location.href='/sysManager/privRolelist?pIndex='+num;
        });
    }
	var GetQueryString = function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
	}
    return {
        init: function (pageNum) {
        	// 分页
        	handlePagination(pageNum);
        	// 角色信息框点击保存
    		$('#save').click(function(){
                if ($('#privRole').validate().form()) {
                	PrivRole.formSubmit();
                }
    		});
    		
    		// 删除时确定按钮
    		$('#doDel').click(function(){
                $('#delPrompt').modal('hide');
                PrivRole.delPrivRole();
    		});
    		
    		
    		// 角色信息框点击关闭
    		$('#closeSave,#closeX').click(function(){
    			$('#error').html('').css('display','none');
                $('#privRoleInfo').modal('hide');
    		});
        	$('#privRole').validate({
	            errorElement: 'span', // 错误提示的标签
	            errorClass: 'help-block', // 错误提示的样式
	            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	            // 要验证的信息
	            rules: {
	            	roleType: {
	            		required: true,
	                    number: true
	                },
	                departmentId: {
	                    required: true,
	                    number: true
	                },
	                roleName: {
	                    required: true,
	                    maxlength: 15
	                },
	                remark: {
	                    required: false,
	                    maxlength: 50
	                }
	            },

	            // 错误提示信息
	            messages: {
	            	roleType: {
	            		required: "角色类型必选",
	            		number: "请选择正确的角色类型"
	                },
	                departmentId: {
	            		required: "所属部门必选",
	            		number: "请选择正确的所属部门"
	                },
	                roleName: {
	            		required: "角色名称必填",
	            		maxlength: $.format("角色名称最大长度:{0}")
	                },
	                remark: {
	            		required: "备注",
	            		maxlength: $.format("备注最大长度:{0}")
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
        }
    };
}();

var PrivRole = {
	URL:{
		privRoleList : function(parameters){//角色列表
			return "/sysManager/privRolelist"+parameters;
		},
		savetUrl : function(){//添加或更新
			return "/sysManager/savePrivRole";
		},
		getUrl : function(){//获取
			return "/sysManager/getPrivRoleinfo";
		},
		delUrl : function(){//删除
			return "/sysManager/delPrivRole";
		},
		getRole:function(parameters){//权限分配
			return "/sysManager/getrole"+parameters;
		},
	},
	
	//修改
	goUpdate:function(id){
		$('#errorMsg').html(''); // 清空错误信息
		if (id == '') { // ID为空提示错误信息
			$('#errorMsg').html('未找到对应角色信息，请重新操作');
			$('#errorModal').modal('show');
			return;
		}
		$.ajax({
			type : 'POST',
			url : PrivRole.URL.getUrl(),
			data : {'privRoleId':id},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 填充数据
					$('input[name="privRoleId"]').val(id);
					$('select[name="roleType"]').val(data.adata.roleType);
					$('select[name="departmentId"]').val(data.adata.departmentId);
					$('input[name="roleName"]').val(data.adata.roleName);
					$('input[name="remark"]').val(data.adata.remark);
					$('#privRoleInfo').modal('show'); // 显示角色信息编辑框
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
	},
	//添加或修改提交
    formSubmit:function() {
		$.ajax({
			type : 'POST',
			url : PrivRole.URL.savetUrl(),//'/sysManager/savePrivRole',
			data : $('#privRole').serializeArray(),
			dataType : 'JSON',
			async : false, 
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#error').html(emsg).css('display','block'); // 错误信息显示
				} else {
					location.reload();
				}
			},
			error: function(e) { 
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#privRoleInfo').modal('show');
					$('#error').show(); // 错误信息显示
				}
			} 
		});
	},
	
	
	//删除
	doDelete:function(id){
		$('#errorMsg').html(''); // 清空错误信息
		if (id == '') { // ID为空提示错误信息
			$('#errorMsg').html('未找到对应角色信息，请重新操作');
			$('#errorModal').modal('show');
			return;
		}
		$('input[name="delPrivRoleId"]').val(id);
		$('#delPrompt').modal('show');
	},
	delPrivRole:function (){
		var id = $('input[name="delPrivRoleId"]').val();
		$.ajax({
			type : 'POST',
			url : PrivRole.URL.delUrl(),//'/sysManager/delPrivRole',
			data : {'privRoleId':id},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					window.location.href='/sysManager/privRolelist';
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
	},
	
	
	//分配权限
	permissions:function(id){
		$('#errorMsg').html(''); // 清空错误信息
		if (id == '') { // ID为空提示错误信息
			$('#errorMsg').html('未找到对应角色信息，请重新操作');
			$('#errorModal').modal('show');
			return;
		}
		// 刷新页面
		var parm = "?privRoleId="+id;
		window.location.href=PrivRole.URL.getRole(parm);
	}
	
}
//添加
function toAddPrivRole(){
	// 清空表单
	$('#privRole')[0].reset();
	$('#privRoleInfo').modal('show');
}
