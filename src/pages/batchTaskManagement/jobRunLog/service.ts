import myRequest from '../../../utils/myRequest';


export async function queryJobRunLogData(params:{}){
    return myRequest('/controller/log/querylog',params,'form','POST');
}