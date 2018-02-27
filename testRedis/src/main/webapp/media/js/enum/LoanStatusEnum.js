//自动生成对应的js代码 LoanStatusEnum.js...
//由LoanStatusEnum.java自动生成，请勿自己改动，如需改动，请先改动LoanStatusEnum.java后，自动生成...
//Mon Aug 28 10:33:26 CST 2017
var LoanStatusEnum = {
    SUBMIITTED : {value: '0', name: '申请提交'},
    IN_AUDITING : {value: '10', name: '审核中'},
    REFUSED : {value: '20', name: '拒绝'},
    APPROVED : {value: '30', name: '批准'},
    IN_CANCELING : {value: '40', name: '取消中'},
    CANCEL : {value: '50', name: '取消'},
    IN_RELEASING : {value: '60', name: '放款中'},
    REPAYMENT_PENDING : {value: '70', name: '待还款'},
    DELAY_AUDITING : {value: '80', name: '延期审核中'},
    IN_DELAY : {value: '90', name: '延期'},
    In_OVERDUE : {value: '100', name: '逾期'},
    REPAYMENT_PREPARE : {value: '110', name: '还款准备'},
    IN_REPAYING : {value: '120', name: '还款中'},
    COMPLETE : {value: '130', name: '完成'},
    LOAN_POST_TREATMENT : {value: '140', name: '放款后处理'},
    IN_DELAY_OVERDUE : {value: '150', name: '延期后逾期'},
    APPLY_DELAY : {value: '160', name: '延期申请'},
};
/*function getNameByValue(value){
    for(var enum in LoanStatusEnum){
        if (enum.value == value)
            return enum.name;
    }
    return '';
};*/