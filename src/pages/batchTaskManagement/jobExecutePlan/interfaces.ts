export interface Quartz {
    key: String;
    jobCode: String;  //任务代码
    jobName: String;  //任务名称
    jobDescribe: String;//任务描述
    jobClassName: String;//任务类名
    makeDate: String;
    makeUser: String;
    modifyDate: String;
    modifyUser: String;

    jobPlanCode: String;//计划代码

    jobPlanDesc: String;//计划描述
    runType: String;//运行方式类型
    cronExp: String;//Cron表达式
    cronExpDesc: String;//Cron描述
    repeatInterval: String;//循环间隔数值
    repeatUnit: String;//执行频率（循环单位）
    startDate: String; //任务生效日期
    endDate: String;//任务失效日期
    useFlag: String;//是否启用
    triggerState: String;//运行状态
    paramValue: String; //参数值
    paramName: String; //参数名称
    paramCode: String; //参数编码
    valueAlias: String; //取值范围

    /*参数*/
    paramStartDate: String;
    paramEndDate: String;
    runState: String;
    IP: String;
}