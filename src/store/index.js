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
      // let flag = 0
      // for (let i = 0; i < state.user.length; i++) {
      //   if (state.user[i].phone === user.phone) {
      //     // 该用户登陆过，更新token
      //     flag = 1
      //     state.user[i].token = user.token
      //     break
      //   }
      // }
      // if (flag === 0) {
      //   // 没登陆过，push进去
      //   state.user.push(user)
      // }
      // 单用户
      state.user.phone = user.phone
      state.user.pwd = user.pwd
      state.user.token = user.token
      state.user.isLogin = user.isLogin
      state.user.username = user.username
    }
  },
  actions: {
  },
  modules: {
  }
})
