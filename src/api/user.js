import request from '@/utils/request.js'

export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data: data
    })
}
// 每个手机号每分钟只能发送一次
export const sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}