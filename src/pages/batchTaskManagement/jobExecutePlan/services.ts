import request from 'umi-request';
import Constants from '@/utils/Constants';
import myRequest from '../../../utils/myRequest';



// 拉取所有任务的信息列表
export async function queryJobsInfo(params?: any) {
    return request(Constants.baseUrl + '/controller/quartz/management/queryjobplanlist',{
        method: 'GET',
        params
        // data: Constants.stringifyParamter(params),
    })
}

// 根据jobCode获取该任务需要什么参数
export async function queryJobParams(params?: any) {
    return request(Constants.baseUrl + '/controller/quartz/management/getJobParamList',{
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    })
}

// 根据jobplancode启动某个任务
export async function startJob(params?: {}) {    
    return request(Constants.baseUrl + "/controller/quartz/management/startJob", {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    })
}

// 根据jobplancode停止某个任务
export async function stopJob(params?: any) {    
    return request(Constants.baseUrl + "/controller/quartz/management/stopJob", {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    })
}

// 根据jobplancode删除某个任务
export async function deleteJob(params?: any) {    
    return request(Constants.baseUrl + "/controller/quartz/management/deleteJob", {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    })
}

// 获取所有可配置的任务名
export async function queryJobNameList(params?: any) {    
    return request(Constants.baseUrl + "/controller/codeselect", {
        method: "GET",
        params
    })
}


// 新建一个任务
export async function insertJob(params?: any) {    
    return request(Constants.baseUrl + "/controller/quartz/management/insertJob", {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    })
}


// 更新任务
export async function editJob(params?: any) {    
    return request(Constants.baseUrl + "/controller/quartz/management/editJob", {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    })
}

// 获取参数列表的参数
export async function selectReturnView(params?: any) {    
    return request(Constants.baseUrl + "/controller/quartz/management/returnJobView", {
        method: "POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    })
}