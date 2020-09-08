import {queryJobRunLogData} from './service'

const Model = {
    namespace: 'queryJobRunLog',

    state: {
        jobRunLog: [],
    },

    effects: {
        *queryJobRunLog({ payload }:any, { call, put }:any) {
            
            const response = yield call(queryJobRunLogData, payload.values);
            
            yield put({
                type: 'setJobRunLogData',
                payload: response
            })
            

        },
    },

    reducers: {
        setJobRunLogData(state: any, { payload }: any) {           
            return{
                ...state,
                jobRunLog: payload
            }
        },
    }

}

export default Model