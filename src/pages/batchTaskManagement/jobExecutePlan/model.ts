import * as service from './services'


const Model = {
    namespace: 'batchTask',
    state: {
        dataSource: []
    },
    effects: {
        *queryJobs(state:any, func:any){
            
            const res = yield func.call(service.queryJobsInfo, state.payload)
            
            yield func.put(
                {
                    type: "setDataSource",
                    payload: res
                }
            )
        },
        *queryJobParams({payload}:any, {call,put}:any){
            
            const res = yield call(service.queryJobParams, payload)
            
            return res
        },
        *queryJobNameList ({payload}:any, {call}:any) {
            payload.codetype = "job"
            return yield call(service.queryJobNameList, payload)
             
        },
        *stopJob({payload}:any, {call}:any) {
            return yield call(service.stopJob, payload)
        },
        *startJob({payload}:any, {call}:any) {
            return yield call(service.startJob, payload)
        },
        *deleteJob({payload}:any, {call}:any) {
            return yield call(service.deleteJob, payload)
        },
        *insertJob({payload}:any, {call}:any) {
            console.log("params", payload);
            
            return yield call(service.insertJob, payload)
        },
        *editJob({payload}:any, {call}:any) {
            return yield call(service.editJob, payload)
        },
        *selectReturnView({payload}:any, {call}:any) {
            return yield call(service.selectReturnView, payload)
        }
    }, 
    
    //reducers 等同于 redux 里的 reducer，接收 action，同步更新 state
    reducers: {
        setDataSource(state:any, obj:any){
            return {
                ...state,
                dataSource: obj.payload
            }
        },
        setJobParams(state:any, {payload}:any) {
            return {
                ...state,
                payload
            }
        }
    }   
} 

export default Model