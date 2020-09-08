import React, { useState, useEffect } from 'react';
import { connect, } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, TreeSelect, Form, Input, Row, Col, Button, Select } from 'antd';
import myUtils from '@/utils/myUtils';
import styles from './index.less'




const authoryManage: React.FC = (props) => {

    const [treeValue, setTreeValue] = useState<any>([]);
    const [refresh, setRefresh] = useState(true);
    const token = localStorage.getItem('token');
    const [form1] = Form.useForm();
    const [form] = Form.useForm();
    const { dispatch, codeSelect, authoryManage}: any = props;

    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ];

    const onTreeChange = (value: any, label: any, extra: any) => {

        const allEle = myUtils.getTreeNode(codeSelect.menuList||[], value);
        setTreeValue(allEle);
    };


    useEffect(()=>{        
        form1.setFieldsValue({
            cmsRoleMenu: authoryManage.roleMenus
        })
    },[authoryManage.roleMenus]);
    /*useEffect(()=>{        
        form.setFieldsValue({
            roleid: myUtils.roleDataTypeToSelect(codeSelect.roleList)
        })
    },[codeSelect.roleList]);*/

    const tProps = {
        treeData: codeSelect.menuList,
        // value: treeValue,
        treeExpandedKeys: treeValue,
        onChange: onTreeChange,
        treeCheckable: true,
        treeCheckStrictly: true,//断绝父子关系，并且强制 labelInValue 为 true
        // labelInValue: false,
        placeholder: '请选择',

    };

    useEffect(() => {
        
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

    }, [refresh]);
    
    useEffect(() => {
        setTreeValue([])
        const values = {
            codetype: 'menu',
            token
        }
        dispatch({
            type: 'codeSelect/queryMenus',
            payload: {
                values,
            }
        })

    }, []);
    

    const roleAdd = (values:any) => {
        
        if(values){
            values.token=token;
            dispatch({
                type: 'authoryManage/saveRole',
                payload: {
                    values,
                }
            }).then((res: any)=>{                                
                if(res&&res.status==='ok'){
                    form.resetFields();
                    setRefresh(refresh?false:true)
                }
            })
        }
    }
    const roleSet = (values:any) => {
        console.log('roleSet',values);
        if(values){
            let menuids: string[] =[];
            values.cmsRoleMenu.map(({value}:{value:string})=>{
                menuids.push(value);
            })
            values.cmsRoleMenu=menuids;
            values.token=token;
            dispatch({
                type: 'authoryManage/saveRoleMenus',
                payload: {
                    values,
                }
            })
        }
        
    }
    const onFinishFailed = () => { }

    const onSelectChange = (value:any) =>{
        if(value){
            const values = {
                roleId: value,
                token
            }
            dispatch({
                type: 'authoryManage/queryRoleMenus',
                payload: {
                    values,
                }
            })
        }else{
            form.resetFields();
        }     
    }
    // const options = myUtils.roleDataTypeToSelect(codeSelect.roleList||[]);
    const options = codeSelect.roleList||[];
    const roleSelectProps = {
        placeholder: '角色名称',
        options: options,
        allowClear: true,
        onChange: onSelectChange,
        // mode: "multiple",
    }
    
    return (
        <PageHeaderWrapper>
            <Card title="添加角色" bordered={false} className={styles.card} >
                <Form form={form} onFinish={roleAdd} onFinishFailed={onFinishFailed}>
                    <Row gutter={18}>
                        <Col span={1}></Col>
                        <Col span={6}>
                            <Form.Item name='roleName' label='角色名称'>
                                <Input placeholder='角色名称' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col sm={22} xs={0}></Col>

                        <Col sm={1} xs={24}>
                            <Button type="primary" htmlType="submit" >新增</Button>
                        </Col>
                        <Col sm={1} xs={0}></Col>
                    </Row>

                </Form>
            </Card>
            <Card title="配置角色" bordered={false} className={styles.card}>
                <Form form={form1}  onFinish={roleSet} onFinishFailed={onFinishFailed}>
                    <Row gutter={18}>
                        <Col span={1}></Col>
                        <Col span={6}>
                            <Form.Item name='roleid' label='角色名称' >
                                <Select {...roleSelectProps} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name='cmsRoleMenu' label='权限'>

                                <TreeSelect {...tProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col sm={22} xs={0}></Col>

                        <Col sm={1} xs={24}>
                            <Button type="primary" htmlType="submit" >确认</Button>
                        </Col>
                        <Col sm={1} xs={0}></Col>
                    </Row>

                </Form>


            </Card>

        </PageHeaderWrapper>
    )
}

export default connect(
    ( {codeSelect,authoryManage}: any )=>({
        codeSelect,
        authoryManage
    })

)(authoryManage);