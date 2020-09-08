import React, { FC, useState, useEffect } from 'react';
import { connect, Dispatch, } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Row, Col, Button, Select, Input, Table, Space, Tag, Popconfirm } from 'antd';
import styles from './index.less'
import UserOperateModal from './components/UserOperateModal'
import { FormInstance } from 'antd/lib/form';

interface UserManageProps {
    dispatch?: Dispatch
}

const fieldLabels = {
    usercode: '用户名',
    gendor: '性别',
    mobile: '手机号',
    email: '邮箱'
}

export const UserManage: FC<UserManageProps> = (props) => {
    const FormItem = Form.Item;
    const { Option } = Select;
    const token = localStorage.getItem('token');

    const { dispatch, userManage, codeSelect, queryLoading }: any = props;
    const [visible, setVisible] = useState<boolean>(false);
    const [operate, setOperate] = useState<string>('');
    const columns = [
        {
            title: '序号',
            render: (text: any, record: any, index: any) => index + 1,
            key: 'serialno'
        },
        {
            title: '用户名',
            dataIndex: 'usercode',
            key: 'usercode',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            valueType: 'textarea',
        },
        {
            title: '性别',
            dataIndex: 'gendor',
            key: 'gendor',
        },
        {
            title: '岗位',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '电话',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '操作',
            key: 'action',
            render: (text: any, record: any, index: any) => {
                return (
                    <Space size="small">
                        <Tag color="blue"
                            onClick={() => userInfoReturn(record.usercode)}
                        >修改</Tag >
                        <Popconfirm
                            title="确定删除此用户吗?"
                            onConfirm={() => userDelete(record.usercode)}
                            // onCancel={cancel}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Tag color="red" >删除</Tag  >
                        </Popconfirm>

                    </Space>
                )
            },
        },
    ]
    //删除用户
    const userDelete = (usercode: string) => {
        const values = {
            usercode,
            token
        }
        dispatch({
            type: 'userManage/deleteUser',
            payload: {
                values,
                userInfoQuery
            }
        })
    }
    //显示修改对话框并回显信息
    const userInfoReturn = (usercode: string) => {
        setVisible(true);
        setOperate('edit');
        const values = {
            usercode,
            token
        }
        dispatch({
            type: 'userManage/queryUserReturnInfo',
            payload: {
                values,
            }
        })
    }
    //显示新增对话框
    const showUserAddModal = () => {
        setVisible(true);
        setOperate('add');
    }
    //用户信息提交
    const userSubmit = (values: any, form: FormInstance, type: string) => {
        if (type === 'add') {
            // console.log('新增用户数据提交',values);
            values.token = token;
            dispatch({
                type: 'userManage/saveUser',
                payload: {
                    values,
                    form,
                    userInfoQuery
                }
            }).then((res: any) => {
                if (res && res.status === 'ok') {
                    setVisible(false);
                }

            })
        } else if (type === 'edit') {
            // console.log('修改用户数据提交',props);
            values.token = token;
            dispatch({
                type: 'userManage/editUser',
                payload: {
                    values,
                    form,
                    userInfoQuery
                }
            }).then((res: any) => {
                if (res && res.status === 'ok') {
                    setVisible(false);
                }
            })

        }
    }

    //关闭对话框
    const onCancel = () => {
        setVisible(false);
    }

    //用户查询
    const userInfoQuery = (values: any) => {
        // console.log('values', props);
        values.token = token;
        dispatch({
            type: 'userManage/queryUsers',
            payload: {
                values
            }
        })
    }
    const onFinishFailed = () => { }

    useEffect(() => {
        if (visible) {
            // console.log(userManage.roleList);
            const values = {
                codetype: 'role',
                token
            }
            dispatch({
                type: 'codeSelect/queryRoles',
                payload: {
                    values,
                }
            })
        }
    }, [visible])

    const tableStyle = {
        marginTop: 24
    }
    return (
        <PageHeaderWrapper >
            <Card title="查询条件" bordered={false} className={styles.card}>
                <Form onFinish={userInfoQuery} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>

                        <Col sm={6} xs={24}>
                            <FormItem name='usercode' label={fieldLabels.usercode}>
                                <Input />
                            </FormItem>
                        </Col>

                        <Col sm={6} xs={24}>
                            <FormItem name='gendor' label={fieldLabels.gendor}>
                                <Select placeholder="请选择" allowClear={true}>
                                    <Option value="0">男</Option>
                                    <Option value="1">女</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col sm={6} xs={24}>
                            <FormItem name='mobile' label={fieldLabels.mobile}>
                                <Input />
                            </FormItem>

                        </Col>
                        <Col sm={6} xs={24}>
                            <FormItem name='email' label={fieldLabels.email}>
                                <Input />
                            </FormItem>
                        </Col>

                    </Row>
                    <Row >
                        <Col sm={20} xs={0}></Col>
                        <Col sm={1} xs={24}>
                            <Button type="primary" htmlType="button" onClick={showUserAddModal} style={{ backgroundColor: "#faad14" }}>新增</Button>
                        </Col>
                        <Col sm={1} xs={0}></Col>
                        <Col sm={1} xs={24}>
                            <Button type="primary" htmlType="submit" loading={queryLoading}>查询</Button>
                        </Col>
                        <Col sm={1} xs={0}></Col>
                    </Row>

                </Form>
            </Card>
            <Card title="查询列表" bordered={false} className={styles.card}>
            <Table
                bordered={true}
                loading={queryLoading}
                size="middle"
                // title={() => '查询表格'}
                columns={columns}
                dataSource={userManage.tableData.status?[]:userManage.tableData}
                style={tableStyle}
                // showSizeChanger={false}                
                pagination={{ position: ['bottomCenter'], pageSize: 10, defaultCurrent: 1, total: userManage.tableData.length }}
            />
            </Card>
            <UserOperateModal onOk={userSubmit} onCancel={onCancel} visible={visible} roles={codeSelect.roleList} operate={operate} current={userManage.userReturnInfo} />
        </PageHeaderWrapper>
    )
}

export default connect(({ userManage, codeSelect, loading }: any) => ({
    userManage,
    codeSelect,
    queryLoading: loading.effects['userManage/queryUsers']
}))(UserManage);