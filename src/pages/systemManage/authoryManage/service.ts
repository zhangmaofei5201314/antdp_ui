import myRequest from '../../../utils/myRequest';


export async function queryRoleMenusData(params:{}){
    return myRequest('/controller/getMenuByRoleid',params,'form','POST');
}

export async function saveRoleData(params:{}){
    return myRequest('/controller/insterRole',params,'form','POST');
}

export async function saveRoleMenusData(params:{}){
    return myRequest('/controller/insertRoleMenu',params,'form','POST');
}