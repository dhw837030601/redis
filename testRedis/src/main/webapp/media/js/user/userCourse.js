var userCourse = function () {
	
	// 分页
	var handlePagination = function(pageNum) {
        
        var pIndex = $("#pIndex").val();
       
        if (pIndex == null){
        	
        	pIndex = 1;
        
        }
            
        $('#pager').bootpag({
        	
            total: pageNum,
            
            page: pIndex,
            
            maxVisible: 6 
            
            
        }).on('page', function(event, num){
        	
        	var parameters = getQueryParameters(num);
        	var id = $("#userId").val();
        	var type = 6;
            window.location.href='/user/userPublish?id=' +id  +"&type=" + type + "&" + parameters;
            
        });

    }
	
	/* var goDetail = function goDetail(id){
			$('#errorMsg').html(''); // 清空错误信息
			if (id == '') { // ID为空提示错误信息
				$('#errorMsg').html('未找到对应课程信息，请重新操作');
				$('#errorModal').modal('show');
				return;
			}
			top.location.href ="/course/courseDetail?id="+ id ;
		};*/
	
    return {
        init: function (pageNum) {
        	// 分页
        	handlePagination(pageNum);
			
			if (jQuery().datepicker) {
                $('.date-picker').datepicker();
            }
            App.initFancybox();
        }
    };

}();

$(function(){
	$('.close').click(function(){
		$('#error').html('').css('display','none');
        $('#userInfo').modal('hide');
        $("#updateUser").modal('hide');
        $("#addUser").modal('hide');
        $("#errorModal").modal('hide');
        $('#change_good_show').modal('hide');
        $('#change_status_show').modal('hide');
	});
	
	// 修改状态
	$(".saveStatus").click(function(){
		$.ajax({
			type : 'POST',
			url : '/fansMsg/updateStatus',
			data : {fansId:$("#fansIdUpdate").val(),status:$("#status_update").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("id");
					var parameters = getQueryParameters(pIndex);
					
					// 刷新页面
					window.location.href="/user/userPublish?id=" + $("#userId").val() + "&type=6";
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
	});
	
	// 修改技术级别
	$(".saveTeachLevel").click(function(){
		$.ajax({
			type : 'POST',
			url : '/fansMsg/updateTeachLevel',
			data : {fansId:$("#fansIdUpdate").val(),techLevel:$("#techLevel_update").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("id");
//					var parameters = getQueryParameters(pIndex);
					// 刷新页面
					window.location.href="/user/userPublish?id=" + $("#userId").val() + "&type=6"
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
	});
	
	// 修改教练级别
	$(".saveCoachLevel").click(function(){
		$.ajax({
			type : 'POST',
			url : '/fansMsg/updateCoachLevel',
			data : {fansId:$("#fansIdUpdate").val(),coachLevel:$("#coachLevel_update").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("id");
//					var parameters = getQueryParameters(pIndex);
					// 刷新页面
					window.location.href="/user/userPublish?id=" + $("#userId").val() + "&type=6"
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
	});
	
	// 修改职务
	$(".saveTitle").click(function(){
		$.ajax({
			type : 'POST',
			url : '/fansMsg/updateTitle',
			data : {fansId:$("#fansIdUpdate").val(),title:$("#title_update").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("id");
//					var parameters = getQueryParameters(pIndex);
					// 刷新页面
					window.location.href="/user/userPublish?id=" + $("#userId").val() + "&type=6"
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
	});
	
	// 修改职务
	$(".saveRole").click(function(){
		$.ajax({
			type : 'POST',
			url : '/fansMsg/updateRole',
			data : {fansId:$("#fansIdUpdate").val(),roleId:$("#role_update").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("id");
//					var parameters = getQueryParameters(pIndex);
					// 刷新页面
					window.location.href="/user/userPublish?id=" + $("#userId").val() + "&type=6"
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
	});
	
});

/*更改状态*/
var upStatus = function(id){
	$("#fansIdUpdate").val(id);
	$('#change_status_show').modal('show');
};

/*更改技术级别*/
var upTechLevel = function(id){
	$("#fansIdUpdate").val(id);
	$('#change_techLevel_show').modal('show');
};

/*更改教练级别*/
var upCoachLevel = function(id){
	$("#fansIdUpdate").val(id);
	$('#change_coachLevel_show').modal('show');
};
/*更改职务*/
var upTitle = function(id){
	$("#fansIdUpdate").val(id);
	$('#change_title_show').modal('show');
};
/*更改角色*/
var upRoleId = function(id){
	$("#fansIdUpdate").val(id);
	$('#change_role_show').modal('show');
};



  function GetQueryString (name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
 function getQueryParameters (pIndex){
		
		var mobile = GetQueryString('mobile');// 手机号
    	
        var nickName = GetQueryString('nickName');// 昵称
        
        var gendar = GetQueryString('gendar');// 性别
        
        var regTime = GetQueryString('regTime');// 注册时间
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (mobile != null && mobile != ""){
        	
            paraStr += "&mobile=" + mobile;
        
        }
        
        if (nickName != null && nickName != "-1"){
        	
            paraStr += "&nickName=" + nickName;
        
        }
        
        if (gendar != null && gendar != ""){
        	
            paraStr += "&gendar=" + gendar;
            
        }
        if (regTime != null && regTime != ""){
        	
        	paraStr += "&regTime=" + regTime;	
        	
        }
        
        return paraStr;
		
	}
 
	function isNullOrEmpty(val) {
		return (val == null || val == undefined || val == "" || val == "undefined");
	}