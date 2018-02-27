var roleManagement = function () {
	
	var selectAll = function(){
		
		// 父级菜单点击全选,反选全不选
		$('.parent').click(function(){
			
			var _childDirectoryClass = 'parent' + $(this).attr('id');
			
			if ($(this).is(':checked')) {
				
				$('.'+_childDirectoryClass).each(function(){
					
					$(this).parent().attr('class', 'checked');
					
				});
				
			}else {
				
				$('.'+_childDirectoryClass).each(function(){
					
					$(this).parent().removeAttr('class', 'checked');
                  
				});
				
			}
			  
		});
		
		
		$('.child').click(function(){
			
			// 子级菜单点击全选，反选全不选
			var _childActionClass = 'child' + $(this).attr('id');
			
			if ($(this).is(':checked')) {
				
				$('.'+_childActionClass).each(function(){
					
					$(this).parent().attr('class', 'checked');
					
				});
				
			}else {
				
				$('.'+_childActionClass).each(function(){
					
					$(this).parent().removeAttr('class','checked');
                  
				});
				
			}
			
			//父级菜单Id
			var parentDirectoryId = $(this).attr('parentId');
			
			var _childDirectoryClass = 'parent'+parentDirectoryId;
			
			var pischeck = 0;
			
			$('.'+_childDirectoryClass).each(function(){
				
				if ($(this).parent().attr('class') == 'checked') {
					
					pischeck ++;
					
				}
				
			});
			
			if (pischeck == $('.'+_childDirectoryClass).size()) {
				
				$('#'+parentDirectoryId).parent().attr('class', 'checked');
				
			}
			
			if (pischeck == 0) {
				
				$('#'+parentDirectoryId).parent().removeAttr('class', 'checked');
				
			}
			
		});
		
	}
	
	var selectCheck = function(){
		
		// action选项选中时更新自己菜单选中状态
		$(".action").click(function(){
			
			var _inputActionAll = $(this).parent().parent().parent().parent().find("input");
			
			var ischeck = 0;
			
			var childDirctoryId = 0;
			
			//action 的 checkbox检查选中状态
			_inputActionAll.each(function(){
				
				if ($(this).parent().attr('class') == 'checked') {
					
					ischeck ++;
					
				}
				
			});
				
			// 所属子级菜单Id
			childDirctoryId = $(this).attr('parentId');
			
			// action全部选中
			if (ischeck == _inputActionAll.size()) {
				
				$('#'+childDirctoryId).parent().attr('class', 'checked');
				
			}
			
			// action全不选
			if (ischeck == 0) {
				
				$('#'+childDirctoryId).parent().removeAttr('class', 'checked');
				
			}
				
			//父级菜单Id
			var parentderictoryId = $('#'+childDirctoryId).attr('parentId');
			
			var pischeck = 0;
			
			$('input[parentId='+parentderictoryId+']').each(function(){
				
				if ($(this).parent().attr('class') == 'checked') {
					
					pischeck ++;
					
				}
				
			});
			

			if (pischeck == $('input[parentId='+parentderictoryId+']').size()) {
				
				$('#'+parentderictoryId).parent().attr('class', 'checked');
				
			}
			
			if (pischeck == 0) {
				
				$('#'+parentderictoryId).parent().removeAttr('class', 'checked');
				
			}
			
		});
		
	}
	
	return {
		
		init: function () {
			
			selectAll();
			
			selectCheck();
			
			$('#save').click(function(){
				
				$('#errorMsg').html(''); // 清空错误信息
				
				var id = $('#userRoleId').val();
				
				if (id == '') { // ID为空提示错误信息
					
					$('#savePrompt').modal('hide');
					
					$('#errorMsg').html('未找到对应信息，请重新操作');
					
					$('#errorModal').modal('show');
					
					return;
					
				}
				
				// 所勾选的目录id
				var directory = [];
				
				$('.parent').each(function(){
					
					if($(this).parent().attr('class') == 'checked'){
						
						directory.push($(this).attr("id"));
						
					}
					
				});
				
				$('.child').each(function(){
					
					if($(this).parent().attr('class') == 'checked'){
						
						directory.push($(this).attr("id"));
						
					}
					
				});
				
				// 所勾选action的Id
				var action = [];
				
				$('.action').each(function(){
					
					if($(this).parent().attr('class') == 'checked'){
						
						action.push($(this).attr("id"));
						
					}
					
				});
				
				if (directory.length == 0 || action.length == 0) {
					
					$('#savePrompt').modal('hide');
					
					$('#errorMsg').html('请选择好权限后再保存！');
					
					$('#errorModal').modal('show');
					
					return;
					
				}
				
				$.ajax({
					
					type : 'POST',
					
					url : '/sysManager/savemgmtrole',
					
					data : 'userRoleId='+id+'&directoryIds='+directory+'&actionIds='+action,
					
					dataType : 'JSON',
					
					async : false, 
					
					success: function(data) {
						
						var ecode = data.ecode;
						
						var emsg = data.emsg;
						
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							
							$('#savePrompt').modal('hide');
							
							$('#errorMsg').html(emsg);
							
							$('#errorModal').modal('show');
							
							return;
							
						} else {
							
							window.location.reload();//刷新当前页面.

						}
						
					},
					
					error: function(e) { 
						
						$('#savePrompt').modal('hide');
						
						$('#errorMsg').html('保存失败！');
						
						$('#errorModal').modal('show');
						
						return;
						
					} 
					
				});
				
			});
			
		}
		
	};
	
}();

var toSaveRole = function(){
	
	$('#savePrompt').modal('show');
	
};

