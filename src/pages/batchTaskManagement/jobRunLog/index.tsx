import React, { useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Row, Col, Select, Table, Button, DatePicker, Space, Tag, } from 'antd';
import { connect, Link, } from 'umi';
import styles from './styles.less'


const jobRunLog: React.FC = (props) => {

    const { Option } = Select;
    const token = localStorage.getItem('token');
    const { dispatch, codeSelect, queryJobRunLog }: any = props;


    const columns = [
        {
            title: '序号',
            render: (text: any, record: any, index: any) => index + 1,
            key: 'serialNo'
        },
        {
            title: '作业名称',
            dataIndex: 'jobName',
            key: 'jobName',
        },
        {
            title: '开始时间',
            dataIndex: 'startDate',
            key: 'startDate',
            valueType: 'textarea',
        },
        {
            title: '结束时间',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: '执行状态',
            dataIndex: 'runState',
            key: 'runState',
        },
        {
            title: '执行结果',
            dataIndex: 'runResult',
            key: 'runResult',
        },
        {
            title: '创建时间',
            dataIndex: 'makeDate',
            key: 'makeDate',
        },
        {
            title: '创建人',
            dataIndex: 'makeUser',
            key: 'makeUser',
        },
        {
            title: '修改时间',
            dataIndex: 'modifyDate',
            key: 'modifyDate',
        },
        {
            title: '修改人',
            dataIndex: 'modifyUser',
            key: 'modifyUser',
        },
        {
            title: '操作',
            render: (text: any, record: any, index: any) => {
                return (
                    <Space size="small">
                        <Link to={{
                            pathname:'/batchTask/jobLogInfo',
                            state: {
                                jobName: record.jobName
                            }
                        }}>
                        <Tag color="blue"
                            onClick={() => logInfoDetail(record.jobName)}
                        >修改</Tag >
                        </Link>
                    </Space>
                )
            }
        }
    ];

    const logInfoDetail =(value:string)=>{

    }

    const queryLog = (values: any) => {
        values.startDate = values.startDate ? values.startDate.format('YYYY-MM-DD HH:mm:ss') : values.startDate;
        values.endDate = values.endDate ? values.endDate.format('YYYY-MM-DD HH:mm:ss') : values.endDate;
        values.token = token;
        console.log('jobRunLog', values);
        dispatch({
            type: 'queryJobRunLog/queryJobRunLog',
            payload: {
                values,
            }
        })

    }
    const onFinishFailed = () => { }

    useEffect(() => {
        const values = {
            codetype: 'job',
            token
        }
        dispatch({
            type: 'codeSelect/queryJobs',
            payload: {
                values,
            }
        })
    }, [])

    const dataSource = queryJobRunLog.jobRunLog.status ? [] : queryJobRunLog.jobRunLog;

    return (
        <PageHeaderWrapper>
            <Card title="查询条件" bordered={false} className={styles.card} >
                <Form onFinish={queryLog} onFinishFailed={onFinishFailed}>
                    <Row gutter={18}>
                        <Col sm={6} xs={24}>
                            <Form.Item label='作业名称' name='jobCode'>
                                <Select
                                    placeholder="请选择"
                                    allowClear={true}
                                    options={codeSelect.jobList}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={6} xs={24}>
                            <Form.Item label='执行开始时间' name='startDate' >
                                <DatePicker showTime={true} format={'YYYY-MM-DD HH:mm:ss'} className={styles.datePicker} />
                            </Form.Item>
                        </Col>
                        <Col sm={6} xs={24}>
                            <Form.Item label='执行结束时间' name='endDate'>
                                <DatePicker showTime={true} className={styles.datePicker} />
                            </Form.Item>
                        </Col>
                        <Col sm={6} xs={24}>
                            <Form.Item label='执行状态' name='runState'>
                                <Select placeholder="请选择" allowClear={true}>
                                    <Option value='0'>执行中</Option>
                                    <Option value='1'>已完成</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col sm={22} xs={0}></Col>

                        <Col sm={1} xs={24}>
                            <Button type="primary" htmlType="submit" >查询</Button>
                        </Col>
                        <Col sm={1} xs={0}></Col>
                    </Row>
                </Form>
            </Card>
            <Card title="查询列表" bordered={false} className={styles.card} >
                <Table
                    bordered={true}
                    // loading={queryLoading}
                    size="middle"
                    columns={columns}
                    dataSource={dataSource}
                    // style={tableStyle}
                    pagination={{ position: ['bottomCenter'], pageSize: 10, defaultCurrent: 1, }}
                />
            </Card>
        </PageHeaderWrapper>
    )
}


export default connect(
    ({ codeSelect, queryJobRunLog }: any) => ({
        codeSelect,
        queryJobRunLog
    })
)(jobRunLog);