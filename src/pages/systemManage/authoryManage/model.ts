import {queryRoleMenusData,saveRoleData,saveRoleMenusData} from './service'
import { message } from 'antd';

const Model = {
    namespace: 'authoryManage',

    state: {
        roleMenus: [],
        
       
    },

    effects: {
        *queryRoleMenus({ payload }:any, { call, put }:any) {
            
            const response = yield call(queryRoleMenusData, payload.values);
            
            yield put({
                type: 'setRoleMenusData',
                payload: response
            })
            

        },
        *saveRole({ payload }:any, { call }:any){
            const response = yield call(saveRoleData, payload.values);
            if(response&&response.status==='ok'){
                message.success('新增角色成功')                
                // payload.userInfoQuery({});
            }else{
                message.error(response.code==='203'?'角色已存在':'新增角色失败')
            }
            return response;
        },
        *saveRoleMenus({ payload }:any, { call }:any){
            const response = yield call(saveRoleMenusData, payload.values);
            if(response&&response.status==='ok'){
                message.success('配置角色成功')                
            }else{
                message.error('配置角色失败')
            }
            return response;
        }
        
        
    },

    reducers: {
        setRoleMenusData(state: any, { payload }: any) {           
            return{
                ...state,
                roleMenus: payload
            }
        },
        
    }
};

export default Model;