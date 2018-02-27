var comments = function () {
	
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
        	
            window.location.href='/comments/list?' + parameters;
            
        });

    }
	
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	
        	// 分页
        	handlePagination(pageNum);
        	
			// 员工信息框点击右上角X
			$('.closeX').click(function(){
				$('#error').html('').css('display','none');
				 $('#commentsInfo').modal('hide');
			});
			
        }
    
    };

}();

$(function(){
	$('.close').click(function(){
		$('#error').html('').css('display','none');
        $('#commentsInfo').modal('hide');
        $("#errorModal").modal('hide');
	});
	
})

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

 

var goDetail = function(id){
	$('#errorMsg').html(''); // 清空错误信息
	if (id == '') { // ID为空提示错误信息
		$('#errorMsg').html('未找到对应用户信息，请重新操作');
		$('#errorModal').modal('show');
		return;
	}
	$.ajax({
		type : 'POST',
		url : '/comments/commentsDetail',
		data : 'id='+id,
		dataType : 'JSON',
		success: function(data) {
			var ecode = data.ecode;
			var emsg = data.emsg;
			console.log(data);
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				$('#commentsInfo').modal('hide');
				$('#errorMsg').html(emsg);
				$('#errorModal').modal('show'); // 显示错误
			} else {
				var status ="";
				// 填充数据
				$('#cId').text(id);
				$('#ownerId').text(data.adata.ownerId);
				$('#type').text(data.adata.type);
				$('#author').text(data.adata.author);
				$('#aHeadPic').attr("src",(data.adata.pathPic + data.adata.aHeadPic));
				$('#content').text(data.adata.content);
				$('#replyNum').text(data.adata.replyNum);
				$('#praiseNum').text(data.adata.praiseNum);
				$('#offenseNum').text(data.adata.offenseNum);
				$('#createTime').text(data.adata.createTime);
				
				if(data.adata.status == 0){
					status ="提交";
				}else if(data.adata.status == 1){
					status ="审核中";
				}else if(data.adata.status == 2){
					status ="正常";
				}else if(data.adata.status == 3){
					status ="违规-自动";
				}else if(data.adata.status == 4){
					status ="违规-人工";
				}else if(data.adata.status == 5){
					status ="删除";
				}
				$('#status').text(status);
				$('#updateTime').text(data.adata.updateTime);
				$("#commentsInfo").modal('show');;
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

function toAddCandComments(id){
	$.ajax({
		type : 'POST',
		url : '/comments/addCandComments',
		data : 'id='+id,
		dataType : 'JSON',
		success: function(data) {
			var ecode = data.ecode;
			var emsg = data.emsg;
			console.log(data);
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				$('#commentsInfo').modal('hide');
				$('#errorMsg').html(emsg);
				$('#errorModal').modal('show'); // 显示错误
			} else {
				alert("添加成功");
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
}

	function isNullOrEmpty(val) {
		return (val == null || val == undefined || val == "" || val == "undefined");
	}
	
	//课程或者笔记或者文章详情页面
	function toDetailPage(type,ownerId){
		if(type == 0){
			//window.location.href="/article/articleDetail?id="+ownerId;
			//暂时没有文章详情
		}else if(type == 10){
			window.location.href="/bbs/queryNoteData?noteId="+ownerId;
		}else if(type == 20){
			window.location.href="/course/courseDetail?id="+ownerId;
		}
		
	}
	
	//添加评论页面
	function toAddComment(type,ownerId){
		window.location.href="/comments/toAddComments?type=" + type +"&ownerId=" + ownerId;
	}
	
	function deleteValidate(id){
		$("#delPrompt").modal("show");
		$("#commentId").val(id);
	}
	
	//删除评论
	function deleteComment(){
		
		$.ajax({
			type : 'POST',
			url : '/comments/deleteComments',
			data : {id:$("#commentId").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				console.log(data);
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					alert(emsg);
				} else {
					alert("删除成功");
					window.location.href='/comments/list';
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
	}
	
	function updateSortId(id){
		var sortId = $(".sortId_" + id).val();
		
		$.ajax({
			type : 'POST',
			url : '/comments/updateSortIdx',
			data : {id:id,sortId:sortId},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				console.log(data);
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					alert(emsg);
				} else {
					alert("修改成功");
					window.location.href='/comments/list';
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
		
	}
	
	function toUserDetail(id){
		window.location.href="/user/userDetail?id="+id;
	}
