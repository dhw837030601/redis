//自动生成对应的js代码 ErrorEnum.js...
//由ErrorEnum.java自动生成，请勿自己改动，如需改动，请先改动ErrorEnum.java后，自动生成...
//Wed Aug 30 20:35:03 CST 2017
var ErrorEnum = {
    ERR_COMMON_SUCCESS : {errcode: '000000', errmsg: '操作成功'},
    ERR_COMMON_FAILURE : {errcode: '999999', errmsg: '操作失败'},
    ERR_SYSTEM_ERROR : {errcode: '100000', errmsg: '系统内部错误，请稍后重试！'},
    ERR_SYSTEM_SERVICE_UNAVAILABLE : {errcode: '100001', errmsg: '服务暂停，请稍后再试'},
    ERR_SYSTEM_REMOTE_SERVICE_ERROR : {errcode: '100002', errmsg: '远程服务错误'},
    ERR_SYSTEM_IP_LIMIT : {errcode: '100003', errmsg: 'IP限制不能请求该资源'},
    ERR_SYSTEM_TOO_MANY_PENDING_TASKS : {errcode: '100004', errmsg: '任务过多，系统繁忙'},
    ERR_SYSTEM_JOB_EXPIRED : {errcode: '110005', errmsg: '任务超时'},
    ERR_SYSTEM_RPC_ERROR : {errcode: '110006', errmsg: '系统内部错误'},
    ERR_PARAM_PARAM_ERROR : {errcode: '110000', errmsg: '参数错误，请参考API文档'},
    ERR_PARAM_OBJECT_IS_NULL : {errcode: '110001', errmsg: '传入的对象为空'},
    ERR_PARAM_PARAMETER_IS_NULL : {errcode: '110002', errmsg: '参数为空'},
    ERR_PARAM_PERMISSION_DENIED : {errcode: '110003', errmsg: '该资源需要appkey拥有授权'},
    ERR_PARAM_APPKEY_IS_NULL : {errcode: '110004', errmsg: 'AppKey为空或不存在'},
    ERR_PARAM_APPKEY_IS_INVALID : {errcode: '110005', errmsg: '未知客户端,请联系客服'},
    ERR_PARAM_UNSUPPORT_MEDIATYPE : {errcode: '110006', errmsg: '不支持的MediaType'},
    ERR_PARAM_VALUE_IS_NULL : {errcode: '110007', errmsg: '变量值为空'},
    ERR_PARAM_PARAMETER_IS_NULL_OR_INVALID : {errcode: '110008', errmsg: '参数为空或者非法'},
    ERR_PARAM_INVALID_URL : {errcode: '110009', errmsg: '非法的url'},
    ERR_PARAM_PARAM_DATE_ERROR : {errcode: '110010', errmsg: '时间参数格式不正确，请参考API文档'},
    ERR_PARAM_COMPANY_CODE_IS_NULL : {errcode: '110011', errmsg: '公司编号companyCode为空或不存在'},
    ERR_PARAM_COMPANY_IS_NULL : {errcode: '110012', errmsg: '公司编号为空或不存在'},
    ERR_PARAM_COMPANY_INFO_IS_NULL : {errcode: '110013', errmsg: '公司邮箱信息为空或不存在'},
    ERR_PARAM_APPKEY_PRODUCTID_IS_NULL : {errcode: '110014', errmsg: '第三方产品ID不存在！'},
    ERR_DB_QUERY_DATA_ERR : {errcode: '120001', errmsg: '查询数据异常'},
    ERR_DB_ADD_DATA_ERR : {errcode: '120002', errmsg: '添加数据异常'},
    ERR_DB_DEL_DATA_ERR : {errcode: '120003', errmsg: '删除数据异常'},
    ERR_DB_UPDATE_DATA_ERR : {errcode: '120004', errmsg: '修改数据异常'},
    ERR_DB_QUERY_RESULT_IS_NULL : {errcode: '120005', errmsg: '查询结果为空'},
    ERR_DB_DATA_ERR : {errcode: '120006', errmsg: '数据异常'},
    ERR_DATA_CONVERSION_ERR : {errcode: '130000', errmsg: '数据转换异常'},
    ERR_DATA_ENCAPSULATION_ERR : {errcode: '130001', errmsg: '数据封装异常'},
    ERR_DATA_CALCULATE_ERR : {errcode: '130002', errmsg: '数据计算异常'},
    ERR_DATA_ABNORMAL_DATA_LOADING : {errcode: '130003', errmsg: '数据加载异常,请稍后再试'},
    ERR_DATA_DATE_CALC_ERR : {errcode: '207010', errmsg: '日期计算时出错'},
    ERR_USER_USDCREDIT_IS_NULL_OR_ERR : {errcode: '200997', errmsg: '美金信用为空或者不合法'},
    ERR_USER_RMBCREDIT_IS_NULL_OR_ERR : {errcode: '200998', errmsg: '人民币信用为空或者不合法'},
    ERR_USER_DUES_IS_NULL_OR_ERR : {errcode: '200999', errmsg: '保证金为空或者不合法'},
    ERR_USER_NOT_EXIST : {errcode: '201000', errmsg: '用户不存在或不合法！'},
    ERR_USER_NOT_LOGIN : {errcode: '201001', errmsg: '您尚未登录,请前往登录页面登录！'},
    ERR_USER_LOGIN_IS_OVERDUE : {errcode: '201002', errmsg: '用户未登录,或已过期，请重新登录'},
    ERR_USER_ALREADY_LOGIN : {errcode: '201003', errmsg: '用户已经登录！'},
    ERR_USER_LOGIN_FAIL : {errcode: '201004', errmsg: '登录失败，请稍后重试！'},
    ERR_USER_PWD_IS_NULL_OR_ERR : {errcode: '201006', errmsg: '密码为空或者错误！'},
    ERR_USER_VERIFYCODE_IS_NULL_OR_ERR : {errcode: '201007', errmsg: '验证码为空或者无效！'},
    ERR_USER_MOBILE_IS_NULL_OR_INVALID : {errcode: '201008', errmsg: '手机号为空或者无效！'},
    ERR_USER_EXISTS : {errcode: '201010', errmsg: '用户已存在,请重新输入！'},
    ERR_USER_QUERY_ERR : {errcode: '201011', errmsg: '查询用户异常，请稍后重试！'},
    ERR_USER_ACCESSTOKEN_IS_NULL_OR_ERR : {errcode: '201012', errmsg: '登陆令牌失效，请重新登录！'},
    ERR_USER_LOGIN_ERROR : {errcode: '201013', errmsg: '用户名或密码错误！'},
    ERR_USER_SYSTEM_BUSY : {errcode: '201014', errmsg: '对不起，系统繁忙，请稍后再试!'},
    ERR_USER_MOBILE_EXISTS : {errcode: '201015', errmsg: '该手机号已注册！'},
    ERR_USER_IDCARD_EXISTS : {errcode: '201016', errmsg: '身份证号已经被绑定了！'},
    ERR_USER_REGISTER_FAILED : {errcode: '201017', errmsg: '注册货代钱包用户失败，请稍后再试!'},
    ERR_USER_INVITE_CODE_IS_INVALID : {errcode: '201018', errmsg: '邀请码错误'},
    ERR_USER_NAME_IS_NULL_OR_ERR : {errcode: '201021', errmsg: '用户名为空或者错误'},
    ERR_USER_FORBIDDEN_LOGIN : {errcode: '201022', errmsg: '该用户禁止登录，请联系客服'},
    ERR_USER_TOO_MANY_LOGIN_TRY : {errcode: '201023', errmsg: '登录次数超限，账户已锁定，请明天再试'},
    ERR_USER_PWD_WRONG_LENGTH : {errcode: '201024', errmsg: '密码长度6-20位'},
    ERR_USER_PWD_NOT_SAME : {errcode: '201025', errmsg: '两次输入的密码不匹配'},
    ERR_USER_CAPTCHA_IS_NULL : {errcode: '201026', errmsg: '图形验证码不能为空'},
    ERR_USER_CAPTCHA_IS_WRONG : {errcode: '201027', errmsg: '图形验证码错'},
    ERR_USER_CAPTCHA_IS_NULL_OR_WRONG : {errcode: '201028', errmsg: '图形验证码空或者错误'},
    ERR_USER_ERR_IN_VERIFY_SMS_CODE : {errcode: '201029', errmsg: '验证码验证时出错，请重试'},
    ERR_USER_TOO_MANY_VERIFY_SMS_CODE : {errcode: '20130', errmsg: '验证码验证次数超限，请联系客服'},
    ERR_USER_MOBILE_IS_INVALID : {errcode: '201031', errmsg: '无效的手机号'},
    ERR_USER_MOBILE_IS_NULL : {errcode: '201032', errmsg: '手机号为空'},
    ERR_USER_SMS_VCODE_IS_NULL : {errcode: '201033', errmsg: '手机验证码为空'},
    ERR_USER_SMS_VCODE_IS_INVALID : {errcode: '201034', errmsg: '无效的手机验证码'},
    ERR_USER_SMS_VCODE_IS_NULL_OR_INVALID : {errcode: '201035', errmsg: '手机验证码空或者无效'},
    ERR_USER_EMAIL_IS_INVALID : {errcode: '201036', errmsg: '无效的电子邮箱地址'},
    ERR_USER_EMAIL_IS_NULL : {errcode: '201037', errmsg: '电子邮箱地址为空'},
    ERR_USER_EMAIL_EXISTS : {errcode: '201038', errmsg: '该邮件地址已注册！'},
    ERR_SEND_SMS : {errcode: '201039', errmsg: '发送验证码失败'},
    ERR_USER_NAME_NOT_CHINESE_OR_ERR : {errcode: '201040', errmsg: '姓名只能为中文'},
    ERR_USER_IDENTITY_CARD_NOT_NULL : {errcode: '201041', errmsg: '身份证号不能为空'},
    ERR_USER_IDENTITY_CARD_ERR : {errcode: '201042', errmsg: '身份证号不正确'},
    ERR_USER_NOT_EMPLOYEE : {errcode: '201043', errmsg: '您不是员工，无权登录'},
    ERR_USER_FORBIDDEN_SPEAK : {errcode: '201044', errmsg: '您已经被禁言，请联系客服！'},
    ERR_USER_WRONG_VERIFY_CODE : {errcode: '201045', errmsg: '验证码错误，请稍后重试'},
    ERR_USER_NOT_EXIST_COMPANYNAME : {errcode: '201046', errmsg: '公司名称不能为空'},
    ERR_USER_NOT_EXIST_CONTACTS : {errcode: '201047', errmsg: '联系人不能为空'},
    ERR_USER_NOT_EXIST_CELLPHONE : {errcode: '201048', errmsg: '联系电话不能为空'},
    ERR_USER_UPDATEPWD_OLDPWD_ERR : {errcode: '201049', errmsg: '原始密码错误'},
    ERR_USER_THIRD_PLATFORM_UNSUPPORTED : {errcode: '201050', errmsg: '不支持该平台账号登录'},
    ERR_USER_UPDATEPWD_SAME : {errcode: '201051', errmsg: '原密码和新密码不能相同'},
    ERR_USER_EXIST_NICKNAME : {errcode: '201052', errmsg: '该昵称已存在'},
    ERR_USER_NOT_EXIST_NICKNAME : {errcode: '201053', errmsg: '昵称不能为空'},
    ERR_USER_NOT_EXIST_ADDRESS : {errcode: '201054', errmsg: '公司地址不能为空'},
    ERR_USER_UNSUPPORT_ACCOUNT : {errcode: '201055', errmsg: '不支持的账户名'},
    ERR_USER_UNSUPPORT_BINDING : {errcode: '201056', errmsg: '无效的手机号或者邮件地址'},
    ERR_USER_UPDATEPWD_FAIL : {errcode: '201057', errmsg: '密码更新失败'},
    ERR_USER_UPDATE_FAIL : {errcode: '201058', errmsg: '用户更新失败'},
    ERR_USER_PWD_TYPE_ERR : {errcode: '201059', errmsg: '密码类型不合法'},
    ERR_USER_UPDATE_FAIL_BY_STATUS : {errcode: '201060', errmsg: '用户当前状态不允许更新资料'},
    ERR_USER_UPDATE_FAIL_UNFIT_STATUS : {errcode: '201061', errmsg: '当前用户状态不允许更新某些特定信息'},
    ERR_USER_NOT_SAME_COMPANY : {errcode: '201062', errmsg: '公司名称不相同'},
    ERR_USER_UPDATE_PAYAUDITORMOBILE_FAIL : {errcode: '201063', errmsg: '更新审核人的手机号码失败'},
    ERR_USER_UNSUPPORT_MOBILE_BINDING : {errcode: '201064', errmsg: '无效的手机号'},
    ERR_USER_RETRIEVEPWD_FAIL : {errcode: '201101', errmsg: '找回密码失败'},
    ERR_USER_INVALID_NICKNAME : {errcode: '201200', errmsg: '昵称的长度为2~16个字符'},
    ERR_USER_INVALID_REALNAME : {errcode: '201201', errmsg: '真实姓名的长度为2~16个字符'},
    ERR_USER_INVALID_TITLE : {errcode: '201202', errmsg: '职务的长度为2~24个字符'},
    ERR_USER_INVALID_INTRODUCTION : {errcode: '201203', errmsg: '自我介绍的长度最大为2048个字符'},
    ERR_USER_INVALID_SLOGEN : {errcode: '201204', errmsg: '心情的长度最大为64个字符'},
    ERR_USER_INVALID_ADDRESS : {errcode: '201205', errmsg: '地址的长度最大为64个字符'},
    ERR_USER_INVALID_BIRTHPLACE : {errcode: '201206', errmsg: '出生地的长度最大为16个字符'},
    ERR_USER_INVALID_POSTCODE : {errcode: '201207', errmsg: '邮政编码的长度最大为10个数字'},
    ERR_USER_HAS_CREDIT : {errcode: '201208', errmsg: '用户已授信，不可重复申请'},
    ERR_USER_PAYPWD_WRONG : {errcode: '201209', errmsg: '用户支付密码错误，请重新输入支付密码'},
    ERR_USERNAME_OR_PASSWORD_IS_NULL : {errcode: '201210', errmsg: '用户或密码为空！'},
    ERR_USERNAME_HAS_EXISTS : {errcode: '201211', errmsg: '用户名已存在！'},
    ERR_USER_HAS_APPLY_CREDIT : {errcode: '201212', errmsg: '授信正在审核中，不可重复申请'},
    ERR_USER_NOT_IN_CREDIT_REVIEW : {errcode: '201213', errmsg: '该用户不是授信审核中状态，不能审核'},
    ERR_USER_EXIST_OPENID : {errcode: '201250', errmsg: '该第三方账号已经存在'},
    ERR_USER_LOAN_BANK_INFO_NOT_EXIST : {errcode: '201251', errmsg: '未找到贷款机构相关信息!'},
    ERR_USER_LIST_IS_NOT_FOUND : {errcode: '201252', errmsg: '用户列表不存在!'},
    ERR_USER_SHIPLIST_IS_NOT_FOUND : {errcode: '201253', errmsg: '查询用户船公司列表失败!'},
    ERR_USER_HAS_STOP_RIGHTS : {errcode: '201254', errmsg: '用户已停权，请联系客服!'},
    ERR_TO_USER_HAS_NOT_OPENG_BANK_ACCOUNT : {errcode: '201255', errmsg: '收款方用户未开通存管，请开通后再试!'},
    ERR_USER_ACCOUNT_BIND : {errcode: '201256', errmsg: '该用户绑定记录已经存在，不能再次绑定'},
    ERR_USER_cant_find : {errcode: '201257', errmsg: '找不到该58集装箱用户'},
    ERR_USER_HAS_NOT_OPENG_BANK_ACCOUNT : {errcode: '201258', errmsg: '用户未开通存管，请开通后再试!'},
    ERR_USER_APLLY_CREDIT_FALIUR : {errcode: '201259', errmsg: '用户申请授信，请开通后再试!'},
    ERR_USER_ACCOUNT_BIND_DEL_FAIL : {errcode: '201260', errmsg: '删除绑定账户失败'},
    ERR_USER_ACCOUNT_BIND_ID_IS_NULL : {errcode: '201261', errmsg: '绑定账户ID为空'},
    ERR_USER_NOT_BOOK_PORT : {errcode: '201262', errmsg: '该用户不是订舱口，不能添加船公司！'},
    ERR_REDBAD_IS_ZERO : {errcode: '208000', errmsg: '红包金额小于0或等于0'},
    ERR_REDBAD_USER_NO_POSSESS : {errcode: '208001', errmsg: '不拥有该礼包'},
    ERR_REDBAD_NO_TYPE : {errcode: '208002', errmsg: '没有该类型礼包'},
    ERR_REDBAG_TAKE_FAIL : {errcode: '208003', errmsg: '红包领取失败'},
    ERR_REDBAG_QUERY_FAIL : {errcode: '208004', errmsg: '红包查询失败'},
    ERR_USER_STATUS_START_NOT_SUPPORT : {errcode: '208100', errmsg: '用户状态为创建状态,不能进行此操作'},
    ERR_USER_STATUS_REVIEW_CREDIT_NOT_SUPPORT : {errcode: '208101', errmsg: '用户状态为授信审核中状态,不能进行此操作'},
    ERR_USER_STATUS_REFUSED_CREDIT_NOT_SUPPORT : {errcode: '208102', errmsg: '用户状态为授信拒绝状态,不能进行此操作，请联系客服!'},
    ERR_USER_STATUS_STOP_RIGHT_NOT_SUPPORT : {errcode: '208103', errmsg: '用户状态为停权状态,不能进行此操作，请联系客服!'},
    ERR_USER_STATUS_DELETE_NOT_SUPPORT : {errcode: '208104', errmsg: '用户状态为删除状态,不能进行此操作'},
    ERR_DEPARTMENT_IS_NOTFOUND : {errcode: '209001', errmsg: '未找到部门信息'},
    ERR_DEPARTMENT_ID_IS_NULL : {errcode: '209002', errmsg: '要操作的部门id为空'},
    ERR_DEPARTMENT_PID_CANNOT_SELF : {errcode: '209002', errmsg: '部门父级不能是自己'},
    ERR_DEPARTMENT_NAME_EXISTING : {errcode: '209003', errmsg: '部门名称已存在'},
    ERR_DEPARTMENT_PRIVROLE_IS_USEFUL : {errcode: '209004', errmsg: '还有角色在使用这个部门'},
    ERR_DEPARTMENT_STAFF_IS_USEFUL : {errcode: '209005', errmsg: '还有员工在使用这个部门'},
    ERR_PRIVROLE_ID_IS_NULL : {errcode: '209101', errmsg: '要操作的角色id为空'},
    ERR_PRIVROLE_IS_NOTFOUND : {errcode: '209102', errmsg: '未找到角色信息'},
    ERR_PRIVROLE_NAME_EXISTING : {errcode: '209103', errmsg: '角色名称已存在'},
    ERR_STAFF_ID_IS_NULL : {errcode: '209201', errmsg: '要操作的员工id为空'},
    ERR_STAFF_IS_NOTFOUND : {errcode: '209202', errmsg: '未找到员工信息'},
    ERR_STAFF_NAME_EXISTING : {errcode: '209203', errmsg: '员工用户名已存在'},
    ERR_STAFF_MOBILE_EXISTING : {errcode: '209204', errmsg: '员工手机号已存在'},
    ERR_DIRECTORY_ID_IS_NULL : {errcode: '209301', errmsg: '要操作的菜单id为空'},
    ERR_DIRECTORY_IS_NOTFOUND : {errcode: '209302', errmsg: '未找到菜单信息'},
    ERR_DIRECTORY_NAME_EXISTING : {errcode: '209303', errmsg: '菜单名称已存在'},
    ERR_PRIVACTION_ID_IS_NULL : {errcode: '209401', errmsg: '要操作的Action的id为空'},
    ERR_PRIVACTION_IS_NOTFOUND : {errcode: '209402', errmsg: '未找到Action信息'},
    ERR_PRIVACTION_ACTION_EXISTING : {errcode: '209403', errmsg: 'Action路径已存在'},
    ERR_SHIP_COMPANY_ALREADY_EXISTS : {errcode: '211000', errmsg: '船公司已存在！'},
    ERR_SHIP_LIST_IS_NOT_FOUND : {errcode: '211001', errmsg: '船公司列表不存在！'},
    ERR_SHIP_CREATETIME_IS_NOT_FOUND : {errcode: '211002', errmsg: '添加船公司时间不存在！'},
    ERR_TASK_NO_LOAN_TASKS_IN_LOAN_AUDITING : {errcode: '212000', errmsg: '在贷款申请中状态查不到贷款任务!'},
    ERR_TASK_TASK_NOT_EXISTS : {errcode: '212001', errmsg: '任务不存在!'},
    ERR_TASK_TASK_NOT_EXISTS_OR_TASK_IS_NOT_OFFLINE_STATUS : {errcode: '212002', errmsg: '任务不存在或任务不是线下支付状态，不能审核该支付！'},
    ERR_OSS_GET_TEMP_TOKEN_ERR : {errcode: '213000', errmsg: '获取OSS访问权限出错，请稍后重试！'},
    ERR_VERIFY_CODE_OVERDUE : {errcode: '214000', errmsg: '验证码已经过期，请重新获取！'},
    ERR_VERIFY_WRONG_CODE : {errcode: '214001', errmsg: '验证码不正确，请重新获取！'},
    ERR_AUDIT_RELEASE_NOT_STATUS : {errcode: '215000', errmsg: '审核已结束，不允许释放！'},
    ERR_AUDIT_RELEASE_NOT_AUDIT : {errcode: '215005', errmsg: '改审核不存在！或者审核通过'},
    ERR_AUDIT_RELEASE_NOT_AUDIT_COURSE : {errcode: '215010', errmsg: '改审核的课程不存在！'},
    ERR_AUDIT_RELEASE_NOT_AUDIT_VOURSESVN : {errcode: '215015', errmsg: '改审核通已经过或者课程的SVN信息不存在'},
    ERR_AUDIT_IS_NOT_FOUND : {errcode: '215016', errmsg: '该审核不存在'},
    ERR_UPDATE_AUDIT_FAILD : {errcode: '215017', errmsg: '修改审核状态失败！'},
    ERR_FANS_ALREADY_CARE : {errcode: '216000', errmsg: '已经关注！'},
    ERR_FANS_CARE_FAILURE : {errcode: '216001', errmsg: '关注失败，请稍后再试！'},
    ERR_FANS_NOT_CARE : {errcode: '216002', errmsg: '还未关注！'},
    ERR_FANS_UNCARE_FAILURE : {errcode: '216003', errmsg: '取消关注失败，请稍后再试！'},
    ERR_FANS_CARE_BLOCKED : {errcode: '216004', errmsg: '您已经被拉黑'},
    ERR_USER_ACCOUNT_NOT_FOUND : {errcode: '217000', errmsg: '用户账户记录不存在'},
    ERR_USER_ACCOUNT_ADD_FAIL : {errcode: '217001', errmsg: '添加用户资金账户失败！'},
    ERR_USER_ACCOUNT_FREEZE_RMB_FAIL : {errcode: '217002', errmsg: '账户冻结人民币失败！'},
    ERR_USER_ACCOUNT_UNFREEZE_RMB_FAIL : {errcode: '217003', errmsg: '账户解冻人民币失败！'},
    ERR_USER_ACCOUNT_FREEZE_USD_FAIL : {errcode: '217004', errmsg: '账户冻结美元失败！'},
    ERR_USER_ACCOUNT_UNFREEZE_USD_FAIL : {errcode: '217005', errmsg: '账户解冻美元失败！'},
    ERR_USER_ACCOUNT_DECREASE_RMB_FAIL : {errcode: '217006', errmsg: '账户扣减人民币失败！'},
    ERR_USER_ACCOUNT_DECREASE_USD_FAIL : {errcode: '217007', errmsg: '账户扣减美元失败！'},
    ERR_USER_ACCOUNT_INCREASE_RMB_FAIL : {errcode: '217008', errmsg: '账户增加人民币失败！'},
    ERR_USER_ACCOUNT_INCREASE_USD_FAIL : {errcode: '217009', errmsg: '账户增加美元失败！'},
    ERR_USER_ACCOUNT_NOT_ENOUGH_BALANCE : {errcode: '217010', errmsg: '可用余额不足！'},
    ERR_USER_ACCOUNT_TRANS_UNSUPPORT_ACCOUNT : {errcode: '217100', errmsg: '转账时，不支持的账户类型！'},
    ERR_USER_ACCOUNT_TRANS_NO_SELF_TO_SELF : {errcode: '217101', errmsg: '本接口不支持的同用户账户之间的转账，请用冻结/解冻接口！'},
    ERR_USER_ACCOUNT_TRANS_UNFROZEN_ACCOUNT : {errcode: '217102', errmsg: '解冻时，不支持的账户类型！'},
    ERR_MONEY_RECORD_ADD_FAIL : {errcode: '218000', errmsg: '添加资金记录失败'},
    ERR_MESSAGE_SMS_SEND_FAIL : {errcode: '310000', errmsg: '短信发送失败'},
    ERR_MESSAGE_SMS_REACH_LIMIT : {errcode: '310001', errmsg: '您今天发送短信已达上限'},
    ERR_MESSAGE_SMS_CLOSED : {errcode: '310002', errmsg: '系统忙，请稍后再试！'},
    ERR_MESSAGE_WECHAT_SEND_FAIL : {errcode: '311000', errmsg: '微信推送消息失败'},
    ERR_MESSAGE_WECHAT_NOT_SUBSCRIBE : {errcode: '311001', errmsg: '该微信未关注'},
    ERR_MESSAGE_WECHAT_SEND_ADD : {errcode: '311002', errmsg: '添加微信推送消息失败'},
    ERR_MESSAGE_EMAIL_SEND_FAIL : {errcode: '3120000', errmsg: '邮件发送失败'},
    ERR_MESSAGE_EMAIL_SEND_SUCCESS : {errcode: '312001', errmsg: '邮件已发送,请注意查收'},
    ERR_BANNER_QUERY_LIST_ERR : {errcode: '313000', errmsg: '获取banner列表信息数据异常，请稍后再试'},
    ERR_BLACKWHITE_OVER_WRONG_LIMIT : {errcode: '315000', errmsg: '系统忙，请稍后再试！'},
    ERR_REFERER_IS_NULL_INVALID : {errcode: '316000', errmsg: '邀请码为空或者错误'},
    ERR_REFERER_IS_INVALID : {errcode: '316001', errmsg: '邀请码无效'},
    ERR__NOTICE_OBJECT_INVALID : {errcode: '320000', errmsg: '传入的公告对象格式为空或不合法'},
    ERR_INNMAIL_INVALID_USER : {errcode: '321000', errmsg: '当前用户不是该站内信的拥有者'},
    ERR_OTHER_LUCK_DRAW_CODE_IS_ERR : {errcode: '390000', errmsg: '抽奖码错误,请重新输入'},
    ERR_ORDER_NOT_FOUND : {errcode: '410001', errmsg: '订单不存在!'},
    ERR_ORDER_NOT_PENDING_PAY : {errcode: '410003', errmsg: '此订单/任务不是待支付状态，不能取消或支付!'},
    ERR_UPDATE_ORDERSTATUS_FALIUR : {errcode: '410004', errmsg: '取消订单失败！'},
    ERR_CANCEL_ORDER_FAILD : {errcode: '410005', errmsg: '取消订单失败'},
    ERR_UPDATE_TASK_STATUS_FALIUR : {errcode: '410006', errmsg: '支付失败!'},
    ERR_INSERT_TASK__FALIUR : {errcode: '410007', errmsg: '创建订单失败！'},
    ERR_UPDATE_ORDER_PAYMONEY_FALIUR : {errcode: '410009', errmsg: '支付失败!'},
    ERR_PAY_ORDER_PAY_SCHEDULE_WRONG : {errcode: '410010', errmsg: '选择的支付方案金额和需求不符，请重新选择支付方案!'},
    ERR_INSERT_MONEY_RECORD_FALIUR : {errcode: '410011', errmsg: '支付失败!'},
    ERR_ORDER_OR_USER_INFO_NOT_COMPLETE : {errcode: '410012', errmsg: '创建订单失败!'},
    ERR_ORDER_TO_USER_HAS_NOT_REGISTER : {errcode: '410013', errmsg: '收款方还未注册货代钱包账户或未绑定货代钱包账户,请通知收款方注册!'},
    ERR_UPDATE_USER_STATUS_FAIL : {errcode: '410014', errmsg: '更新用户状态失败！'},
    ERR_PAYORDERDETAILS_PAYTASK_IS_NOT_EXISTS : {errcode: '410015', errmsg: '订单详情中的支付任务不存在'},
    ERR_PAYORDERDETAILS_ORDER_IS_NOT_EXISTS : {errcode: '410016', errmsg: '订单详情中的订单数据不存在'},
    ERR_ORDER_LIST_NOT_FOUND : {errcode: '410017', errmsg: '订单记录不存在!'},
    ERR_UPDATE_USERBALANCE_FAILD : {errcode: '410018', errmsg: '更新用户账户失败!'},
    ERR_ORDER_TO_USER_INFO_IS_NOT_COMPLETE : {errcode: '410019', errmsg: '收款方userId为空!'},
    ERR_ORDER_IS_NOT_THIS_USERS : {errcode: '410020', errmsg: '此订单不是目前登录用户的订单!'},
    ERR_ORDER_PAY_RMB_CASH_NOT_ENOUGH : {errcode: '411001', errmsg: '人民币现金余额不足,不能进行支付!'},
    ERR_ORDER_PAY_RMB_CREDIT_NOT_ENOUGH : {errcode: '411002', errmsg: '人民币信用不足,不能进行支付!'},
    ERR_ORDER_PAY_USD_CASH_NOT_ENOUGH : {errcode: '411003', errmsg: '美元现金余额不足,不能进行支付!'},
    ERR_ORDER_PAY_USD_CREDIT_NOT_ENOUGH : {errcode: '411004', errmsg: '美元信用不足,不能进行支付!'},
    ERR_ALLAMOUNT_BIT_THAN_BALANCE : {errcode: '420000', errmsg: '还款总金额大于可用现金余额'},
    ERR_LOAN_NOT_MEET_MIN_HOLD_DAYS_ : {errcode: '420001', errmsg: '贷款持有天数未满足最少天数,不能进行还款操作'},
    ERR_NOT_SUPPORT_LOAN_REPAYMENT : {errcode: '420002', errmsg: '暂不支持还款操作'},
    ERR_NOT_SUPPORT_LOAN_DELAY : {errcode: '420003', errmsg: '暂不支持延期操作'},
    ERR_NOT_BE_REPAYMENT_STATUS : {errcode: '420004', errmsg: '贷款状态不是待还款状态,不能申请延期'},
    ERR_NOT_BIT_THAN_MINDELAYDAYS : {errcode: '420005', errmsg: '不能申请延期'},
    ERR_LOAN_WRONG_END_DAY : {errcode: '420006', errmsg: '结束日期比开始日期小!'},
    ERR_LOAN_NOT_EXISTS : {errcode: '420007', errmsg: '贷款记录不存在'},
    ERR_LOAN_NOT_IN_SUBMIITTED_OR_IN_AUDITING : {errcode: '420008', errmsg: '贷款记录未进行申请提交或者未在审核中，不能进行审核'},
    ERR_LOAN_STATUS_NOT_SUPPORT_PAY : {errcode: '420009', errmsg: '贷款状态不符合要求，不能进行还款操作'},
    ERR_LOAN_LIST_NOT_EXISTS : {errcode: '420010', errmsg: '贷款列表不存在'},
    ERR_PAYORDERDETAILS_LOAN_LIST_NOT_EXISTS : {errcode: '420011', errmsg: '订单详情中的贷款数据不存在'},
    ERR_LOAN_STATUS_LIST_NOT_EXISTS : {errcode: '420012', errmsg: '订单状态列表不存在'},
    ERR_TASK_NOT_BE_REPAYMENT_STATUS : {errcode: '420013', errmsg: '贷款任务状态不是待还款状态,不能申请延期'},
    ERR_LOAN_UNABLE_TO_CANCEL : {errcode: '420014', errmsg: '贷款状态不是延期申请状态,不能取消'},
    ERR_LOAN_UNABLE_TO_APPROVE : {errcode: '420015', errmsg: '贷款状态不是延期申请状态,不能批准'},
    ERR_LOAN_UNABLE_TO_REFUSE : {errcode: '420016', errmsg: '贷款状态不是延期申请状态,不能拒绝'},
    ERR_ATOM_TASK_IS_NOT_FOUND : {errcode: '420017', errmsg: '原子任务不存在！'},
    ERR_UPDATE_ATOM_STATUS_FAILD : {errcode: '420018', errmsg: '确认已付款失败！'},
    ERR_LOAN_NOT_APPLLY_OR_HANDLING : {errcode: '420019', errmsg: '贷款状态不是延期申请/延期审核中！'},
    ERR_LOAN_NOT_IC_LOAN : {errcode: '420020', errmsg: '该贷款不是收信贷款，不可在后台还款！'},
    ERR_LOAN_TYPE_NOT_SUPPORT_PAY : {errcode: '420021', errmsg: '贷款类型不符合要求，不能进行还款操作'},
    ERR_AMOUNT_BIT_THAN_USABLEAMOUNT : {errcode: '430000', errmsg: '提现金额大于可用现金余额'},
    ERR_WITHDRAW_INSERT_MONEY_RECORD_FALIUR : {errcode: '430001', errmsg: '提现失败!'},
    ERR_WITHDRAW_FROZEN_MONEY_FALIUR : {errcode: '430002', errmsg: '提现失败'},
    ERR_MONEYTYPE_OR_AMOUNT_IS_NULL : {errcode: '430003', errmsg: '充值币种或金额为空'},
    ERR_RECHARGE_APLLY_FAILD : {errcode: '430004', errmsg: '申请充值失败'},
    ERR_RECHARGE_IS_NOT_FOUND : {errcode: '430005', errmsg: '充值记录不存在'},
    ERR_CONFIRM_HAS_PAY_FAILD : {errcode: '430006', errmsg: '确认失败'},
    ERR_DECR_USFRONZE_FAILD : {errcode: '430007', errmsg: '提现失败'},
    ERR_INSERT_WITHDRAW_FALIUR : {errcode: '430008', errmsg: '提现失败!'},
    ERR_WITHDRAW_IS_NOT_FOUND : {errcode: '430009', errmsg: '提现记录不存在'},
    ERR_WITHDRAW_NOT_IN_Handing : {errcode: '430010', errmsg: '提现记录未在处理中状态，不能进行处理'},
    ERR_RECHARGE_LIST_IS_NOT_FOUND : {errcode: '430011', errmsg: '充值列表不存在'},
    ERR_WITHDRAW_LIST_IS_NOT_FOUND : {errcode: '430012', errmsg: '提现列表不存在'},
    ERR_CANCEL_RECHARGE_FAILD : {errcode: '430013', errmsg: '取消充值失败'},
    ERR_RECHARGE_IS_NOT_APLLY_STATUS : {errcode: '430014', errmsg: '该充值不是提交状态，不可取消'},
    ERR_WITHDRAW_NOT_IN_SUBMISSION : {errcode: '430015', errmsg: '提现记录未在提交状态，不能审核'},
    ERR_WITHDRAW_NOT_IN_REVIEWING : {errcode: '430016', errmsg: '提现记录未在审核中状态，不能审核处理'},
    ERR_RECHARGE_NOT_IN_HANDLING : {errcode: '430017', errmsg: '充值记录未在处理中状态，不能进行处理'},
    ERR_INCREASE_CREDIT : {errcode: '440000', errmsg: '授信失败'},
    ERR_INSERT_MONEY_RECORD_CREDIT_FALIUR : {errcode: '440001', errmsg: '授信失败'},
    ERR_INSERT_AUDIT_CREDIT_FAILD : {errcode: '440002', errmsg: '申请授信失败'},
    ERR_USER_BANK_IS_NULL : {errcode: '450000', errmsg: '您还未绑定银行卡，请先绑定银行卡'},
    ERR_USER_BANK_IS_EXIST : {errcode: '450001', errmsg: '您已绑定银行卡，不能重复绑定'},
    ERR_BANK_CODE_IS_NULL : {errcode: '460001', errmsg: '银行编号为空！'},
    ERR_BANK_CODE_IS_NOT_EXISTS : {errcode: '460002', errmsg: '银行不存在！'},
};
function getErrMsgByErrCode(ecode){
    for(var err in ErrorEnum){
        if (err.errcode == ecode)
            return err.errmsg;
    }
    return '未知错误';
};