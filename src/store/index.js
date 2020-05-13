import Vue from 'vue'
import Vuex from 'vuex'
import {
  setItem,
  getItem
} from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    //登陆成功后,获取token信息
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    //利用utils/storage.js中封装的函数获取token信息
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      //利用utils/storage.js中封装的函数存储token信息
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})