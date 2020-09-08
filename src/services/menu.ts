import request from '@/utils/request';
import Constants from '../utils/Constants'

export async function getMenuData(token:any) {

  const p = {
    token
  }
  const pp=Constants.stringifyParamter(p);

  return request(`${Constants.baseUrl}controller/antd/getUserMenu`, {
    method: "POST",
    headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data: pp,  
  });
}

