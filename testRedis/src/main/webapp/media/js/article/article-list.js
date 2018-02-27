var ArticleList = function () {
	
    var handlePagination = function(pageNum) {
        
        var pidx = GetQueryString("pIndex");
        if (pidx == null)
            pidx = 1;
        $('#pager').bootpag({
            total: pageNum,
            page: pidx,
            maxVisible: 6 
        }).on('page', function(event, num){
            var pstatus = GetQueryString("status");
            var author = $("#author").val();
            var recommender = $("#recommender").val();
            var ptype = GetQueryString("type");
            var isGood = GetQueryString("isGood");
            var sortType = GetQueryString("sortType");
            
            var articleid = GetQueryString("articleId");
            
            var paraStr = "pIndex=" +num;
            if (pstatus != null &&pstatus !="-1")
                paraStr += "&status=" + pstatus;
            if (ptype != null&&ptype !="-1")
                paraStr += "&type=" +ptype;
            if (author != null && author !="")
                paraStr += "&author=" +author;
            if (recommender != null && recommender !="")
                paraStr += "&recommender=" +recommender;
            if (isGood != null && isGood !="")
                paraStr += "&isGood=" +isGood;
            if (sortType != null && sortType !="")
                paraStr += "&sortType=" +sortType;
            if (articleid != null && articleid !="")
                paraStr += "&articleid=" +articleid;

            window.location.href='/article/list?'+paraStr;
        });

        $('#dlgDoReviseBtn').click(function(){
            doReviseStatus();
        });
        
        $('#dlgDoReviseIsGoodBtn').click(function(){
        	doReviseIsGood();
        });
    }

    var doReviseStatus = function(){
    var pStatus = $("#dlgStatus").val();
	    var pArticleId = $('#dlgArticleId').val();
	
	    var pParam = "articleId=" + pArticleId;
	    if (pStatus !== null && pStatus !==undefined && pStatus !=="")
	        pParam += "&status=" + pStatus;
	
	    $('#dlgFooter').hide();
	    $('#dlgStatus').hide();
	    $('#dlgProgress').show();
	
	    $.ajax({
	        type:"GET",
	        url:"/article/doUpdateStatus",
	        data:pParam,
	        dataType:"JSON",
	        success: function(data) {
	            var ecode = data.ecode;
	            var emsg = data.emsg;
	            if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
	                $('#dlgFooter').show();
	                $('#dlgStatus').show();
	                $('#dlgProgress').hide();
	                $('#dlgErrInfo').text(emsg).show();
	            }else {
	                window.location.reload(true);
	            }
	        },
	        error: function(e) { 
	            $('#dlgFooter').show();
	            $('#dlgStatus').show();
	            $('#dlgProgress').hide();
	            $('#dlgErrInfo').text(e.status+":"+ e.statusText).show();
	        } 
	
	    });
	};

	var doReviseIsGood = function(){
	    var pIsGood = $("#dlgIsGood").val();
	    var pArticleId = $('#articleId').val();
	
	    var pParam = "articleId=" + pArticleId;
	    if (pIsGood !== null && pIsGood !==undefined && pIsGood !=="")
	        pParam += "&isGood=" + pIsGood;
	
	    $('#dlgIsGoodFooter').hide();
	    $('#dlgIsGood').hide();
	    $('#dlgIsGoodProgress').show();
	
	    $.ajax({
	        type:"GET",
	        url:"/article/doUpdateIsGood",
	        data:pParam,
	        dataType:"JSON",
	        success: function(data) {
	            var ecode = data.ecode;
	            var emsg = data.emsg;
	            if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
	                $('#dlgIsGoodFooter').show();
	                $('#dlgIsGood').show();
	                $('#dlgIsGoodProgress').hide();
	                $('#dlgIsGoodErrInfo').text(emsg).show();
	            }else {
	                window.location.reload(true);
	            }
	        },
	        error: function(e) { 
	            $('#dlgIsGoodFooter').show();
	            $('#dlgIsGood').show();
	            $('#dlgIsGoodProgress').hide();
	            $('#dlgIsGoodErrInfo').text(e.status+":"+ e.statusText).show();
	        } 
	
	    });
	};

    var GetQueryString = function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }
    
    

    return {
        //main function to initiate the module
        init: function (pageNum) {
            handlePagination(pageNum);
            
        	// 关闭添加修改弹层
			$('.closeSave, .closeX , .close,.noDel').click(function(){
				$('#error').html('').css('display','none');
	            $('#allot_auditor').modal('hide');
	            $('#change_shortId_show').modal('hide');
	            $('#delPrompt').modal('hide');
			});
			
			
        },
        submitAudit:function(id){
        	$('#dlgProgress').show();
    		$.ajax({
    			type : 'POST',
    			url : "/article/submitAudit",
    			data : {"articleId":id},
    			dataType : 'JSON',
    			success: function(data) {
    				var ecode = data.ecode;
    				var emsg = data.emsg;
    				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
    					$('#dlgProgress').hide();
    	                $('#dlgErrInfo').text(emsg).show();
    				} else {
    					 window.location.reload(true);
    				}
    			},
    			error: function(e) {
    				$('#dlgFooter').show();
    	            $('#dlgStatus').show();
    	            $('#dlgProgress').hide();
    	            $('#dlgErrInfo').text(e.status+":"+ e.statusText).show();
    			} 
    		});
    	},
        doRefresh:function(id){
        	$('#dlgProgress').show();
    		$.ajax({
    			type : 'POST',
    			url : "/article/updateIsDirty",
    			data : {"articleId":id},
    			dataType : 'JSON',
    			success: function(data) {
    				var ecode = data.ecode;
    				var emsg = data.emsg;
    				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
    					$('#dlgProgress').hide();
    	                $('#dlgErrInfo').text(emsg).show();
    				} else {
    					 window.location.reload(true);
    				}
    			},
    			error: function(e) {
    				$('#dlgFooter').show();
    	            $('#dlgStatus').show();
    	            $('#dlgProgress').hide();
    	            $('#dlgErrInfo').text(e.status+":"+ e.statusText).show();
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
    		$('input[name="delArticleId"]').val(id);
    		$('#delPrompt').modal('show');
    	},
    	remove:function(){
    		var id = $('input[name="delArticleId"]').val();
     		$.ajax({
     			type : 'POST',
     			url : "/article/doUpdateStatus",
     			data : {"articleId":id,"status":50},
     			dataType : 'JSON',
     			success: function(data) {
     				var ecode = data.ecode;
     				var emsg = data.emsg;
     				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
     					$('#dlgProgress').hide();
     	                $('#dlgErrInfo').text(emsg).show();
     				} else {
     					 window.location.reload(true);
     				}
     			},
     			error: function(e) {
     				$('#dlgFooter').show();
     	            $('#dlgStatus').show();
     	            $('#dlgProgress').hide();
     	            $('#dlgErrInfo').text(e.status+":"+ e.statusText).show();
     			} 
     		});
     	},
     	//修改排序
     	changeSortId:function(id){
     		$("#dlgArticleId").val(id);
     		$('#change_shortId_show').modal('show');
     	},
     	doChangeShortId:function(){
     		var articleId = $("#dlgArticleId").val();
     		var shortId = $("#shortId_updata").val();
     		var pParam = {
    				'articleId':articleId,
    				'shortId':shortId
    		}
    		$.ajax({
    	        type:"GET",
    	        url:"/article/changeSortId",
    	        data:pParam,
    	        dataType:"JSON",
    	        success: function(data) {
    	            var ecode = data.ecode;
    	            var emsg = data.emsg;
    	            if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
    	            	$('#errorModal').modal('show');
    	            }else {
    	                window.location.reload(true);
    	            }
    	        },
    	        error: function(e) { 
    	            $('#errorModal').modal('show');
    	        } 

    	    });
     	},
     	
     	
    };
}();

