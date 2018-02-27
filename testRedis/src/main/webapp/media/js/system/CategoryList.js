var CategoryList ={
	categoryURL:{
		categoryListUrl : function(parameters){
			return "/category/categorylist"+parameters;
		},
		queryCategoryUrl : function(){
			return "/category/queryCategory";
		},
		updateOrInsertCategoryUrl : function(){
			return "/category/updateOrInsertCategory";
		},
		deleteCategoryUrl : function(){
			return "/category/deleteCategory";
		},
	},
	//分页
    handlePagination : function(pageNum) {
        var pidx = CategoryList.GetQueryString("pIndex");
        if (pidx == null)
            pidx = 1;
        $('#pager').bootpag({
            total: pageNum,
            page: pidx,
            maxVisible: 3
        }).on('page', function(event, num){
        	var parameters = CategoryList.getQueryParameters(num);
            window.location.href=CategoryList.categoryURL.categoryListUrl(parameters);
        });
    },
    //通过name属性获取input的value
    GetQueryString : function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    },
    //封装参数
    getQueryParameters : function(pIndex){
        var userId = CategoryList.GetQueryString('userId');// 板块
        var status = CategoryList.GetQueryString('status');// 状态
       
        var paraStr = "?";
        if (pIndex == null || pIndex == "") pIndex = 1;
        paraStr += "pIndex=" + pIndex;
        if (userId != null && userId != "-1" && userId !=""){
            paraStr += "&userId=" + userId;
        }
        if (status != null && status != "-1" && status !=""){
            paraStr += "&status=" + status;
        }
        return paraStr;
	},
	//显示修改的信息
	showData:function(categoryId){
		if(categoryId == -1){
			$('#categoryModal').modal('show');
			return ;
		}
		 //$("#add_f").serialize()
		$.ajax({
			type:"POST",
			url:CategoryList.categoryURL.queryCategoryUrl(),
			data :{"categoryId":categoryId},
			dataType:"JSON",
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$("#categoryModal").modal('hide');
					$('#errorModal').modal('show');
				}else {
					$('input[name="id"]').val(categoryId);
					$('input[name="name"]').val(data.adata.name);
					$('input[name="introduction"]').val(data.adata.introduction);
					$('input[name="sortIdx"]').val(data.adata.sortIdx);
					$('input[name="userId"]').val(data.adata.userId);
					$('select[name="status"]').val(data.adata.status);
					
					$("#categoryModal").modal('show');
				}
			},
			error: function(e) {
				$("#categoryModal").modal('hide');
				$('#errorModal').modal('show');
			}
		});
	},
	//修改或添加
	updateOrInsertData:function(){
		
		if ($('#categoryForm').validate().form()) {
			$("#categoryModal").modal('show');
			$.ajax({
				type:"POST",
				url:CategoryList.categoryURL.updateOrInsertCategoryUrl(),
				data :$("#categoryForm").serialize(),
				dataType:"JSON",
				success: function(data) {
					var ecode = data.ecode;
					var emsg = data.emsg;
					if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
						$("#categoryModal").modal('hide');
						$('#errorModal').modal('show');
					}else {
						window.location.href=CategoryList.categoryURL.categoryListUrl("");
					}
				},
				error: function(e) {
					$("#categoryModal").modal('hide');
					$('#errorModal').modal('show');
				}
			});
        }
        return false;
	},
	validate:function(){
		$('#categoryForm').validate({
	        errorElement: 'span', // 错误提示的标签
	        errorClass: 'help-block error', // 错误提示的样式
	        focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	        // 要验证的信息
	        rules: {
	        	name: {
	                required: true,
	                maxlength: 15
	            },
	            introduction: {
	                required: true,
	                maxlength: 15
	            },
	            sortIdx: {
	        		required: true,
	                number: true
	            }
	        },
	
	        // 错误提示信息
	        messages: {
	        	name: {
	        		required: '名称必选',
	        		maxlength: $.format('名称最大长度:{0}')
	            },
	            introduction: {
	        		required: '角色类型必选',
	        		maxlength: $.format('简介最大长度:{0}')
	            },
	            sortIdx: {
	        		required: '排序必选',
	        		number: '请填写数字'
	            },
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
	},
	toDelete:function(categoryId){
		$("#categoryModal").modal('hide');
		$("#delId").val(categoryId);
		$('#delPrompt').modal('show');
		
		//删除
		$(".doDelete").click(function(){
			CategoryList.doDelete(categoryId);
		});
		//取消
		$(".cancelDel").click(function(){
			$('#delPrompt').modal('hide');
		});
		
	},
	//删除
	doDelete:function(categoryId){
		$.ajax({
			type:"POST",
			url:CategoryList.categoryURL.deleteCategoryUrl(),
			data :{"categoryId":categoryId},
			dataType:"JSON",
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$("#categoryModal").modal('hide');
					$('#errorModal').modal('show');
				}else {
					window.location.href=CategoryList.categoryURL.categoryListUrl("");
				}
			},
			error: function(e) {
				$("#categoryModal").modal('hide');
				$('#errorModal').modal('show');
			}
		});
	},
	
	
	
	init: function (pageNum) {
		CategoryList.handlePagination(pageNum);
		CategoryList.validate();
		
		//显示错误
		$(".text-error").click(function(){
			$('#errorModal').modal('hide');
		});
		
		//添加或修改
		$(".addAndEditorc").click(function(){
			CategoryList.updateOrInsertData();
		});
		
		$(".close,#closeSave").click(function(){
			$('#errorModal').modal('hide');
			$('#categoryModal').modal('hide');
		});
		
		
    }
	
}