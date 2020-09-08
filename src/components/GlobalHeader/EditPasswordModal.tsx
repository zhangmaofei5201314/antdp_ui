import React, { FC, useEffect, useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

interface EditPasswordModalProps {
    onShow?: (values: any, type: string) => void,
    onCancel?: () => void,
    visible?: boolean,

}

const EditPasswordModal: FC<EditPasswordModalProps> = (props) => {

    const { visible, onCancel } = props;
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const editPasswordSubmit = () => {
        if (!form) return;
        form.submit();
    }
    const onFinish = (values: any) => {
        console.log('修改密码提交', values);

    }
    useEffect(() => {
        if (form && !visible) {
            form.resetFields()
        }
    }, [visible])

    const ModalProps = {
        // title: operate==='add'?'新增':'修改'`用户`,
        visible: visible,
        // onOk: this.handleOk,
        width: '20%',
        // confirmLoading: modalConfirmLoading,
        onCancel: onCancel,
        forceRender: true,
        maskClosable: false,
        footer: [
            <Button key='back' onClick={onCancel}>取消</Button>,
            <Button key='editPasswordSubmit' htmlType='submit' onClick={editPasswordSubmit} type="primary">提交</Button>
        ]
    }

    const formItemLayout = {
        labelCol: {//文字布局
            span: 5
        },
        wrapperCol: {//输入框布局
            span: 19
        },
    };

    return (
        <Modal title={'修改密码'} {...ModalProps}>
            <Form {...formItemLayout} form={form} onFinish={onFinish}>

                <FormItem label='原密码 ' name='oldPassword' rules={[{ required: true, message: '不能为空!' }]}>
                    <Input.Password />
                </FormItem>

                <FormItem label={'新密码 '} name='newPassword' rules={[{ required: true, message: '不能为空!' }]}>
                    <Input.Password />
                </FormItem>

                <FormItem label={'确认密码'} name='confirmPassword' rules={[{ required: true, message: '不能为空!' },
                        ({getFieldValue}) => ({
                            validator(rule, value){
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject('密码不一致!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </FormItem>


            </Form>
        </Modal>
    )
}

export default EditPasswordModal