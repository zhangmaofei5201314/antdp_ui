import Constants from "./Constants";
import request from "./request";


const myRequest = (url:string,obj:{},dataType:string,method:string)=>{
    if(dataType==='form'&& method==='POST'){
        return request(Constants.baseUrl + url, {
            method: 'POST',
            headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: Constants.stringifyParamter(obj),            
        });
    }else if(dataType==='json'&& method==='POST'){
        return request(Constants.baseUrl + url, {
            method: 'POST',            
            data: obj,           
        });
    }else if(method==='GET'){
        return request(Constants.baseUrl + url, {
            method: 'GET',            
            params: obj,           
        });
    }
}

export default myRequest;