// 跳转到文章详情
var articleDatail = function(parameters){
	window.location.href = "/article/articleDetail?articleId="+parameters;
}

// 添加文章
var addArticle = function(){
	window.location.href="/article/editArticle?from=0";
}

var reviseIsGood = function(id,title,isGood){
	$('#articleId').val(id);
    $('#dlgIsGood').val(isGood);
    var tt = title.length > 10? title.substring(0,10)+"...":title;
    $('#myModalLabelIsGood').text("修改是否精选："+tt+"("+id+")");
    $("#myDlg2").modal('show');
}

var reviseStatus = function(id,title,status){
    $('#dlgArticleId').val(id);
    $('#dlgStatus').val(status);
    var tt = title.length > 10? title.substring(0,10)+"...":title;
    $('#myModalLabel').text("修改状态："+tt+"("+id+")");
    $("#myDlg1").modal('show');
};

function doUpdateVisibleTime (id){
    $.ajax({
        type:"GET",
        url:"/article/doUpdateVisibleTime",
        data:{"articleId":id},
        dataType:"JSON",
        success: function(data) {
            var ecode = data.ecode;
            var emsg = data.emsg;
            if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
                $('#dlgIsGoodFooter').show();
                $('#dlgIsGood').show();
                $('#dlgIsGoodProgress').hide();
                $('#dlgIsGoodErrInfo').text(emsg).show();
            }else {
                window.location.reload(true);
            }
        },
        error: function(e) { 
            $('#dlgIsGoodFooter').show();
            $('#dlgIsGood').show();
            $('#dlgIsGoodProgress').hide();
            $('#dlgIsGoodErrInfo').text(e.status+":"+ e.statusText).show();
        } 

    });
};


