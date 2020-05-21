import Vue from 'vue'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

Vue.filter('relativeTime', val => {
    return dayjs().to(dayjs(val))
})


// console.log(dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss'));