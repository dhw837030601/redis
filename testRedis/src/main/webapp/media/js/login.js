var Login = function () {
    
    return {
        //main function to initiate the module
        init: function () {
        	
           $('.login-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true,
	                    rangelength:[6,20]
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "请输入用户名."
	                },
	                password: {
	                    required: "请输入密码.",
	                    rangelength: $.format("密码最小长度:{0}, 最大长度:{1}。")

	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-error', $('.login-form')).show();
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
	                mySubmit();
	            }
	        });

	        $('.login-form input').keydown(function (e) {
	            if (e.keyCode == 13) {
	                if ($('.login-form').validate().form()) {
	                    mySubmit();
	                }
	                return false;
	            }
	        });

	        var mySubmit = function() {
        		var userName=$("input[name='username']").val();
				var pwd=$("input[name='password']").val();
				var saltstr="HXWcjvQWVG1wI4FQBLZpQ3pWj48AV63d";
				var password=$.md5($.md5(pwd.trim())+saltstr);
				var remember=$("input[name='remember']").is(':checked');
				$.ajax({
					type:"POST",	
					url:"dologin",
					data:"username="+userName+"&password="+password+"&remember="+remember,
					dataType:"JSONP",
					jsonp: 'callbackparam',
					success: function(data) {
						var ecode = data.ecode;
						var emsg = data.emsg;
						if (ecode != HdPayErrEnum.ERR_COMMON_SUCCESS.errcode) {
							$('.alert-error', $('.login-form')).text(emsg).show();
						}else {
							var referer = data.adata.referer;
							if (referer != null && referer != "") {
								window.location.href=referer;
							}else {
								window.location.href='index';
							}
						}
					}
				});
        	}
        }
    };
}();