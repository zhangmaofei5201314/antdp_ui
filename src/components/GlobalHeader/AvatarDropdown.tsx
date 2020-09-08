import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';
// import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import EditPasswordModal from './EditPasswordModal'

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  // currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {

  state = {
    visible: false
  }

  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      localStorage.clear();
      return;
    } else if (key === 'settings') {
      this.setState({
        visible: true
      })
    }

    // history.push(`/account/${key}`);
  };

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  render(): React.ReactNode {
    const {
      // currentUser = {
      //   avatar: '',
      //   name: '',
      // },
      menu,
    } = this.props;

    const currentUser = {
      avatar: '../../../assets/timg.jpg',
      name: localStorage.getItem('userName'),
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            修改密码
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <>
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
            <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} alt="avatar" />
            <span className={`${styles.name} anticon`}>{currentUser.name}</span>
          </span>

        </HeaderDropdown>
        <EditPasswordModal onCancel={this.onCancel} visible={this.state.visible} />
      </>
    ) : (
        <span className={`${styles.action} ${styles.account}`}>
          <Spin
            size="small"
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />
        </span>
      );
  }
}

// export default connect(({ user }: ConnectState) => ({
//   currentUser: user.currentUser,
// }))(AvatarDropdown);
export default connect()(AvatarDropdown);
