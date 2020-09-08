import { queryUserList, queryUserRoleList,saveUserData,deleteUserData,queryUserReturnData,editUserData } from './service'
import { FormInstance } from 'antd/lib/form';
import { message } from 'antd';


const Model = {
    namespace: 'userManage',

    state: {
        tableData: [],
        
        // addUserModalVisible: true,  这里不控制modal的显示了，有bug（异步），采用返回值的方式
        // editUserModalVisible: true,
        userReturnInfo: {}
    },

    effects: {
        *queryUsers({ payload }:any, { call, put }:any) {
            
            const response = yield call(queryUserList, payload.values);
            
            yield put({
                type: 'setTableData',
                payload: response
            })
            

        },
        
        *saveUser({ payload }:any, { call, put }:any) {
            const response = yield call(saveUserData, payload.values);
            console.log('保存用户返回值',response);
            if(response&&response.status==='ok'){
                message.success('新增用户成功')
                // yield put({
                //     type: 'setAddUserModalVisible',
                //     payload: payload.form,
                // })
                payload.userInfoQuery({});
            }else{
                message.error(response.code==='202'?'用户已存在':'新增用户失败')
            }
            return response;
        },
        *deleteUser({ payload }:any, { call, put }:any){
            const response = yield call(deleteUserData, payload.values);
            
            if(response&&response.status==='ok'){              
                message.success('删除用户成功')
                payload.userInfoQuery({});
            }else {
                message.error('删除用户失败')
            }
        },
        *queryUserReturnInfo({payload}:any, {call, put}:any){
            const response = yield call(queryUserReturnData, payload.values);
            yield put({
                type: 'setUserReturnInfo',
                payload: response
            })
            
        },
        *editUser({ payload }:any, { call, put }:any) {
            const response = yield call(editUserData, payload.values);
            console.log('修改用户返回值',response);
            if(response&&response.status==='ok'){
                message.success('修改用户成功')
                // yield put({
                //     type: 'setEditUserModalVisible',
                //     payload: payload.form,
                // })
                payload.userInfoQuery({});
            }else{
                message.error('修改用户失败')
            }
            return response;
        },
    },

    reducers: {
        setTableData(state: any, { payload }: any) {           
            return{
                ...state,
                tableData: payload
            }
        },
        
        setAddUserModalVisible(state: any, { payload }: {payload:FormInstance}) {
            //提交成功，清空表单中的值  --- 不在这里清空了，保留代码作案例
            // if(payload){
                // payload.resetFields();
            // }
            return{
                ...state,
                addUserModalVisible: false
            }
        },
        setUserReturnInfo(state:any,{payload}:any){
            return{
                ...state,
                userReturnInfo:payload
            }
        },
        setEditUserModalVisible(state: any, { payload }: {payload:FormInstance}) {
            //提交成功，清空表单中的值  --- 不在这里清空了，保留代码作案例
            // if(payload){                             
                // payload.resetFields();
            // }
            return{
                ...state,
                editUserModalVisible: false
            }
        },
    }
};

export default Model;
