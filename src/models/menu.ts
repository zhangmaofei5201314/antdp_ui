import { Effect, Reducer } from 'umi';
import { getMenuData } from '@/services/menu';
import { MenuDataItem } from '@ant-design/pro-layout';



export interface MenuModelType {
  namespace: 'menu';
  state: {};
  effects: {
    getMenuData: Effect;
  };

  reducers: {
    getMenuDataInfo: Reducer
  }
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    menuDataItems: [],
  },

  effects: {
    *getMenuData(_, { call, put }) {
      
      const token = localStorage.getItem('token');
      
      const response = yield call(getMenuData, token);
      
      yield put({
        type: "getMenuDataInfo",
        payload: response,
      });
      return response
    }
  },

  reducers: {
    getMenuDataInfo(state, {payload}){
      
      return {
        ...state, 
        menuDataItems: payload.menus
      }
    }
  }

  
};

export default MenuModel;
