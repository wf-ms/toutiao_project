import request from '@/utils/request'

export const getAllChannels = () => {
    return request({
        url: '/app/v1_0/channels',
        method: 'GET'
    })
}

export const addUserChannel = channel => {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'PATCH', //局部修改
        data: {
            channels: [channel]
        }
    })
}

export const deleteUserChannel = channelId => {
    return request({
        url: '/app/v1_0/user/channels/' + channelId,
        method: 'DELETE', //局部修改
    })
}