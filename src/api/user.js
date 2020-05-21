import request from '@/utils/request.js'
// import store from '@/store'

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

// 获取用户自己的信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        // 发送请求头数据
        // 在请求拦截器中已设置 request.js中
        // headers: {
        //     // 注意：该接口需要授权才能访问
        //     //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels`,
    })
}