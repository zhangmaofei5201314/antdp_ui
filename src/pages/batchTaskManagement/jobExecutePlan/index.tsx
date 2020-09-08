import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, message,Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {connect, FormattedMessage} from 'umi'
import OperateModal from "./components/OperateModal"
import { FormInstance } from 'antd/lib/form';
import * as interfaces from "./interfaces"
import showMessage from '../../../utils/message'


const JobExecutePlan: React.FC = (props) => {
       
    const {dispatch, store}:any = props; 

    const [visible, setVisible] = useState<boolean>(false);
    const [operate, setOperate] = useState<string>('');
    const [jobList, setjobList] = useState([])

    const [refresh, setRefresh] = useState(1)

    const token = localStorage.getItem('token');

    const deleteJob = (jobPlanCode:String, paramValue:String) => {
        dispatch({
            type: "batchTask/deleteJob",
            payload: {
                token,jobPlanCode,paramValue
            }
        }).then((res: any) => {
            console.log("res",res);
            showMessage(res)
            if (res.status === "success") {
                setRefresh(new Date().getTime())
            }
            
        })
    }

    const changeJobStatus = (jobPlanCode:String, runState: String, paramValue: String) => {
        const payload = {
            jobPlanCode, token, paramValue
        }
        const type = runState === "停止运行" ? "batchTask/startJob" : "batchTask/stopJob"  
        
        dispatch({
            type,
            payload
        }).then((res: any) => {
            showMessage(res)
            if (res.code === '200') {
                setRefresh(new Date().getTime())
            }
        })
    }

    const cols = [
        {
            title: <FormattedMessage 
                id="jobExecutePlan.index"
                defaultMessage="jobExecutePlan.index"
            />,
            render: (text: any, record: interfaces.Quartz, index: number) => index + 1,
            key: 'serialno'
        },
        {
            title: <FormattedMessage 
                id="jobExecutePlan.jobName"
                defaultMessage="jobExecutePlan.jobName"
            />,
            dataIndex: 'jobName',
            key: 'jobName',
        },
        {
            title: <FormattedMessage 
                id="jobExecutePlan.jobPlanDesc"
                defaultMessage="jobExecutePlan.jobPlanDesc"
            />,
            dataIndex: 'jobPlanDesc',
            key: 'jobPlanDesc',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage 
                id='jobExecutePlan.paramValue'
                defaultMessage="jobExecutePlan.paramValue"
            />,
            dataIndex: 'paramValue',
            key: 'paramValue',
        },
        {
            title: <FormattedMessage 
                id="jobExecutePlan.repeatInterval"
                defaultMessage="jobExecutePlan.repeatInterval"
            />,
            dataIndex: 'repeatInterval',
            key: 'repeatInterval',
            render: (text: any, record: interfaces.Quartz, index: number) => {
                let unit = "";
                switch (record.repeatUnit) {
                    case "1":
                        unit = "秒"
                        break;
                    case "2":
                        unit = "分钟"
                        break;
                    case "3":
                        unit = "小时"
                        break;
                    case "4":
                        unit = "天"
                        break;
                    case "5":
                        unit = "个月"
                        break;
                    case "6":
                        unit = "周"
                        break;
                }

                return `每${record.repeatInterval}${unit}一次`
            }
        },
        {
            title: <FormattedMessage 
                id="jobExecutePlan.startDate"
                defaultMessage="jobExecutePlan.startDate"
            />,
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: <FormattedMessage 
                id="jobExecutePlan.useFlag"
                defaultMessage="jobExecutePlan.useFlag"
            />,
            dataIndex: 'useFlag',
            key: 'useFlag',
        },
        {
            title: <FormattedMessage 
                id="jobExecutePlan.runState"
                defaultMessage="jobExecutePlan.runState"
            />,
            dataIndex: 'runState',
            key: 'runState',
        },
        {
            title: <FormattedMessage 
                id="jobExecutePlan.action"
                defaultMessage="jobExecutePlan.action"
            />,
            key: 'action',
            render: (text: any, record: interfaces.Quartz, index: number) => {
                return (
                    <>
                        <Popconfirm
                        title={`确定要${record.runState === "停止运行" ? "启动" : "停止"}该任务吗?`}
                        onConfirm={() => {
                            changeJobStatus(record.jobPlanCode, record.runState, record.paramValue)
                            setRefresh(new Date().getTime())
                        }
                            
                        }
                        >
                            <Button size={"small"} style={{backgroundColor: '#C90', color: '#fff'}}><FormattedMessage id={record.runState === "停止运行" ? "startUp" : "stop"}/></Button>
                        </Popconfirm>
                        <Popconfirm
                        title={"确定要删除该条记录吗"}
                        onConfirm={() => {deleteJob(record.jobPlanCode, record.paramValue)}}
                        >
                            <Button size={"small"} style={{backgroundColor: '#C33', color: '#fff'}}><FormattedMessage id="delete"/></Button>
                        </Popconfirm>
                        
                        
                    </>
                )
            },
        },
    ]

    // const [data, setData] = useState(datas)

    // setData(dataSource)

    useEffect(() => {
        dispatch({
            type: "batchTask/queryJobs",
            payload: {
                token
            }
        })
    },[refresh])

    const [record, setRecord] = useState({
        selectedRowKeys: null,
        row: [{}]
    })


    const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
            setRecord({selectedRowKeys, row: selectedRows})
        }
    }

    //关闭对话框
    const onCancel = () => {
        setVisible(false);
    }


    //用户信息提交
    const userSubmit = (values: any, form: FormInstance, type: string) => {
        // console.log(values);

        if (values.startDate > values.endDate) {
            message.error("起始时间不能大于结束时间");
            return
        }
        
        for (let key in values) {
            if (key.indexOf("date") >= 0 || key.indexOf("Date") >= 0) {
                values[key] = values[key].format("YYYY-MM-DD HH:mm:ss")
            }
        }

        values.token = token
        values.jobcode = record.row[0].jobcode

        if (!values.jobPlanDesc) {
            values.jobPlanDesc = ""
        }
        
        if (type === 'addNew') {
            // console.log('新增用户数据提交',values);
            dispatch({
                type: 'batchTask/insertJob',
                payload: values
            }).then((res: any) => {
                showMessage(res)
                if (res && res.status === 'success') {
                    setVisible(false);
                    setRefresh(new Date().getTime())
                }
            })
        } else if (type === 'edit') {
            // console.log('修改用户数据提交',props);
            dispatch({
                type: 'batchTask/editJob',
                payload: values
            }).then((res: any) => {
                showMessage(res)
                if (res && res.status === 'success') {
                    setVisible(false);
                    setRefresh(new Date().getTime())
                }
            })
        }
  
        
    }

    const [paramList, setParamList] = useState([])
    
    return (
        <PageHeaderWrapper>
            <Card bordered={false} style={{ marginBottom: 20 }}>
                <Button
                type={"primary"}
                icon={<PlusOutlined/>}
                onClick={() => {
                    dispatch({
                        type: "batchTask/queryJobNameList",
                        payload: {
                            token
                        }
                    }).then((res: any) => {
                        setjobList(res)
                    })

                    setParamList([])
                    setOperate("addNew")
                    setVisible(true)
                }}
                ><FormattedMessage id="addNew"/></Button>
                <Button
                type={"primary"}
                style={{marginLeft: "5px"}}
                icon={<EditOutlined/>}
                onClick={() => {
                    if (!record.selectedRowKeys) {
                        message.info("请选择要修改的任务")
                        return
                    }

                    setjobList([
                        {
                            label: record.row[0].jobName,
                            value: record.row[0].jobCode
                        }
                    ])
                    
                    dispatch({
                        type: "batchTask/queryJobParams",
                        payload: {
                            token, 
                            jobCode: record.row[0].jobCode
                        }
                    }).then((res:any) => {
                        setParamList(res)
                    })
                    setOperate("edit")
                    setVisible(true)
                }}
                ><FormattedMessage id="edit"/></Button>
                <Button
                type={"primary"}
                style={{marginLeft: "5px"}}
                icon={<EyeOutlined />}
                onClick={() => {
                    if (!record.selectedRowKeys) {
                        message.info("请选择要查看的任务")
                        return
                    }
                    setOperate("show")
                    setVisible(true)
                }}
                ><FormattedMessage id="show"/></Button>
            </Card>
            <Card>
                <Table 
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }} 
                    dataSource={store.dataSource} 
                    columns={cols}
                    pagination={{ position: ['bottomCenter'], pageSize: 10, defaultCurrent: 1}}
                >
                </Table>
            </Card>
            <OperateModal paramList={paramList} setParamList={setParamList} onOk={userSubmit} onCancel={onCancel} jobList={jobList} visible={visible} operate={operate} current={record} dispatch={dispatch} />
        </PageHeaderWrapper> 
    )
}

export default connect(({batchTask,Loading}:any)=>({
    store: batchTask
}))(JobExecutePlan)