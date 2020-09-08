const baseUrl = "http://192.168.43.177:8081/";
// const baseUrl = "http://localhost:8081/";

//将json的数据封装成form的数据
const stringifyParamter=(obj:any)=>{
    const formData: string[] = [];
    Object.keys(obj).forEach(key=>{
      if(Object.prototype.hasOwnProperty.call(obj, key)){//判断key是否在对象obj中
        const item = obj[key];
        if(item !==undefined){
          // formData.push(`${key}=${item && typeof item ==='object' ? JSON.stringify(item) : item}`);//字符串拼接
          if(Array.isArray(item)){
            formData.push(`${key}=${item.join()}`);//字符串拼接,数组的typeof 返回值也是 'object',坑
          }else{
            formData.push(`${key}=${item && typeof item ==='object' ? JSON.stringify(item) : item}`);//字符串拼接
          }
          
            
        }
      }
    });
    return formData.join('&');
  }

export default {baseUrl, stringifyParamter}
