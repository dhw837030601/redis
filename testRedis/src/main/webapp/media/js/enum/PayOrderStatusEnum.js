//自动生成对应的js代码 PayOrderStatusEnum.js...
//由PayOrderStatusEnum.java自动生成，请勿自己改动，如需改动，请先改动PayOrderStatusEnum.java后，自动生成...
//Mon Aug 28 11:07:23 CST 2017
var PayOrderStatusEnum = {
    PENDING_PAY : {value: '0', name: '待支付'},
    CANCEL_PAY : {value: '10', name: '用户取消支付'},
    TIME_OUT_CANCEL_PAY : {value: '20', name: '超时取消支付'},
    PAY_PRE_PROCESSING : {value: '30', name: '支付预处理中'},
    LOAN_REVIEWING : {value: '40', name: '贷款审核中'},
    LOAN_FAILURE : {value: '50', name: '贷款失败'},
    PAY_PROCESSING : {value: '60', name: '支付处理中'},
    PAY_CANCELING : {value: '70', name: '支付取消中'},
    PAY_FAILED : {value: '90', name: '支付失败'},
    PAY_SUCCESS : {value: '80', name: '支付成功'},
    USER_CANCELLED_PAYMENT : {value: '100', name: '用户取消支付'},
};
/*function getNameByValue(value){
    for(var enum in PayOrderStatusEnum){
        if (enum.value == value)
            return enum.name;
    }
    return '';
};*/