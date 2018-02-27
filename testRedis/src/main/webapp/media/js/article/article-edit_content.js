var ArticleEdit = function () {
    
    return {
        //main function to initiate the module
        init: function () {
        	var pIsDraft = 1;


           $('.form-edit').validate({
           		debug:true,
	            errorElement: 'label', //default input error message container
	            errorClass: 'alert-error', // default input error message class
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
	                link: {
	                    required: false,
	                    url:true,
	                    rangelength:[1,255]
	                },
	                tags: {
	                    required: false,
	                    rangelength:[2,35]
	                },

	                content: {
	                    required: false,
	                    rangelength:[20,20000]
	                }
	            },

	            messages: {
	                link: {
	                	url: "请输入合法的网址",
	                    rangelength: $.format("链接地址最小长度:{0}, 最大长度:{1}。")
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-error', $('.form-edit')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	               // mySubmit();
	            }
	        });

		
	        // $('.form-edit input').keypress(function (e) {
	        //     if (e.which == 13) {
	        //         if ($('.form-edit').validate().form()) {
	        //             mySubmit();
	        //         }
	        //         return false;
	        //     }
	        // });
           	//保存草稿
        	$('#scriptBtn').click(function(){
        		pIsDraft = 1;
                if ($('.form-edit').validate().form()) {
                    mySubmit();
                }
                return false;
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
        			var from = $("#fromArticle").val();
        			if(from == 0){
        				window.location.href='/article/list';
        			}else if(from == 1){
        				//alert("跳转到详情");
        				window.location.href="/article/articleDetail?articleId=" + $("input[name='articleId']").val();
        			}
            	     
                	 return true;
	              }else{
    	             return false;
        	     }
  				
			});
	        var mySubmit = function() {
	        	
	        	var pArticleId=$("input[name='articleId']").val();
	        	var pTitle = $("input[name='title']").val();
	        	var psTitle = $("input[name='psTitle']").val();
				
				var pSummary=$("textarea[name='summary']").val();
				var psSummary=$("textarea[name='psSummary']").val();

        		var pContent=CKEDITOR.instances.content.getData();
        		var psContent= $("textarea[name='psContent']").val();

        		var pLink=$("textarea[name='link']").val();
        		var psLink=$("textarea[name='psLink']").val();

				var pTags=$("input[name='tags']").val();
				var psTags=$("input[name='psTags']").val();

				var authorId = $("#authorId").val();
				var pType = $("#type").val();
				
				var from = $("#fromArticle").val();// 作为跳转的路径的参数

				var pParam = "";
				if (pArticleId !== null && pArticleId !==undefined && pArticleId !=="" && pArticleId != "-1")
					pParam += "articleId=" + pArticleId;
				if (pTitle !== null && pTitle !==undefined && pTitle != psTitle)
					pParam += "&title=" + pTitle;
				if (pSummary !== null && pSummary !==undefined &&  pSummary != psSummary)
					pParam += "&summary=" + pSummary;
				if (pContent !== null && pContent !==undefined &&  pContent != psContent)
					pParam += "&content=" + encodeURIComponent(pContent);
				if (pLink !== null && pLink !==undefined && pLink != psLink)
					pParam += "&link=" + encodeURIComponent(pLink);
				if (pTags !== null && pTags !==undefined && pTags != psTags)
					pParam += "&tags=" + pTags;
				if (authorId !== null && authorId !==undefined && authorId !=="")
					pParam += "&authorId=" + authorId;
				if (pType !== null && pType !==undefined && pType !=="")
					pParam += "&type=" + pType;
				pParam += "&isdraft=" + pIsDraft;

				$("#myDlg1").modal('show');
				$.ajax({
					type:"POST",
					url:"/article/doEditArticleContent",
					data:pParam,
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
							}else if(from == 1 && from != null){
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
        }



    };

}();