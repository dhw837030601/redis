var ArticleData ={
	articleURL:{
		// 展示文章列表
		articleListUrl : function(){
			return "/article/list";
		},
		// 查找文章  修改文章内容的回显
		getUrl : function(parm){
			return "/article/editArticle"+parm;
		},
		// 删除文章
		delUrl : function(parameters){
			return "/article/doUpdateStatus";
		},
		// 更新文章状态
		updatestatus:function(parameters){
			return "/article/doUpdateStatus";
		},
		// 更新是否精选
		updateIsGood:function(parameters){
			return "/article/doUpdateIsGood";
		},
		// 刷新页面  查询文章详情
		articleData:function(parameters){
			return "/article/articleInfo?id="+parameters;
		},
		childNoteData:function(parameters){
			return "/bbs/queryChildNote?noteId="+parameters;
		},
		toChickNote:function(parameters){
			return "/bbs/chickNoteContent?noteId="+parameters;
		},
		makeTemplate:function(){
			return "/bbs/makeTemplate";
		},
		queryTemplates:function(){
			return "/bbs/templates";
		},
		goStaticHtml:function(pId){
			return noteAddress+"static/"+pId;
		},
		goComment:function(parameters){
			return "/comments/list"+parameters;
		},
		goOffense:function(parameters){
			return "/comments/list"+parameters;
		}
	},
	//去评论
	goComment:function(id){
		var parameters = "?noteId="+id;
		window.location.href=NoteData.noteURL.goComment(parameters);
	},
	//去举报
	goOffense:function(id){
		alert("暂时不支持，没有举报管理！");
		return;
		var parameters = "?noteId="+id;
		window.location.href=NoteData.noteURL.goOffense(parameters);
	},
	//分页
	handlePagination : function(pageNum) {
        var pidx = NoteData.GetQueryString("pIndex");
        if (pidx == null)
            pidx = 1;
        $('#pager').bootpag({
            total: pageNum,
            page: pidx,
            maxVisible: 5
        }).on('page', function(event, num){
        	var parameters = NoteData.getQueryParameters(num);
            window.location.href=NoteData.noteURL.noteData(parameters);
        });
    },
	DelArticle:function(status){
		$.ajax({
			type : 'POST',
			url : ArticleData.articleURL.delUrl($("#articleId").val()),
			data : {"articleId":$("#articleId").val(),"status":status},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					window.location.href=ArticleData.articleURL.articleData($("#articleId").val());
		           // window.location.href=ArticleData.articleURL.articleListUrl();
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
		//window.location.href=ArticleData.articleURL.delUrl($("#articleId").val());
	},
	GetQueryString : function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
   },
   // 更新文章
   QueryArticle:function(){
		var parm="?articleId="+$("#articleId").val() + "&from=2"; 
		window.parent.location.href=ArticleData.articleURL.getUrl(parm);
	},
	// 更新文章内容
	QueryArticleContent:function(){
		var parm="?articleId="+$("#articleId").val() + "&from=1";
		window.parent.location.href=ArticleData.articleURL.getUrl(parm);
	},
   //封装参数
   getQueryParameters : function(pIndex){
	   var noteId = $("#noteId").val();
       if (pIndex == null || pIndex == "") pIndex = 1;
       noteId += "&pIndex=" + pIndex;
       return noteId;
	},
	
	changeGood:function(id){
		$.ajax({
			type : 'POST',
			url : ArticleData.articleURL.updateIsGood(id),
			data : {"articleId":$("#articleId").val(),"isGood":$("#isGood_update").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
		            window.location.href=ArticleData.articleURL.articleData($("#articleId").val());
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
	changeState:function(id){
		$.ajax({
			type : 'POST',
			url : ArticleData.articleURL.updatestatus(id),
			data : {"articleId":$("#articleId").val(),"status":$("#status_update").val()},
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					
		            window.location.href=ArticleData.articleURL.articleData($("#articleId").val());
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
	isGood:function(){
		$('#change_good_show').modal('show');
	},
	gotstatus:function(){
		$('#change_status_show').modal('show');
	},
	closeModel:function(){
		$('.closeSave,.closeX').click(function(){
			$('#error').html('').css('display','none');
			$('#change_status_show').modal('hide');
			$('#change_good_show').modal('hide');
			$('#templates_show').modal('hide');
		});
	},
	packagingHtml:function(array){
		var picAdd = $("#picAdd").val();
		var htmlCont = "";
		for(var o in array){  
			
			
			var media = array[o].media;
			var cover = array[o].cover;
			var type = array[o].type;
			var content = array[o].content;
			if(content == null || content == undefined){
				content = "";
			}
			
			htmlCont +=' <li class="content_l">';
			
			if(type == "video"){
				htmlCont +=' 	<span>'+content +'</span><br>';
				htmlCont +=' 	<img src="'+ picAdd+cover +'"/>';
				
			}else if (type != "video" && media != null && media != undefined) {
				htmlCont +=' 	<span>'+content +'</span><br>';
				htmlCont +=' 	<img src="'+ picAdd+media +'"/>';
				
			}else {
				htmlCont +=' 	<img class="hide" src=""/><br>';
				htmlCont +=' 	<span>'+content+'</span>';
			}
			
			htmlCont +=' </li>';
		}
		$("#content_ul").html(htmlCont);
		$('#add_content_show').modal('hide');
	},
	showHtml:function(){
		var str = $("textarea[name='content']").val();
		if(str == null || str == "" || str == undefined){
			return;
		}
		try{
			var array = JSON.parse(str);
			ArticleData.packagingHtml(array);
		} catch (e) {}
	},
	//显示模板弹出层
	showTemplatesHtml:function(){
		$('#error').html('').css('display','none');
		$('#change_status_show').modal('hide');
		$('#change_good_show').modal('hide');
		NoteData.queryTemplates();//查找模板
	},
	
	addTemplateHtml:function(templateStr){
		var html = "";
		if(templateStr == null || templateStr == undefined || templateStr.length<5){
			html="<p>暂时没有模板！</p>"
		}else {
			var array = JSON.parse(templateStr)
			html = '<select id="templateId" name="template" class="small m-wrap" tabindex="1">';
			html += '	<option value="-1">--默认模板--</option>';
			for(var o in array){
				html += '	<option value="'+array[o].id+'">'+array[o].title+'</option>';
			}
			html += '</select>';
		}
		$("#state_template").html(html);
	},
	//查找模板
	queryTemplates:function(){
		var noteId = $("#noteId").val();
		$.ajax({
			type:"POST",
			url:NoteData.noteURL.queryTemplates(),
			data : {'noteId':noteId},
			dataType:"JSON",
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$("#add_content_show").modal('hide');
					$('.alert-error', $('.form-edit')).text(emsg).show();
				}else {
					var templateStr = data.adata.referer; 
					NoteData.addTemplateHtml(templateStr);
					$('#templates_show').modal('show');
				}
			},
			error: function(e) {
				$("#add_content_show").modal('hide');
				$('.alert-error', $('.form-edit')).text(e.status+":"+ e.statusText).show();
			}
		});
	},
	//生成静态文件
	makeTemplatesHtml:function(){
		var noteId = $("#noteId").val();
		$.ajax({
			type:"POST",
			url:NoteData.noteURL.makeTemplate(),
			data : {'noteId':noteId,'templateId':$("#templateId").val()},
			dataType:"JSON",
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$("#templates_show").modal('hide');
					$('.alert-error', $('.form-edit')).text(emsg).show();
				}else {
					alert("生成成功！");
					location.reload();
				}
			},
			error: function(e) {
				$("#templates_show").modal('hide');
				$('.alert-error', $('.form-edit')).text(e.status+":"+ e.statusText).show();
			}
		});
	},
	//查看原链接
	showStaticHtml:function(pId){
		var url = ArticleData.articleURL.goStaticHtml(pId);
		window.open (url, "newwindow", "height=800, width=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
	},
	
	init:function(){
		
		var noteType = $("#type").val();
		if(noteType == 1){
			$(".showChildNote").hide();
			$(".showContent").attr("colspan",6);
		}
		
		ArticleData.showHtml();
		ArticleData.closeModel();
	}
    
}
    