import request from 'umi-request';
import Constants from '@/utils/Constants';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request(Constants.baseUrl+'/api/login/account', {
    method: 'POST',
    headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data: Constants.stringifyParamter(params),
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
