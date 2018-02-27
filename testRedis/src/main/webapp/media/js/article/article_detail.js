$(function() {
	objname = $("#objname_hidden").val();
	if (objname == null || objname == '') {
		$("#objname_hidden").val('0');
		$("#summaryInfo_frame0").addClass("tab-pane active");
		$("#summaryInfo_frame0").load("/article/articleInfo?id=" + $("#articleId").val());
	} else {
		$("#summaryInfo_frame" + objname + "").removeClass();
		$("#summaryInfo_frame" + objname + "").addClass("tab-pane active");
		SelIt(objname);
	}
	
});

function SelIt(objname,id) {
	if (objname == '0') {
		setActive('文章详情',0,"/article/articleInfo?id=" + $("#articleId").val() + "&from=1" )
	}else if (objname == '6') {
		setActive('文章评论',6,"/comments/comDetailList?ownerId=" + $("#articleId").val() +"&ownerType=0")
	}else if (objname == '3') {
		setActive('文章内容',3,"/article/articleContent?id=" + $("#articleId").val())
	}else if (objname == '9') { // 0是文章
		setActive('审核',9,"/article/auditListByIdAndType?aId=" + $("#articleId").val() +  "&type=0")
	}else if (objname == '12') { //  在category_map_tbl表中  type == 0 代表的就是文章
		setActive('分类',12,"/category/getCategory?ownerId=" + $("#articleId").val() +  "&type=0")
	}  
}
function  setActive(titleStr,index,utlStr){
	var title = "";
	detail_title = title + titleStr;
	$("#objname_hidden").val(index);
	$("#summaryInfo_frame"+index).get(0).src=utlStr;
}
// 弹出是否删除文章的窗口
var doDelete = function(id){
	$('#errorMsg').html(''); // 清空错误信息
	if (id == '') { // ID为空提示错误信息
		$('#errorMsg').html('未找到对应课程信息，请重新操作');
		$('#errorModal').modal('show');
		return;
	}
	$('input[name="delArticleId"]').val(id);
	$('#delPrompt').modal('show');
};

//AJAX删除文章
function delArticle(){
	$('#delPrompt').modal('hide');
	var id = $('input[name="delArticleId"]').val();
	$.ajax({
		type : 'POST',
		url : '/article/doUpdateStatus',
		data : {"articleId":id,"status":50},
		dataType : 'JSON',
		success: function(data) {
			var ecode = data.ecode;
			var emsg = data.emsg;
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				$('#delPrompt').modal('hide');
				$('#errorMsg').html(emsg);
				$('#errorModal').modal('show'); // 显示错误
			} else {
				// 刷新页面
				window.location.href='/article/articleDetail?articleId=' + id;
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
