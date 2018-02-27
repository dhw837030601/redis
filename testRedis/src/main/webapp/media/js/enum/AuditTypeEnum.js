//自动生成对应的js代码 AuditTypeEnum.js...
//由AuditTypeEnum.java自动生成，请勿自己改动，如需改动，请先改动AuditTypeEnum.java后，自动生成...
//Tue Aug 29 19:26:23 CST 2017
var AuditTypeEnum = {
    CREDIT : {value: '0', name: '授信审核'},
    USER_MODIFY : {value: '10', name: '用户信息修改审核'},
    LOAN_APPLICATION : {value: '20', name: '贷款申请审核'},
    LOAN_DELAY : {value: '30', name: '贷款延期申请审核'},
    CASH : {value: '40', name: '提现审核'},
    CASH_PAY : {value: '43', name: '提现支付审核'},
    PAY_AUDIT : {value: '50', name: '支付审核'},
    PAY_CONFIRM : {value: '60', name: '充值确认审核'},
    LOAN_AUDIT : {value: '70', name: '放款审核'},
};
/*function getNameByValue(value){
    for(var enum in AuditTypeEnum){
        if (enum.value == value)
            return enum.name;
    }
    return '';
};*/
