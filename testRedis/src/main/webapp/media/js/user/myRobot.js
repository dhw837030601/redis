var MyRobot = {
	URL:{
		queryMyRobot:function(parameters){
			return "/user/myRobot"+parameters;
		},
		userDetail:function(parameters){
			return "/user/userDetail"+parameters;
		},
		updateUser:function(){
			return '/user/updateUser';
		},
		deleteUser:function(){
			return '/user/deleteUser';
		},
		saveNotification:function(){
			return '/userNotification/saveNotification';
		},
		queryUser:function(parameters){
			return '/user/queryUser'+parameters;
		}
	},
	handlePagination:function(pageNum) {
		var pIndex = MyRobot.GetQueryString("pIndex");
		if (pIndex == null){
        	pIndex = 1;
		}
		$('#pager').bootpag({
        	total: pageNum,
            page: pIndex,
            maxVisible: 6 
        }).on('page', function(event, num){
        	var parameters = MyRobot.getQueryParameters(num);
        	window.location.href=MyRobot.URL.queryMyRobot(parameters);
        });
	},
	getQueryParameters:function(pIndex){
		var mobile = MyRobot.GetQueryString('mobile');// 手机号
		var nickName = MyRobot.GetQueryString('nickName');// 昵称
		var gendar = MyRobot.GetQueryString('gendar');// 性别
		var startRegTime = MyRobot.GetQueryString('startRegTime');// 注册开始时间
		var endRegTime = MyRobot.GetQueryString('endRegTime');// 注册结束时间
		var staffIdQuery = MyRobot.GetQueryString('staffIdQuery');// 是否是机器人
		var status = MyRobot.GetQueryString('status');//  用户状态
		
		var paraStr="?"
		if (pIndex == null || pIndex == "") {
			pIndex = 1;
		}
		paraStr += "pIndex=" + pIndex;
		if (mobile != null && mobile != ""){
			paraStr += "&mobile=" + mobile;
		}
		if (nickName != null && nickName != "-1"){
			paraStr += "&nickName=" + nickName;
		}
		if (gendar != null && gendar != ""){
			paraStr += "&gendar=" + gendar;
		}
		if (startRegTime != null && startRegTime != ""){
			paraStr += "&startRegTime=" + startRegTime;	
		}
		if (endRegTime != null && endRegTime != ""){
			paraStr += "&endRegTime=" + endRegTime;	
		}
		if (staffIdQuery != null && staffIdQuery != ""){
			paraStr += "&staffIdQuery=" + staffIdQuery;	
		}
		if(status != null && status != ""){
			parsStr += "&status="+status;
		}
		return paraStr;
	},
	GetQueryString:function(name){
		var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
		var r = window.location.search.substr(1).match(reg);
		if(r!=null) return decodeURIComponent(r[2]); return null;
	},
	//用户详情
	userDetail:function(id){
		var parameters = "?id=" + id;
		window.location.href=MyRobot.URL.userDetail(parameters);
	},
	//修改用户状态
	updateUserStatus:function(id){
		$("#updateId").val(id);
		$('#updateUserStatus').modal('show');
	},
	doUpdateStatus:function(){
		var updateId = $("#updateId").val();
		var status = $("#updateStatus").val();
		$.ajax({
			type : 'POST',
			url : MyRobot.URL.updateUser(),
			data : {"id": updateId,"status":status},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#updateUserStatus').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 刷新页面
					location.reload();
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
	//修改用户状态结束
	
	//删除用户
	doDelete:function(id){
		$('#errorMsg').html(''); // 清空错误信息
		if (id == '') { // ID为空提示错误信息
			$('#errorMsg').html('未找到对应员工信息，请重新操作');
			$('#errorModal').modal('show');
			return;
		}
		$('input[name="delUserId"]').val(id);
		$('#delPrompt').modal('show');
	},
	delUser:function(){
		var id = $('input[name="delUserId"]').val();
		$.ajax({
			type : 'POST',
			url : MyRobot.URL.deleteUser(),
			data : 'id='+id,
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 刷新页面
					location.reload();
				}
			},
			error: function(e) { 
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
					$('#errorModal').modal('show');
				}
			} 
		});
	},
	//删除用户结束
	
	//修改开始
	doUpdata : function(id){
		var dis = "myRobot";
		var parameters = "?userId="+id+"&dis="+dis;
		window.location.href= MyRobot.URL.queryUser(parameters);
	},
	//修改用户结束
	
	//发送消息开始
	checkAll:function(){
		 //选择
        $(".checkAll").click(function(){
        	$("input[name=distriSelect]").each(function(){
        		//[0]取js对象
        		console.log($(this)[0]);
        		var _this = $(this)[0].checked;
        		if(_this){
        			$(this)[0].checked=false;
        		} else{
        			$(this)[0].checked=true;
        		}
        	});
        });
	},
	sendMessage:function(){
		if(MyRobot.checkboxIsSelect()==1){
			alert("没有选中的要发送消息的用户");
			return;
		}
		$('#addNotification')[0].reset();// 清空表单
		$('#editNotification').modal('show');
	},
	checkboxIsSelect:function(){
		var distriSelect=document.getElementsByName("distriSelect");
		for(var i=0;i<distriSelect.length;i++){
			if(distriSelect[i].checked==true){
				return 0;
			}
		}
		return 1;
	},
	addNotification:function(){
		var  userids=new Array();
		$("input[name='distriSelect']:checked").each(function(i){
			var str=this.id;
			userids[i]=str.substring(5,str.length);
		});

		var esUserId = $("#esUserId").val();
		$("#erUserId").val(userids.join(','));
		var econtent = $("#econtent").val().trim();
		if(isNullOrEmpty(esUserId)){
			$("#sUserIdError").text("发送人不能为空！");
			return;
		}
		
		if(isNullOrEmpty(econtent)){
			$("#contentError").text("消息不能为空！");
			return;
		}
		$.ajax({
			type : 'POST',
			url : MyRobot.URL.saveNotification(),
			data : $('#addNotification').serializeArray(),
			dataType : 'JSON',
			async : false, 
			success: function(data) {
				console.log(data);
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#editNotification').modal('hide');
					$("#errorMsg").text(data.emsg);
					$('#errorModal').modal('show'); // 错误信息显示
				} else {
					location.reload();
				}
			},
			error: function(e) { 
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#editNotification').modal('hide');
					$("#errorMsg").text("操作过程中遇到未知错误，请重新操作");
					$('#errorModal').modal('show'); // 错误信息显示
				}
			} 
		});
	},
	//发送消息结束
	
	init:function (pageNum) {
		// 分页
		MyRobot.handlePagination(pageNum);
		MyRobot.checkAll();
		
		// 员工信息框点击右上角X
		$('.closeX,.close').click(function(){
			$('#error').html('').css('display','none');
			$("#errorModal").modal('hide');
            $("#updateUserStatus").modal('hide');
            $("#editNotification").modal('hide');
            $("#allotUser").modal('hide');
		});
		
		if (jQuery().datepicker) {
            $('.date-picker').datepicker();
        }
        App.initFancybox();
	}
}

function isNullOrEmpty(val) {
	return (val == null || val == undefined || val == "" || val == "undefined");
}
