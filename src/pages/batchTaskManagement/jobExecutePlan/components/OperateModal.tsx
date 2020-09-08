import React, { FC, useEffect,useState } from 'react';
import { Form, Row, Col, Input, Select, Button, Modal, DatePicker, InputNumber, message, Divider } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormattedMessage } from 'umi'
import moment from 'moment';
import { SelectValue } from 'antd/lib/select';

interface OperateModalProps {
    onOk: (values: any, form: FormInstance, type: string) => void,
    onCancel?: () => void,
    visible?: boolean,
    operate: string,
    current: {
        selectedRowKeys: any,
        row: any
    },
    dispatch: any,
    jobList: any,
    paramList: any,
    setParamList: any
}


const { TextArea } = Input;
const { Option } = Select;

const OperateModal: FC<OperateModalProps> = (props) => {
    
    const FormItem = Form.Item;
    const [form] = Form.useForm();
    const { visible, onCancel, operate, onOk, current, dispatch, jobList, paramList, setParamList } = props;
    
    // console.log("paramList",paramList);
    
    const record = current.row[0]

    const [maxNumOfUnit, setMaxNumOfUnit] = useState<number>(59)
    

    const token = localStorage.getItem('token');

    const getNowDate = () => {
        let today = new Date();

        let month = today.getMonth() + 1;

        month = month < 10 ? '0'+ month.toString() : month;

        let day = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();

        return today.getFullYear() + '-' + month + '-' + day ;
    }

    
    const changeUnit = (value:SelectValue) => {
        switch (value) {
            case "1":
            case "秒":  
            case "2":
            case "分钟": 
                setMaxNumOfUnit(59)
                break;
            case "3":
            case "小时": 
                setMaxNumOfUnit(23)
                break;
            case "4":
            case "天":    
                setMaxNumOfUnit(31)
                break;
            case "5":
            case "月":
                setMaxNumOfUnit(12)
                break;
            case "6":
            case "周":
                setMaxNumOfUnit(7)
                break;
            default:
                message.error(`异常的value值:${value}`)
                return
        }
    }

    /* useEffect(() => {
        if (!visible) {
            form.resetFields()
        }
    },[visible])  */

    useEffect(() => {
        if (current.selectedRowKeys && form) {
            changeUnit(record.repeatUnit || "1")
            if (operate !== 'addNew') {
                if (jobList.length === 1) {
                    form.setFieldsValue({jobCode: jobList[0].value})
                }
                form.setFieldsValue({
                    repeatInterval: record.repeatInterval,
                    repeatUnit: record.repeatUnit,
                    startDate: moment(record.startDate, 'YYYY-MM-DD HH:mm:ss'),
                    endDate: record.endDate ? moment(record.endDate, 'YYYY-MM-DD HH:mm:ss') : moment('9999-12-31', 'YYYY-MM-DD'),
                    jobPlanDesc: record.jobPlanDesc,
                })

                
            } else {
                
                // form.setFieldsValue({
                //     jobName: null,
                //     repeatInterval: null,
                //     repeatUnit: null,
                //     startDate: moment(getNowDate(),"YYYY-MM-DD"),
                //     endDate: moment('9999-12-31', 'YYYY-MM-DD'),
                //     jobPlanDesc: null,
                // })
                form.resetFields()
            }
        }

    }, [operate, current.selectedRowKeys,visible]);



    useEffect(() => {
        if (!current.selectedRowKeys || operate === "addNew") {
            return
        }
        dispatch({
            type: "batchTask/selectReturnView",
            payload: {
                token, 
                jobPlanCode: current.selectedRowKeys[0]
            }
        }).then((res: any) => {
            // console.log("res",res);
            
            for (let i = 0; i < res.paramByCode.length; ++i) {

                const value = res.paramByCode[i].paramCode.indexOf("Date") > 1 ? moment(res.paramByCode[i].paramValue, 'YYYY-MM-DD HH:mm:ss') : res.paramByCode[i].paramValue
                
                form.setFieldsValue({
                    [res.paramByCode[i].paramCode] : value
                })
            }
        })
    },[paramList.length, operate])
    

    const userSubmit = () => {
        if (!form) return;
        form.submit();
    }
    const onFinish = (values: any) => {
        // console.log('用户数据提交',values);

        const paramValue = {}
        if (operate !== "addNew") {
            values.jobPlanCode = current.selectedRowKeys[0]
        }
        paramList.forEach((item) => {
            paramValue[item.paramCode] = values[item.paramCode]
        })

        for (let key in paramValue) {
            if (key.indexOf("date") >= 0 || key.indexOf("Date") >= 0) {
                paramValue[key] = paramValue[key].format("YYYY-MM-DD HH:mm:ss")
            }
        }
        
        values.paramValue = JSON.stringify(paramValue)
        onOk(values, form, operate);
        
    }
    const ModalProps = {
        visible: visible,
        width: '70%',
        onCancel: onCancel,
        forceRender: true,
        maskClosable: false,
        footer: operate === "show" ? "" : [
            <Button key='back' onClick={onCancel}><FormattedMessage id="cancle" /></Button>,
            <Button key='userAddSubmit' htmlType='submit' onClick={userSubmit} type="primary"><FormattedMessage id="submit" /></Button>
        ]
    }

    

    return (
        <Modal title={`${operate === 'addNew' ? '新增' : operate === 'edit' ? '修改' : '查看'}执行计划`} {...ModalProps}>
            <Form form={form} onFinish={onFinish} >
                <Row gutter={20}>

                    <Col sm={12} xs={24}>
                        <FormItem label={<FormattedMessage id="jobExecutePlan.jobName" />} name='jobCode' rules={[{ required: true, message: '任务名不能为空!' }]} >
                            <Select 
                            placeholder={<FormattedMessage id="jobExecutePlan.selectJobName" />}
                            options={jobList}
                            onChange={(value: SelectValue)=>{
                                
                                dispatch({
                                    type: "batchTask/queryJobParams",
                                    payload: {
                                        token, 
                                        jobCode: value
                                    }
                                }).then((res:any) => {
                                    setParamList(res)
                                })
                            }}
                            disabled={operate !== 'addNew'}
                            >
                            </Select>
                        </FormItem>
                    </Col>

                    <Col sm={6} xs={24}>
                        
                        <FormItem label={<FormattedMessage id="jobExecutePlan.repeatInterval" />} name='repeatInterval' rules={[{ required: true, message: '执行频率不能为空!' }]} >
                            {
                                operate === 'show' ? <Input disabled={operate === 'show'}/> : <InputNumber min={1} max={maxNumOfUnit} defaultValue={0} style={{width:"100%"}}/> 
                            }
                        </FormItem>
                    </Col>
                    <Col sm={6} xs={24}>
                        <FormItem label={<FormattedMessage id="jobExecutePlan.repeatUnit" />} name='repeatUnit' rules={[{ required: true, message: '执行单位不能为空!' }]} >
                            <Select 
                            placeholder={<FormattedMessage id="jobExecutePlan.selectRepeatUnit" />}
                            onChange={(value:SelectValue)=>{
                                changeUnit(value)
                            }}
                            disabled={operate === 'show'}
                            >
                                <Option value="1">秒</Option>
                                <Option value="2">分</Option>
                                <Option value="3">时</Option>
                                <Option value="4">日</Option>
                                <Option value="5">月</Option>
                                <Option value="6">周</Option>
                            </Select>
                        </FormItem>
                    </Col>

                    <Col sm={12} xs={24}>

                        <FormItem label={<FormattedMessage id="jobExecutePlan.startDate" />} name='startDate' rules={[{ required: true, message: '开始时间不能为空!' }]} >
                            <DatePicker showTime={true} style={{width:"100%"}} disabled={operate === 'show'}/>
                        </FormItem>

                    </Col>


                    <Col sm={12} xs={24}>

                        <FormItem name='endDate' label={<FormattedMessage id="jobExecutePlan.endDate" />} rules={[{ required: true, message: '结束时间不能为空!' }]}  >
                            <DatePicker showTime={true} style={{width:"100%"}} disabled={operate === 'show'} />
                        </FormItem>

                    </Col>

                    <Col sm={24} xs={24}>

                        <FormItem label={<FormattedMessage id="jobExecutePlan.jobPlanDesc" />} name='jobPlanDesc' >
                            <TextArea disabled={operate === 'show'} rows={4}/>
                        </FormItem>

                    </Col>

                </Row>

                {
                    paramList.length ?  (
                        <>
                            <Divider/> 
                            <Row gutter={20}>
                                {
                                    paramList.map((item, index) => (
                                        <Col sm={6} xs={24}>
                                            <FormItem key={index} label={item.paramName} name={item.paramCode} rules={[{required: true, message: `此项为必填项`}]} >
                                                {
                                                    item.paramCode.indexOf("Date") > 0 ? <DatePicker showTime={true} style={{width:"100%"}} disabled={operate === 'show'} defaultValue={form.getFieldValue(item.paramCode)}/> :
                                                    <Input disabled={operate === 'show'} />
                                                }
                                            </FormItem>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </>
                    ) : ""
                }
            </Form>

        </Modal>
    )
}

export default OperateModal;