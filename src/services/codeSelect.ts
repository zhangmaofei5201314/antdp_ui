import request from 'umi-request';
import Constants from '@/utils/Constants';
import myRequest from '../../../utils/myRequest';


export async function queryCodeList(params?: any) {
    return request(Constants.baseUrl + '/controller/codeselect', {
        method: 'GET',
        params
    });
}

export async function queryTreeList(params?: any) {
    return request(Constants.baseUrl + '/controller/treeselect', {
        method: 'GET',
        params
    });
}