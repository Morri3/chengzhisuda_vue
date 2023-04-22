import { createStore } from 'vuex'

export default createStore({
  state: {
    item: {},
    sub: {},
    sub0: '',
    user: {} // 用户信息
  },
  getters: {
  },
  mutations: {
    setItem (state, item) {
      state.item = item
    },
    setSub (state, sub) {
      state.sub = sub
    },
    setSub0 (state, sub0) {
      state.sub0 = sub0
    },
    setUserLoginInfo (state, user) {
      state.user.phone = user.phone
      state.user.pwd = user.pwd
      state.user.token = user.token
      state.user.isLogin = user.isLogin
      state.user.username = user.username
      state.user.head = user.head
      state.user.gender = user.gender
    }
  },
  actions: {
  },
  modules: {
  }
})
