import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Row, Col } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginFrom from './components/Login';
import logo from '../../../assets/newLogo1.png';


const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userAndlogin = {}, submitting } = props;
  console.log("props", props);

  const { status, type: loginType } = userAndlogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
        type,
      },
    });
  };

  return (
    <Row>
      <Col span={8}>
        <div className={styles.main}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Tab key="account" style={{marginTop: "130px"}}>
              
              <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center", width: "100%"}}>
                <img alt="logo" className={styles.logo} src={logo} width={181} />
                <p
                  className={styles.title}
                  style={{ fontSize: '33px', fontWeight: 300, color: 'black' }}>系统登陆</p>
              </div>
              {status === 'error' && !submitting && (
                <LoginMessage content="账户或密码错误（admin/ant.design）" />
              )}
              <UserName
                name="userName"
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </Tab>
            <Submit loading={submitting}>登录</Submit>
          </LoginFrom>
        </div>
      </Col>
    </Row>

  );
};

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)(Login);
