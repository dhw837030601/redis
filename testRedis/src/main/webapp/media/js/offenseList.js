var OffenseList = {
	plateURL:{
		plateListUrl : function(parameters){
			return "/offense/offenseList"+parameters;
		}
		
	},
	//分页
    handlePagination : function(pageNum) {
        var pidx = OffenseList.GetQueryString("pIndex");
        if (pidx == null)
            pidx = 1;
        $('#pager').bootpag({
            total: pageNum,
            page: pidx,
            maxVisible: 6 
        }).on('page', function(event, num){
        	var parameters = OffenseList.getQueryParameters(num);
            window.location.href=OffenseList.plateURL.plateListUrl(parameters);
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
        var bbsPlateId = OffenseList.GetQueryString('bbsPlateId');// 板块
        var userId = OffenseList.GetQueryString('userId');// 是否推荐
        var startTime = OffenseList.GetQueryString('startTime');// 是否推荐
        var endTime = OffenseList.GetQueryString('endTime');// 是否推荐
        var paraStr = "?";
        if (pIndex == null || pIndex == "") pIndex = 1;
        	paraStr += "pIndex=" + pIndex;
      
        if (bbsPlateId != null && bbsPlateId != "-1"){
            paraStr += "&bbsPlateId=" + bbsPlateId;
        }
        if (userId != null && userId != "-1"){
            paraStr += "&userId=" + userId;
        }
        
        if (startTime != null && startTime != "-1"){
            paraStr += "&startTime=" + startTime;
        }
        if (endTime != null && endTime != "-1"){
            paraStr += "&endTime=" + endTime;
        }
        return paraStr;
	},
	// AJAX提交要保存的信息
    formSubmit:function(formId) {
    	var pIndex = OffenseList.GetQueryString("pIndex");
		$.ajax({
			type : 'POST',
			url : OffenseList.plateURL.savetUrl(1),
			data : $(formId).serializeArray(),
			dataType : 'JSON',
			async : false, 
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#error').html(emsg).css('display','block'); // 错误信息显示
					$('#add_All_show').modal('hide');
				} else {
					var parameters = OffenseList.getQueryParameters(pIndex);
		            window.location.href=OffenseList.plateURL.plateListUrl(parameters);
				}
			},
			error: function(e) { 
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#add_All_show').modal('show');
					$('#error').show(); // 错误信息显示
					$('#add_All_show').modal('hide');
				}
			} 
		});
	},
	//删除--显示弹出框
	doDelete : function(id){
		$('#errorMsg').html(''); // 清空错误信息
		if (id == '') { // ID为空提示错误信息
			$('#errorMsg').html('未找到对应角色信息，请重新操作');
			$('#errorModal').modal('show');
			return;
		}
		$('input[name="delUserRoleId"]').val(id);
		$('#delPrompt').modal('show');
	},
	//AJAX删除角色
	deleteDate : function (){
		var id = $('input[name="delUserRoleId"]').val();
		var pIndex = OffenseList.GetQueryString("pIndex");
		$.ajax({
			type : 'POST',
			url : OffenseList.plateURL.delUrl(id),
			data : {},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
					$('#add_All_show').modal('hide');
				} else {
					var parameters = OffenseList.getQueryParameters(pIndex);
		            window.location.href=OffenseList.plateURL.plateListUrl(parameters);
				}
			},
			error: function(e) {
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
					$('#errorModal').modal('show');
					$('#add_All_show').modal('hide');
				}
			} 
		});
	},
	// 通过Id获得JavaBean
	gotModel : function(id){
		$('#errorMsg').html(''); // 清空错误信息
		if (id == '') { // ID为空提示错误信息
			$('#errorMsg').html('未找到对应角色信息，请重新操作');
			$('#errorModal').modal('show');
			return;
		}
		$.ajax({
			type : 'POST',
			url : OffenseList.plateURL.getUrl(id),
			data : {},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 填充数据
					$('input[name="pubId"]').val(id);
					$('input[name="bbsPlateId"]').val(data.adata.bbsPlateId);
					$('input[name="managerId"]').val(data.adata.managerId);
					$('input[name="userId"]').val(data.adata.userId);
					$('textarea[name="reason"]').val(data.adata.reason);
					$('input[name="startTime"]').val(data.adata.startTime);
					$('input[name="endTime"]').val(data.adata.endTime);
					$('#add_All_show').modal('show'); // 显示角色信息编辑框
				}
			},
			error: function(e) {
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
					$('#errorModal').modal('show');
					$('#add_All_show').modal('hide');
				}
			} 
		});
	},
	//添加
	toAddAll:function(formId,divId){
		$(formId)[0].reset();
		$(divId).modal('show');
	},
	timeFormat : function(){
		var timeFormat ={
			format: 'yyyy-mm-dd hh:ii:ss',
			language : 'zh-CN',
			minuteStep:2,
		};
		$( "#query_startTime" ).datetimepicker(timeFormat);
		$('#query_endTime').datetimepicker(timeFormat);
		$( "#startTime" ).datetimepicker(timeFormat);
		$('#endTime').datetimepicker(timeFormat);
	},
    init: function (pageNum) {
    	OffenseList.handlePagination(pageNum);
    	OffenseList.timeFormat();
        $('#add_form').validate({
            errorElement: 'span', // 错误提示的标签
            errorClass: 'help-block', // 错误提示的样式
            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
            // 要验证的信息
            rules: {
            	bbsPlateId: {
            		required: true,
            		maxlength: 8
                },
                userId: {
                    required: true,
                    maxlength: 8
                },
                managerId: {
            		required: true,
            		maxlength: 8
                },
                reason: {
                    required: true,
                    maxlength: 50
                },
                startTime:{
                	 required: true,
                	 date:true,
                },
                endTime:{
                	 required: true,
                	 date:true,
                }
            },
            messages: {
            	bbsPlateId: {
            		required: "板块ID必选",
            		number: $.format("板块ID最大长度:{0}")
                },
                userId: {
            		required: "用户Id必填",
            		maxlength: $.format("用户Id最大长度:{0}")
                },
                managerId: {
            		required: "实行该禁言的管理员ID必选",
            		number: $.format("实行该禁言的管理员ID最大长度:{0}")
                },
                reason: {
            		required: "禁言理由必填",
            		maxlength: $.format("禁言理由最大长度:{0}")
                },
                startTime:{
                	required: "禁言开始时间必须选择！",
                	date: "禁言结束时间必须选择！",
                	
                },
                endTime:{
                	required: "禁言结束时间必须选择！",
                	date: "禁言结束时间必须选择！",
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
    	
    	// 点击操作的添加按钮
		$('#add_a').click(function(){
			OffenseList.toAddAll('#add_form','#add_All_show')
		});
		
		// 关闭添加修改弹层
		$('#closeSave,#closeX').click(function(){
			$('#error').html('').css('display','none');
            $('#add_All_show').modal('hide');
		});
		
		// 保存
		$('#save').click(function(){
			if ($('#add_form').validate().form()) {
				OffenseList.formSubmit("#add_form");
			}
			return false;
		});
		
		// 删除时确定按钮
		$('#doDel').click(function(){
            $('#delPrompt').modal('hide');
            OffenseList.deleteDate();
		});
    }
};




