import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  // @代表src路径,在node_modules\@vue\cli-service\lib\config\base.js中配置的.alias {.set('@', api.resolve('src'))}
  // 路由懒加载
  redirect: '/login'
}, {
  path: '/login',
  name: 'login',
  // @代表src路径,在node_modules\@vue\cli-service\lib\config\base.js中配置的.alias {.set('@', api.resolve('src'))}
  // 路由懒加载
  component: () => import('@/views/login')
}]

const router = new VueRouter({
  routes
})

export default router