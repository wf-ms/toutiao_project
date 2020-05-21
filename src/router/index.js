import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        // @代表src路径,在node_modules\@vue\cli-service\lib\config\base.js中配置的.alias {.set('@', api.resolve('src'))}
        // 路由懒加载
        component: () => import('@/views/login')
    }, {
        path: '/',
        //拥有子路由的父路由的name无意义,会产生警告
        // name: 'layout',
        component: () => import('@/views/layout'),
        children: [{
            path: '',
            name: 'home',
            component: () => import('@/views/home')
        }, {
            path: '/qa',
            name: 'qa',
            component: () => import('@/views/qa')
        }, {
            path: '/video',
            name: 'video',
            component: () => import('@/views/video')
        }, {
            path: '/my',
            name: 'my',
            component: () => import('@/views/my')
        }]
    }, {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search')
    }

]

const router = new VueRouter({
    routes
})

export default router