import { message } from 'antd';

export default function showMessage(param: any) {
    switch (param.status) {
        case "success":
            message.success(param.msg)
            break
        case "fail":
        case "ipError":
        case "error":
            message.error(param.msg)
            break
        case "warning":
            message.warning(param.msg)
            break
        default:
            message.info(param.msg)
            break
    }
}