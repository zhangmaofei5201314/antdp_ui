import {queryCodeList, queryTreeList} from '../services/codeSelect'



const CodeSelect = {
    namespace: 'codeSelect',

    state: {
        roleList:[],
        menuList: [],
        jobList:[],
    },

    effects: {
        *queryRoles({ payload }:any, { call, put }:any) {
            
            const response = yield call(queryCodeList, payload.values);
            yield put({
                type: 'setRoles',
                payload: response
            })
        },
        *queryJobs({ payload }:any, { call, put }:any) {
            
            const response = yield call(queryCodeList, payload.values);
            yield put({
                type: 'setJobs',
                payload: response
            })
        },
        *queryMenus({ payload }:any, { call, put }:any){
            const response = yield call(queryTreeList, payload.values);
            yield put({
                type: 'setMenus',
                payload: response
            })
        }
    },

    reducers: {
        setRoles(state: any, { payload }: any) {
            // console.log('reducers',payload);            
            return{
                ...state,
                roleList: payload
            }
        },
        setJobs(state: any, { payload }: any) {
                       
            return{
                ...state,
                jobList: payload
            }
        },
        setMenus(state: any, { payload }: any) {
                      
            return{
                ...state,
                menuList: payload
            }
        },
    },
}

export default CodeSelect;

