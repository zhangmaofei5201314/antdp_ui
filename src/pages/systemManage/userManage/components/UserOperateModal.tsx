import React, { FC, useEffect } from 'react';
import { Form, Row, Col, Input, Select, Button, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';

interface UserOperateModalProps {
    onOk: (values: any, form: FormInstance, type: string) => void,
    onCancel?: () => void,
    visible?: boolean,
    roles: object[],
    operate: string,
    current: {
        usercode: string,
        name: string,
        gendor: string,
        mobile: string,
        email: string,
        department: string,
        cmsUserroles: string[]
    },
}

const UserOperateModal: FC<UserOperateModalProps> = (props) => {
    const FormItem = Form.Item;
    const { Option } = Select;
    const [form] = Form.useForm();
    const { visible, onCancel, operate, onOk, roles, current } = props;

    useEffect(() => {
        console.log('回显赋值');

        if (current && form) {
            form.setFieldsValue({
                usercode: current.usercode,
                name: current.name,
                gendor: current.gendor,
                mobile: current.mobile,
                email: current.email,
                cmsUserroles: current.cmsUserroles
            })
        }
    }, [current]);

    useEffect(() => {
        //modal消失，就清空其内部的值
        if (form && !visible) {
            form.resetFields();
        }
    }, [visible]);

    const userSubmit = () => {
        if (!form) return;
        form.submit();
    }
    const onFinish = (values: any) => {
        // console.log('用户数据提交',values);
        // form.resetFields();
        onOk(values, form, operate);

    }
    const ModalProps = {
        // title: operate==='add'?'新增':'修改'`用户`,
        visible: visible,
        // onOk: this.handleOk,
        width: '70%',
        // confirmLoading: modalConfirmLoading,
        onCancel: onCancel,
        forceRender: true,
        maskClosable: false,
        footer: [
            <Button key='back' onClick={onCancel}>取消</Button>,
            <Button key='userAddSubmit' htmlType='submit' onClick={userSubmit} type="primary">提交</Button>
        ]
    }

    // const options = myUtils.roleDataTypeToSelect(roles);
    const options = roles;
    const roleSelectProps = {
        placeholder: "请选择",
        options: options,
        mode: "multiple",
    }
    const formItemLayout = {
        labelCol: {//文字布局

            span: 6
        },
        wrapperCol: {//输入框布局

            span: 18
        },
    };
    return (
        <Modal title={`${operate === 'add' ? '新增' : '修改'}用户`} {...ModalProps}>
            <Form {...formItemLayout} form={form} onFinish={onFinish} >
                <Row >

                    <Col sm={6} xs={24}>
                        <FormItem name='usercode' label='用户名' rules={[{ required: true, message: '用户名不能为空!' }]} >
                            <Input />
                        </FormItem>
                    </Col>

                    <Col sm={6} xs={24}>
                        <FormItem name='name' label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]} >
                            <Input />
                        </FormItem>
                    </Col>

                    <Col sm={6} xs={24}>
                        <FormItem name='gendor' label='性别' rules={[{ required: true, message: '性别不能为空!' }]} >
                            <Select placeholder="请选择" >
                                <Option value="0">男</Option>
                                <Option value="1">女</Option>
                            </Select>
                        </FormItem>
                    </Col>

                    <Col sm={6} xs={24}>
                        <FormItem name='cmsUserroles' label='岗位' rules={[{ required: true, message: '岗位不能为空!' }]} >
                            <Select  {...roleSelectProps} >

                            </Select>
                        </FormItem>
                    </Col>

                    <Col sm={6} xs={24}>
                        <FormItem name='mobile'
                            label='手机号'
                            rules={[{ required: true, message: '手机号不能为空!' }, { pattern: /^1\d{10}$/, message: '手机号格式错误！' }]} >
                            <Input />
                        </FormItem>
                    </Col>

                    <Col sm={6} xs={24}>
                        <FormItem name='email' label='邮箱' rules={[{ required: true, message: '邮箱不能为空!' }, { type: 'email', message: '邮箱格式错误!' }]} >
                            <Input />
                        </FormItem>
                    </Col>

                </Row>
            </Form>

        </Modal>
    )
}

export default UserOperateModal;