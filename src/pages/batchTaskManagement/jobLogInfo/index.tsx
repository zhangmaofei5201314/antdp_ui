import React from 'react'
import { Card, Tabs, Table, Descriptions } from 'antd';
import styles from './style.less'



const jobLogInfo: React.FC = (props) => {

    console.log(props);
    const { TabPane } = Tabs;

    const cardStyle = {
        margin: 24
    }

    const smColumns: {}[] = [
        {
            title: '短信发送时间',
            dataIndex: 'sendDate',
            key: 'sendDate',
        },
        {
            title: '短信内容',
            dataIndex: 'smContent',
            key: 'smContent',
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '发送状态',
            dataIndex: 'sendStatus',
            key: 'sendStatus',
        },
    ]
    const smData: {}[] = [
        {
            sendDate: '2020-09-04 16:00:01',
            smContent: '尊敬的赵四先生，您申请的保单***095688已生效。',
            phone: '1308813800',
            sendStatus: '发送成功',
        }
    ]


    const pointColumns: {}[] = [
        {
            title: '积分变动日期',
            dataIndex: 'pointChangeData',

        },
        {
            title: '积分类型',
            dataIndex: 'pointType',

        },
        {
            title: '积分变动值',
            dataIndex: 'point',

        },
        {
            title: '积分状态',
            dataIndex: 'pointStatus',

        },
    ]
    const pointData: {}[] = [
        {
            pointChangeData: '2020-09-04 16:15:02',
            pointType: '客服节注册',
            point: '50',
            pointStatus: '正常'
        }
    ]

    const xxColumns: {}[] = [
        {
            title: '服务流水号',
            dataIndex: 'pointChangeData',

        },
        {
            title: '服务类型',
            dataIndex: 'pointType',

        },
        {
            title: '服务记录日期',
            dataIndex: 'point',

        },
        {
            title: '第三方服务商',
            dataIndex: 'pointStatus',

        },
    ]

    const xsColumns: {}[] = [
        {
            title: '线上服务类型',
            dataIndex: 'pointChangeData',

        },
        {
            title: '服务状态',
            dataIndex: 'pointType',

        },
        {
            title: '激活年度',
            dataIndex: 'point',

        },
        {
            title: '体检机构',
            dataIndex: 'pointStatus',

        },
        {
            title: '体检套餐',
            dataIndex: 'pointStatus',

        },
        {
            title: '自/免费',
            dataIndex: 'pointStatus',

        },
        {
            title: '服务申请日期',
            dataIndex: 'pointStatus',

        },
        {
            title: '完成日期',
            dataIndex: 'pointStatus',

        },
    ]

    const xcColumns: {}[] = [
        {
            title: '服务项目',
            dataIndex: 'pointChangeData',

        },
        {
            title: '服务项目总次数',
            dataIndex: 'pointType',

        },
        {
            title: '服务项目剩余次数',
            dataIndex: 'point',

        },
        {
            title: '服务所属年度',
            dataIndex: 'pointStatus',

        },
    ]

    const fxqtbColumns: {}[] = [

        {
            title: '保单号',
            dataIndex: 'contno',

        },
        {
            title: '生效日期',
            dataIndex: 'tbData',

        },
        {
            title: '险种名称',
            dataIndex: 'riskType',

        },
        {
            title: '期缴保费',
            dataIndex: 'yearPrem',

        },
        {
            title: '缴费年期',
            dataIndex: 'premYear',

        },
        {
            title: '年收入',
            dataIndex: 'yearSalary',

        },
        {
            title: '工作单位',
            dataIndex: 'department',

        },
        {
            title: '职业',
            dataIndex: 'occ',

        },
        {
            title: '付款银行',
            dataIndex: 'bank',

        },
        {
            title: '付款账号',
            dataIndex: 'bankCode',

        },
        {
            title: '投保人',
            dataIndex: 'appnt',

        },
        {
            title: '被保险人',
            dataIndex: 'insured',

        },
        {
            title: '指定受益人',
            dataIndex: 'goodas',

        },
    ]

    const fxqtbData = [
        {
            tbData: '2020-09-01',
            contno: '92005628799462',
            riskType: '意外险',
            yearPrem: '2000',
            premYear: '2020年',
            yearSalary: '10万',
            department: '无',
            occ: '长短工',
            bank: '中国农业银行北京分行',
            bankCode: '6230**********29078	',
            appnt: '张三',
            insured: '张小三',
            goodas: '张小三'
        }
    ]

    const fxqbqColumns: {}[] = [
        {
            title: '保单号',
            dataIndex: 'contno',
        },
        {
            title: '保全项目',
            dataIndex: 'bqProject',
        },
        {
            title: '确认日期',
            dataIndex: 'comDate'
        },
        {
            title: '保全批单内容',
            dataIndex: 'pdContent',
        },
    ]

    const fxqbqData = [
        {
            comDate: '2020-09-01 08:00:05',
            bqProject: '修改证件类型',
            contno: '92005628799462',
            pdContent: '你会发现加上了颜色 但是这样就好了吗，并不是，因为你会发现这样一改之后整个项目所有的 select 框都变成了这个颜色',
        }
    ]

    const baseInfoColums = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '国籍',
            dataIndex: 'nation'
        },
        {
            title: '性别',
            dataIndex: 'sex'
        },
        {
            title: '证件类型',
            dataIndex: 'documentType'
        },
        {
            title: '证件号码',
            dataIndex: 'documentNo'
        },
        {
            title: '证件有效期',
            dataIndex: 'documentValiDate'
        },
        {
            title: '联系电话',
            dataIndex: 'phone'
        },
        {
            title: '地址',
            dataIndex: 'address'
        },
        {
            title: '职业',
            dataIndex: 'occ'
        },
        {
            title: '是否报送过大额交易',
            dataIndex: 'big'
        },
        {
            title: '大额交易次数',
            dataIndex: 'bigCount'
        },
        {
            title: '是否报送过可疑交易',
            dataIndex: 'keyi'
        },
        {
            title: '可疑交易次数',
            dataIndex: 'keyiCount'
        }
    ]
    const baseInfoData = [{
        name: '张三',
        nation: '中国',
        sex: '男',
        documentType: '身份证',
        documentNo: '625789199605246978',
        documentValiDate: '2025-09-07',
        phone: '13088130888',
        address: '佳木斯',
        occ: '长短工',
        big: '是',
        bigCount: '3',
        keyi: '否',
        keyiCount: '-'
    }]

    const fxqlpColumns = [
        {
            title: '日期',
            dataIndex: 'claimDate'
        }, {
            title: '保单号',
            dataIndex: 'contno'
        }, {
            title: '赔案号',
            dataIndex: 'cliamNo'
        }, {
            title: '赔付结论',
            dataIndex: 'pfjl'
        }, {
            title: '赔付金额',
            dataIndex: 'money'
        }, {
            title: '领款人姓名',
            dataIndex: 'name'
        }, {
            title: '证件类型',
            dataIndex: 'documentType'
        }, {
            title: '证件号',
            dataIndex: 'documentNo'
        },
    ]

    const fxqlpData = [
        {
            claimDate: '2020-09-08',
            contno: '925001234568795',
            cliamNo: '9531457624',
            pfjl: '正常给付',
            money: '380.0',
            name: '张小三',
            documentType: '身份证',
            documentNo: '620132200407081265'
        }
    ]

    const lphistory = [
        {
            title: '案件号',
            dataIndex: 'caseNo'
        },
        {
            title: '保单号',
            dataIndex: 'contNo'
        },
        {
            title: '所属机构',
            dataIndex: 'department'
        },
        {
            title: '险种名称',
            dataIndex: 'riskName'
        },
        {
            title: '被保险人',
            dataIndex: 'insured'
        },
        {
            title: '立案日期',
            dataIndex: 'caseDate'
        },
        {
            title: '案件类型',
            dataIndex: 'caseType'
        },
        {
            title: '结案日期',
            dataIndex: 'endDate'
        },
        {
            title: '事故日期',
            dataIndex: 'accidentDate'
        },
        {
            title: '事故类型',
            dataIndex: 'accidentType'
        },
        {
            title: '事故原因',
            dataIndex: 'accidentReason'
        },
        {
            title: '就诊医院',
            dataIndex: 'yy'
        },
        {
            title: '赔付结论',
            dataIndex: 'pfjl'
        },
        {
            title: '赔付金额',
            dataIndex: 'pfje'
        },
        {
            title: '拒付金额',
            dataIndex: 'jfje'
        },
        {
            title: '保单渠道',
            dataIndex: 'qd'
        },
    ]

    const lpData = [
        {
            caseNo: '925468751',
            contNo: '931254622001236',
            department: '北京分公司',
            riskName: '百万医疗',
            insured: '张小三',
            caseDate: '2020-9-7',
            caseType: '正常受理',
            endDate: '2020-9-8',
            accidentDate: '2020-9-6',
            accidentType: '意外',
            accidentReason: '交通事故',
            yy: '北京儿童医院',
            pfjl: '正常给付',
            pfje: '2450.0',
            jfje: '0',
            qd: '个人营销'
        }
    ]

    return (
        <>
            <Card title="客户接触历史" bordered={true} className={styles.cardBorder}>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="短信历史" key="1">
                        <Table columns={smColumns} dataSource={smData} />
                    </TabPane>
                    <TabPane tab="微信访问历史" key="2">
                        Content of Tab Pane 2
                </TabPane>
                    <TabPane tab="官网访问历史" key="3">
                        Content of Tab Pane 3
                </TabPane>
                    <TabPane tab="信函历史" key="4">
                        Content of Tab Pane 3
                </TabPane>
                </Tabs>
            </Card>
            <Card title="客户积分列表" bordered={true} className={styles.cardBorder} >
                当前积分余额 : 100
                <Table columns={pointColumns} dataSource={pointData} />
            </Card>
            <Card title="客户服务项目" bordered={true} className={styles.cardBorder} >
                <Card size="small" title="线下服务记录" bordered={true} className={styles.cardBorder} >
                    <Table columns={xxColumns} dataSource={smData} />
                </Card>
                <Card size="small" title="线上申请服务记录" bordered={true} className={styles.cardBorder} >
                    <Table columns={xsColumns} dataSource={smData} />
                </Card>
                <Card size="small" title="可享受的附加值服务项目及次数" bordered={true} className={styles.cardBorder} >
                    <Table columns={xcColumns} dataSource={smData} />
                </Card>
            </Card>

            <Card title="反洗钱参考信息" bordered={true} className={styles.cardBorder} >
                <Card size="small" title="客户基本信息" bordered={true} className={styles.cardBorder} >
                    <Table columns={baseInfoColums} dataSource={baseInfoData} />
                </Card>
                <Card size="small" title="投保信息" bordered={true} className={styles.cardBorder} >
                    <Table columns={fxqtbColumns} dataSource={fxqtbData} />
                </Card>
                <Card size="small" title="保全信息" bordered={true} className={styles.cardBorder} >
                    <Table columns={fxqbqColumns} dataSource={fxqbqData} />
                </Card>
                <Card size="small" title="理赔信息" bordered={true} className={styles.cardBorder} >
                    <Table columns={fxqlpColumns} dataSource={fxqlpData} />
                </Card>
            </Card>

            <Card title="理赔受理参考信息" bordered={true} className={styles.cardBorder} >
                <Card size="small" title="理赔保单核保结论" bordered={true} className={styles.cardBorder} >
                    <Descriptions >
                        <Descriptions.Item >正常通过</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card size="small" title="过往理赔轨迹" bordered={true} className={styles.cardBorder} >
                    <Table columns={lphistory} dataSource={lpData} />
                </Card>

            </Card>
        </>
    )
}

export default jobLogInfo;