import request from 'umi-request';
import Constants from '@/utils/Constants';
import myRequest from '../../../utils/myRequest';

export async function queryUserList(params?: any) {
    return request(Constants.baseUrl + '/controller/queryusers', {
        method: 'POST',
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data: Constants.stringifyParamter(params),
    });
}

export async function queryUserRoleList(params?: any) {
    return request(Constants.baseUrl + '/controller/codeselect', {
        method: 'GET',
        params
    });
}

export async function saveUserData(params:{}){
    return myRequest('/controller/saveUser',params,'form','POST');
}

export async function deleteUserData(params:{}){
    return myRequest('/controller/deleteUser',params,'form','POST');
}

export async function queryUserReturnData(params:{}){
    return myRequest('/controller/userInfoReturn',params,'form','POST');
}

export async function editUserData(params:{}){
    return myRequest('/controller/editUser',params,'form','POST');
}