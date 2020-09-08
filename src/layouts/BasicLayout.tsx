/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
  SettingDrawer,
} from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Link, useIntl, connect, Dispatch, history } from 'umi';
import { GithubOutlined,HomeOutlined, PicLeftOutlined, SmileOutlined, SettingOutlined,  EditOutlined} from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.png';

const iconEnum = {
  smile: <SmileOutlined />,
  home: <HomeOutlined />,
  picLeft: <PicLeftOutlined />,
  setting: <SettingOutlined />,
  plan: <EditOutlined />
};

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
  menu: any,
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
  console.log(menuList);
  
  return menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  })
};


const serverMenuItem = (menuData: MenuDataItem[]):MenuDataItem[]=>{
  const transMenuItem :MenuDataItem[] = [];
  if(Array.isArray(menuData)){
    menuData.forEach((v) => {
      switch (v.name) {
        case 'systemManage':
          v.icon='setting';
          break;
        case 'batchTaskManagement':
          v.icon='plan'
          break;
      }

      const iconElement: any = v.icon;
      const localV = { ...v, children: v.children ? serverMenuItem(v.children) : [] , icon:iconEnum[iconElement]};
      // const localV = { ...v, children: v.children ? menuDataRender(v.children) : [] , icon:iconApi.iconElement};
      const localMenuDataItem = Authorized.check(v.authority, localV, null) as MenuDataItem;
      transMenuItem.push(localMenuDataItem);
    });
  }
  // console.log('VVVV',transMenuItem);
  return transMenuItem;
};


const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 天霸`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  
  /**
   * constructor
   */
  
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'menu/getMenuData',
      })
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    //展开-收起时的回调函数
  }; // get children authority


  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  const { formatMessage } = useIntl();
  // console.log(props);
  
  return (
    <>
      <ProLayout
        // logo={logo}
        logo={require('../assets/12.png')}
        formatMessage={formatMessage}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        // menuDataRender={menuDataRender}
        // menuDataRender={() => menuData}
        menuDataRender={() => serverMenuItem(props.menu.menuDataItems)}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ settings, menu }: ConnectState) => ({
  menu,
  settings,
}))(BasicLayout);
