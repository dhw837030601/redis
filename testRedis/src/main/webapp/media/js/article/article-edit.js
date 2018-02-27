var ArticleEdit = function () {
    
    return {
        init: function () {
        	var pIsDraft = 1;
           $('.form-edit').validate({
           		//debug:true, // 只是验证不会提交表单
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	            	title: {
	                    required: false,
	                    rangelength:[6,40]
	                },
	            	summary: {
	                    required: false,
	                    rangelength:[20,50]
	                },
	                author: {
	                    required: false,
	                    rangelength:[0,8]
	                },
	                recommender: {
	                	required: false,
	                	rangelength:[0,8]
	                },
	                recommendNote: {
	                	required: false,
	                	rangelength:[0,256]
	                },
	                sourceLink: {
	                    required: false,
	                    url:true,
	                    rangelength:[1,255]
	                },
	                sortIdx:{
	                	required: true,
	                    maxlength: 3,
	                    digits:true
	                },
	                commentNum: {
	                	required: true,
	                    digits:true
	                },
	                praiseNum: {
	                	required: true,
	                    digits:true
	                },
	                readNum: {
	                	required: true,
	                    digits:true
	                },
	                shareNum: {
	                	required: true,
	                    digits:true
	                },
	                saveNum: {
	                	required: true,
	                    digits:true
	                }
	           
	            },

	            messages: {
	            	title: {
	            		rangelength: $.format("标题最小长度:{0},标题最大长度:{1}")
	            	},
	            	summary: {
	            		rangelength : $.format("文章简介最小长度:{0},文章简介最大长度:{1}")
	            	},
	            	sourceLink: {
	                	url: "请输入合法的网址",
	                    rangelength: $.format("链接地址最小长度:{0}, 最大长度:{1}。")
	                },
	                sortIdx: {
	                	required: "排序是必填项！",
	            		maxlength: $.format("排序最大的长度:{0}"),
	            		digits: "排序只能是数字！"
	                },
	                commentNum: {
	                	required: "评论数是必填项！",
	            		digits: "评论数只能是数字！"
	                },
	                praiseNum: {
	                	required: "点赞数是必填项！",
	            		digits: "点赞数只能是数字！"
	                },
	                readNum: {
	                	required: "阅读数是必填项！",
	            		digits: "阅读数只能是数字！"
	                },
	                shareNum: {
	                	required: "分享数是必填项！",
	            		digits: "分享数只能是数字！"
	                },
	                saveNum: {
	                	required: "收藏数是必填项！",
	            		digits: "收藏数只能是数字！"
	            	}
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	               // $('.alert-error', $('.form-edit')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },
	            // 更改错误信息的显示的位置
	            errorPlacement: function (error, element) {
	            	error.addClass('help-small no-left-padding redFont').insertAfter(element.closest('.input-icon'));
	            	error.appendTo(element.parent());
	            },

	            submitHandler: function (form) {
	              // mySubmit();
	            }
	        });
	        
        	//保存
			$('#saveBtn').click(function(){
				pIsDraft = 0;
                if ($('.form-edit').validate().form()) {
                    mySubmit();
                }
                return false;
			});
			$('#cancelBtn').click(function(){
        		if(window.confirm('你确定要放弃本次编辑吗？')){
        			var from = $("#from").val();
        			if(from == 0){
        				window.location.href='/article/list';
        			}else if(from == 1 || from == 2){
        				//alert("跳转到详情");
        				window.location.href="/article/articleDetail?articleId=" + $("#articleId").val();
        			}
            	     
                	 return true;
	              }else{
    	             return false;
        	     }
  				
			});
	        var mySubmit = function() {
	        	
	        	var pArticleId=$("#articleId").val();
	        	var from = $("#from").val();
	        	
				$("#myDlg1").modal('show');
				$.ajax({
					type: "POST",
					url: "/article/doEditArticle",
					data: $('#add_f').serialize(),
					dataType:"JSON",
					success: function(data) {
						var ecode = data.ecode;
						var emsg = data.emsg;
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							 $("#myDlg1").modal('hide');
							$('.alert-error', $('.form-edit')).text(emsg).show();
						}else {
							if(from == 0 && from != null){
								window.location.href='/article/list';
							}else if((from == 1 || from == 2 )&& from != null){
								//alert("跳转到详情");
								window.location.href="/article/articleDetail?articleId=" + pArticleId;
							}
						}
					},
					error: function(e) { 
						$('.alert-error', $('.form-edit')).text(e.status+":"+ e.statusText).show();
					} 
				});
        	}
	        if (jQuery().datepicker) {
	            $('.date-picker').datepicker();
	        }
	        App.initFancybox();
        }
    };
}();