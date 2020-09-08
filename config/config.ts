// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/system/userManage',
            },
            {
              path: '/system',
              name: 'systemManage',
              icon: 'dashboard',
              routes: [
                {
                  name: 'userManage',
                  icon: 'smile',
                  path: '/system/userManage',
                  component: './systemManage/userManage',
                },
                {
                  name: 'authoryManage',
                  icon: 'smile',
                  path: '/system/authoryManage',
                  component: './systemManage/authoryManage',
                },
                
              ],
            },
            {
              path: '/batchTask',
              name: 'batchTaskManagement',
              icon: 'dashboard',
              routes: [
                {
                  name: 'jobExecutePlan',
                  path: '/batchTask/jobExecutePlan',
                  component: './batchTaskManagement/jobExecutePlan',
                },
                {
                  name: 'batchTaskJobLog',
                  path: '/batchTask/jobRunLog',
                  component: './batchTaskManagement/jobRunLog',
                },
                {
                  name: 'batchTaskJobLogInfo',
                  path: '/batchTask/jobLogInfo',
                  component: './batchTaskManagement/jobLogInfo',
                },             
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
