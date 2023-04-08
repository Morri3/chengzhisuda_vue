import { createStore } from 'vuex'

export default createStore({
  state: {
    item: {},
    sub: {},
    sub0: ''
  },
  getters: {
    // getMenu (state) {
    //   return state.menu
    // }
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
    }
  },
  actions: {
  },
  modules: {
  }
})
